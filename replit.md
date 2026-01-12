# Dork Pro - Ethical Dorking Suite

## Overview
Dork Pro is a React-based web application for generating Google dork queries for ethical security research and penetration testing. It helps identify exposed files, directories, admin panels, login pages, and configuration files that are publicly indexed by Google.

## Project Structure
- `App.tsx` - Main application component
- `components/` - React UI components (Header, Sidebar, ResultCard, etc.)
- `services/` - Business logic (dorkEngine.ts, searchService.ts)
- `types.ts` - TypeScript type definitions
- `constants.tsx` - Application constants
- `vite.config.ts` - Vite build configuration

## Tech Stack
- React 19
- TypeScript
- Vite 6
- Tailwind CSS (via CDN)
- @google/genai (for AI features)

## Development
Run the development server:
```bash
npm run dev
```
The app runs on port 5000.

## Build
```bash
npm run build
```
Output is in the `dist` directory.

## Environment Variables
- `GEMINI_API_KEY` - Optional Google Gemini API key for AI features

## Recent Changes
- January 12, 2026: Initial import to Replit
  - Configured Vite to run on port 5000 with allowedHosts enabled
  - Fixed window.aistudio dependency for Replit environment
