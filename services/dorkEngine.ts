
import { GoogleGenAI } from "@google/genai";
import { SearchIntent } from '../types';
import { DORK_PATTERNS, RESTRICTED_TLDS, TOPIC_TLD_MAP } from '../constants';

export class DorkEngine {
  static detectMode(input: string): 'WEBSITE' | 'TOPIC' {
    const trimmed = input.trim();
    return (trimmed.includes('.') && !trimmed.includes(' ')) ? 'WEBSITE' : 'TOPIC';
  }

  static validateInput(input: string, mode: 'WEBSITE' | 'TOPIC'): { valid: boolean; error?: string } {
    if (!input || input.trim().length < 2) {
      return { valid: false, error: 'Input too short.' };
    }

    if (mode === 'WEBSITE') {
      const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
      if (!domainRegex.test(input)) {
        return { valid: false, error: 'Invalid domain format.' };
      }
      if (RESTRICTED_TLDS.some(tld => input.toLowerCase().endsWith(tld))) {
        return { valid: false, error: 'Policy Violation: Restricted infrastructure.' };
      }
    }

    return { valid: true };
  }

  static generateDorks(input: string, mode: 'WEBSITE' | 'TOPIC', intent: SearchIntent): { dork: string; category: SearchIntent }[] {
    const intentsToProcess = intent === SearchIntent.ALL 
      ? Object.values(SearchIntent).filter(i => i !== SearchIntent.ALL)
      : [intent];

    const dorks: { dork: string; category: SearchIntent }[] = [];
    const target = input.trim();

    intentsToProcess.forEach(cat => {
      const patterns = DORK_PATTERNS[cat as SearchIntent];
      
      patterns.forEach(pattern => {
        if (mode === 'WEBSITE') {
          let processedPattern = pattern;
          if (pattern.includes('[TARGET]')) {
            processedPattern = pattern.replace('[TARGET]', target);
            dorks.push({ dork: processedPattern, category: cat as SearchIntent });
          } else {
            dorks.push({ dork: `site:${target} ${pattern}`, category: cat as SearchIntent });
          }
        } else {
          const lowerTarget = target.toLowerCase();
          const matchedTldKey = Object.keys(TOPIC_TLD_MAP).find(k => lowerTarget.includes(k));
          
          if (matchedTldKey) {
            TOPIC_TLD_MAP[matchedTldKey].forEach(tld => {
              const cleanTld = tld.replace(/^\./, '');
              dorks.push({ dork: `site:${cleanTld} intext:"${target}" ${pattern}`, category: cat as SearchIntent });
            });
          } else {
            dorks.push({ dork: `intitle:"${target}" ${pattern}`, category: cat as SearchIntent });
          }
        }
      });
    });

    const limit = intent === SearchIntent.ALL ? 40 : 60;
    return dorks.sort(() => Math.random() - 0.5).slice(0, limit);
  }

  static async generateAIDorks(input: string, mode: 'WEBSITE' | 'TOPIC', intent: string): Promise<{ dork: string; category: SearchIntent }[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    
    const prompt = `You are a high-level offensive security researcher. 
    Analyze target: "${input}" with intent: "${intent}".
    Generate 10 ADVANCED Google Dorks for technical reconnaissance.
    STRICT RULES: Return ONLY dorks, one per line. No wildcards in site: unless needed.`;

    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt
      });

      const responseText = response.text || '';
      const lines = responseText.split('\n').filter(l => l.trim().length > 5);
      return lines.map(line => ({
        dork: line.replace(/^\d+\.\s*/, '').replace(/^[*-]\s*/, '').trim(),
        category: SearchIntent.ALL
      }));
    } catch (e) {
      return this.generateDorks(input, mode, SearchIntent.ALL).slice(0, 10);
    }
  }
}
