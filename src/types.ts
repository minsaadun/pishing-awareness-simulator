export interface RedFlag {
  id: string;
  label: string; // Brief label of the red flag, e.g., "Domain Mencurigakan"
  targetText: string; // The text that represents the red flag
  explanation: string; // Why this is a red flag
}

export type ScenarioType = 'bank_email' | 'whatsapp_parcel' | 'fake_login' | 'qr_warning' | 'job_scam';

export interface Scenario {
  id: number;
  type: ScenarioType;
  title: string;
  senderName: string;
  senderAddress: string;
  recipient: string;
  subject?: string;
  dateStr: string;
  bodyContent: string; // Main text content or subtext
  isPhishing: boolean;
  correctAnswer: 'phishing' | 'selamat';
  redFlags: RedFlag[];
  fullExplanation: string;
  safetyTip: string;
  // Specific visual mockup fields
  mockupUrl?: string; // e.g. for URLs displayed in browser bar
  mockupBrandName?: string; // e.g. "Maybank", "PosLaju", "LHDN"
  avatarInitials?: string; // Avatar for chat/email
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  example: string;
  iconName: string; // Lucide icon mapping
}

export interface CyberTip {
  id: number;
  title: string;
  description: string;
  expandedDetails: string;
  iconName: string;
}
