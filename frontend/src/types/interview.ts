export type InterviewMode = "Online" | "Offline";

export type InterviewStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled"
  | "Rescheduled";

export interface CreateInterviewDto {
  applicationId: string;
  round: string;
  interviewerName?: string;
  interviewDate: string;
  mode: InterviewMode;
  meetingLink?: string;
  location?: string;
  status?: InterviewStatus;
}

export interface UpdateInterviewDto {
  applicationId?: string;
  round?: string;
  interviewerName?: string;
  interviewDate?: string;
  mode?: InterviewMode;
  meetingLink?: string;
  location?: string;
  status?: InterviewStatus;
}

export interface Interview {
  id: string;
  user_id: string;
  application_id: string;
  round: string;
  interviewer_name: string | null;
  interview_date: Date;
  mode: InterviewMode;
  meeting_link: string | null;
  location: string | null;
  status: InterviewStatus;
  created_at: Date;
  updated_at: Date;
}