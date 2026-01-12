
import { SearchIntent } from './types';

export const RESTRICTED_TLDS = ['.gov', '.mil', '.gov.uk', '.gov.au', '.gov.ca', '.gov.in'];

export const DORK_PATTERNS: Record<SearchIntent, string[]> = {
  [SearchIntent.ADMIN]: [
    'inurl:login',
    'inurl:admin',
    'intitle:"admin"',
    'intitle:"dashboard"',
    'inurl:cpanel',
    'inurl:webmail',
    'inurl:phpmyadmin',
    'inurl:adminer',
    'inurl:administrator',
    'inurl:secure/admin',
    'inurl:cgi "login"'
  ],
  [SearchIntent.BACKUP]: [
    'filetype:zip "backup"',
    'filetype:rar "database dump"',
    'filetype:tar.gz "config"',
    'filetype:7z "archive"',
    'filetype:gz "log"',
    'ext:sql',
    'ext:bak',
    'ext:old',
    'ext:backup',
    'filename:backup.sql',
    'filename:dump.sql'
  ],
  [SearchIntent.CONFIG]: [
    'ext:env',
    '".env"',
    '"DB_PASSWORD"',
    '"API_KEY"',
    '"SECRET_KEY"',
    'filetype:txt "password"',
    'filetype:xml "configuration"',
    'filetype:pl "config"',
    'ext:json',
    'ext:yml',
    'ext:yaml',
    'filename:config.php'
  ],
  [SearchIntent.DATABASE]: [
    'filetype:sql "database"',
    'ext:db',
    'ext:sqlite',
    '"SQL syntax error"',
    '"Warning: mysql"',
    '"Fatal error"',
    '"mysql_connect"',
    '"connection string"'
  ],
  [SearchIntent.API_CLOUD]: [
    'inurl:api',
    '"api_key"',
    '"SECRET_KEY"',
    'filetype:js "API_KEY"',
    'filetype:json "token"',
    '"access_token"',
    '"aws_access_key"',
    '"firebaseio.com"'
  ],
  [SearchIntent.UPLOAD]: [
    'inurl:upload',
    'inurl:fileupload',
    '"choose file"',
    'intitle:"index of /uploads"'
  ],
  [SearchIntent.DEBUG]: [
    'site:dev.[TARGET]',
    'site:staging.[TARGET]',
    'site:test.[TARGET]',
    'inurl:dev',
    'inurl:test',
    'inurl:staging',
    'inurl:debug'
  ],
  [SearchIntent.LOGS]: [
    'filetype:log "error"',
    'filetype:gz "log"',
    'ext:log',
    '"error log"',
    '"stack trace"',
    'inurl:logs'
  ],
  [SearchIntent.AUTH]: [
    'inurl:forgot-password',
    'inurl:password-reset',
    'inurl:auth/callback',
    'filetype:py "password"',
    'filetype:asp "username"'
  ],
  [SearchIntent.DOCS]: [
    'filetype:pdf "confidential"',
    'filetype:doc OR filetype:docx "resume"',
    'filetype:xls OR filetype:xlsx "financial"',
    'filetype:ppt OR filetype:pptx "presentation"',
    'filetype:csv "email"',
    'filetype:rtf "report"',
    'filetype:odt "draft"',
    'intitle:"research" ext:pdf',
    'intitle:"report" ext:pdf',
    'intitle:"project" ext:pdf',
    'intitle:"thesis" ext:pdf'
  ],
  [SearchIntent.DIRECTORY]: [
    '"Index of /"',
    'intitle:"Index of"',
    '"Parent Directory"'
  ],
  [SearchIntent.CODE]: [
    'filetype:php "mysql_connect"',
    'filetype:js "API_KEY"',
    'filetype:py "password"',
    'filetype:java "connection"',
    'filetype:asp "username"',
    'filetype:rb "secret"',
    'filetype:pl "config"',
    'filetype:cgi "login"',
    'filetype:xml "configuration"',
    'filetype:json "token"'
  ],
  [SearchIntent.ALL]: []
};

export const INTENT_LABELS: Record<SearchIntent, string> = {
  [SearchIntent.ADMIN]: 'Admin & Panels',
  [SearchIntent.BACKUP]: 'Backups & Archives',
  [SearchIntent.CONFIG]: 'Secrets & Env',
  [SearchIntent.DATABASE]: 'Database & Errors',
  [SearchIntent.API_CLOUD]: 'API & Cloud',
  [SearchIntent.UPLOAD]: 'Uploads',
  [SearchIntent.DEBUG]: 'Subdomains & Dev',
  [SearchIntent.LOGS]: 'Logs',
  [SearchIntent.AUTH]: 'Auth Flow',
  [SearchIntent.DOCS]: 'Documents',
  [SearchIntent.DIRECTORY]: 'Directory Listing',
  [SearchIntent.CODE]: 'Source Code',
  [SearchIntent.ALL]: 'Full Scan'
};

export const TOPIC_TLD_MAP: Record<string, string[]> = {
  'university': ['.edu', '.ac.in', '.edu.uk', '.edu.au'],
  'college': ['.edu', '.ac.in'],
  'school': ['.edu', '.k12'],
  'government': ['.gov', '.nic.in'],
  'hospital': ['.org', '.com'],
  'ngo': ['.org'],
  'company': ['.com', '.co', '.io']
};
