
export enum SearchIntent {
  ADMIN = 'ADMIN',
  BACKUP = 'BACKUP',
  CONFIG = 'CONFIG',
  DATABASE = 'DATABASE',
  API_CLOUD = 'API_CLOUD',
  UPLOAD = 'UPLOAD',
  DEBUG = 'DEBUG',
  LOGS = 'LOGS',
  AUTH = 'AUTH',
  DOCS = 'DOCS',
  DIRECTORY = 'DIRECTORY',
  CODE = 'CODE',
  ALL = 'ALL'
}

export interface DorkResult {
  id: string;
  url: string;
  title: string;
  snippet: string;
  category: SearchIntent;
  dorkUsed: string;
  timestamp: string;
}

export interface SearchProgress {
  status: 'IDLE' | 'SEARCHING' | 'COMPLETED' | 'ERROR';
  mode?: 'WEBSITE' | 'TOPIC';
  message: string;
  currentDork?: string;
  totalDorks?: number;
  processedDorks?: number;
}
