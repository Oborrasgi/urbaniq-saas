export interface MailerOptions {
  subject: string;
  html: string;
  to: string | string[];
  from?: string;
  replyTo?: string;
}

export interface MailerResult {
  success: boolean;
  data?: any;
  error?: string;
}
