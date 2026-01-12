
import { GoogleGenAI } from "@google/genai";
import { DorkResult, SearchIntent } from '../types';

export class SearchService {
  static async performSearch(
    query: string, 
    category: SearchIntent,
    topicContext?: string
  ): Promise<DorkResult[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    
    const siteMatch = query.match(/site:([^\s]+)/i);
    const targetDomain = siteMatch ? siteMatch[1].toLowerCase() : null;

    try {
      const contextPrompt = topicContext 
        ? `STRICT RECON MODE. TARGET: "${topicContext}". QUERY: ${query}. Focus on endpoints, portals, configs.`
        : `SECURITY AUDIT MODE. QUERY: ${query}. If site:${targetDomain} is specified, ONLY return URLs from that domain.`;

      const response = await ai.models.generateContent({
        model: model,
        contents: contextPrompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const results: DorkResult[] = [];

      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          const url = chunk.web.uri?.toLowerCase() || '';
          let isRelevant = true;

          if (targetDomain) {
            try {
              const urlObj = new URL(chunk.web.uri);
              const hostname = urlObj.hostname.toLowerCase();
              if (hostname !== targetDomain && !hostname.endsWith('.' + targetDomain)) {
                isRelevant = false;
              }
            } catch (e) {
              isRelevant = false;
            }
          } 
          
          if (isRelevant) {
            results.push({
              id: crypto.randomUUID(),
              url: chunk.web.uri,
              title: chunk.web.title || 'Audit Finding',
              snippet: response.text || 'Technical endpoint discovered during audit.',
              category,
              dorkUsed: query,
              timestamp: new Date().toISOString()
            });
          }
        }
      });

      return results;
    } catch (error: any) {
      console.error('Audit query failed:', error);
      throw error;
    }
  }

  static deduplicate(results: DorkResult[]): DorkResult[] {
    const seen = new Set<string>();
    return results.filter(item => {
      const cleanUrl = item.url.split('?')[0].replace(/\/$/, '').toLowerCase();
      if (seen.has(cleanUrl)) return false;
      seen.add(cleanUrl);
      return true;
    });
  }
}
