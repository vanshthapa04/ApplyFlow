// ---------- Backend schema types ----------
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected" | "Hired";
export type InterviewStatus = "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
export type InterviewMode = "Online" | "Offline";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";

export interface Company {
  id: string;
  name: string;
  website: string;
  industry: string;
  location: string;
}

export interface Application {
  id: string;
  companyId: string;
  companyName: string;
  jobTitle: string;
  jobType: JobType;
  location: string;
  salary: string;
  applicationDate: string; // ISO date
  status: ApplicationStatus;
  jobUrl: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  round: string;
  interviewerName: string;
  interviewDate: string; // ISO datetime
  mode: InterviewMode;
  meetingLink: string;
  location: string;
  status: InterviewStatus;
}

export const APPLICATION_STATUSES: ApplicationStatus[] = ["Applied", "Interview", "Offer", "Rejected", "Hired"];
export const INTERVIEW_STATUSES: InterviewStatus[] = ["Scheduled", "Completed", "Cancelled", "Rescheduled"];
export const INTERVIEW_MODES: InterviewMode[] = ["Online", "Offline"];
export const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];

// ---------- Mock data ----------
export const companies: Company[] = [
  { id: "c1", name: "Google", website: "https://google.com", industry: "Search & Cloud", location: "Bangalore, IN" },
  { id: "c2", name: "Microsoft", website: "https://microsoft.com", industry: "Software", location: "Hyderabad, IN" },
  { id: "c3", name: "Amazon", website: "https://amazon.com", industry: "E-commerce & Cloud", location: "Bangalore, IN" },
  { id: "c4", name: "Adobe", website: "https://adobe.com", industry: "Creative Software", location: "Noida, IN" },
  { id: "c5", name: "Flipkart", website: "https://flipkart.com", industry: "E-commerce", location: "Bangalore, IN" },
  { id: "c6", name: "Stripe", website: "https://stripe.com", industry: "Payments", location: "Remote" },
  { id: "c7", name: "Notion", website: "https://notion.so", industry: "Productivity", location: "Remote" },
  { id: "c8", name: "Linear", website: "https://linear.app", industry: "Developer Tools", location: "Remote" },
];

export const applications: Application[] = [
  { id: "a1", companyId: "c1", companyName: "Google", jobTitle: "Senior Frontend Engineer", jobType: "Full-time", location: "Bangalore, IN", salary: "₹42 LPA", applicationDate: "2025-06-28", status: "Interview", jobUrl: "https://careers.google.com/jobs/1" },
  { id: "a2", companyId: "c4", companyName: "Adobe", jobTitle: "Product Designer", jobType: "Full-time", location: "Noida, IN", salary: "₹28 LPA", applicationDate: "2025-07-02", status: "Applied", jobUrl: "https://adobe.com/careers/2" },
  { id: "a3", companyId: "c6", companyName: "Stripe", jobTitle: "Full Stack Engineer", jobType: "Full-time", location: "Remote", salary: "$140k", applicationDate: "2025-06-15", status: "Offer", jobUrl: "https://stripe.com/jobs/3" },
  { id: "a4", companyId: "c2", companyName: "Microsoft", jobTitle: "Software Engineer II", jobType: "Full-time", location: "Hyderabad, IN", salary: "₹36 LPA", applicationDate: "2025-06-22", status: "Interview", jobUrl: "https://careers.microsoft.com/4" },
  { id: "a5", companyId: "c3", companyName: "Amazon", jobTitle: "Backend Engineer", jobType: "Full-time", location: "Bangalore, IN", salary: "₹38 LPA", applicationDate: "2025-05-30", status: "Rejected", jobUrl: "https://amazon.jobs/5" },
  { id: "a6", companyId: "c5", companyName: "Flipkart", jobTitle: "SDE-1", jobType: "Full-time", location: "Bangalore, IN", salary: "₹22 LPA", applicationDate: "2025-07-05", status: "Applied", jobUrl: "https://flipkartcareers.com/6" },
  { id: "a7", companyId: "c7", companyName: "Notion", jobTitle: "Engineering Manager", jobType: "Full-time", location: "Remote", salary: "$180k", applicationDate: "2025-06-10", status: "Interview", jobUrl: "https://notion.so/careers/7" },
  { id: "a8", companyId: "c8", companyName: "Linear", jobTitle: "Design Engineer", jobType: "Contract", location: "Remote", salary: "$160k", applicationDate: "2025-05-12", status: "Hired", jobUrl: "https://linear.app/careers/8" },
  { id: "a9", companyId: "c3", companyName: "Amazon", jobTitle: "Data Engineer", jobType: "Full-time", location: "Bangalore, IN", salary: "₹32 LPA", applicationDate: "2025-07-08", status: "Applied", jobUrl: "https://amazon.jobs/9" },
  { id: "a10", companyId: "c1", companyName: "Google", jobTitle: "iOS Engineer", jobType: "Full-time", location: "Bangalore, IN", salary: "₹40 LPA", applicationDate: "2025-05-20", status: "Rejected", jobUrl: "https://careers.google.com/jobs/10" },
  { id: "a11", companyId: "c2", companyName: "Microsoft", jobTitle: "Platform Engineer", jobType: "Full-time", location: "Hyderabad, IN", salary: "₹34 LPA", applicationDate: "2025-07-01", status: "Applied", jobUrl: "https://careers.microsoft.com/11" },
  { id: "a12", companyId: "c5", companyName: "Flipkart", jobTitle: "Growth PM", jobType: "Full-time", location: "Bangalore, IN", salary: "₹30 LPA", applicationDate: "2025-06-25", status: "Interview", jobUrl: "https://flipkartcareers.com/12" },
];

export const interviews: Interview[] = [
  { id: "i1", applicationId: "a1", round: "System Design", interviewerName: "Priya Menon", interviewDate: "2026-07-14T10:30:00Z", mode: "Online", meetingLink: "https://meet.google.com/abc-defg-hij", location: "", status: "Scheduled" },
  { id: "i2", applicationId: "a4", round: "Coding Round 2", interviewerName: "Karan Patel", interviewDate: "2026-07-15T14:00:00Z", mode: "Online", meetingLink: "https://teams.microsoft.com/l/meetup", location: "", status: "Scheduled" },
  { id: "i3", applicationId: "a7", round: "Hiring Manager", interviewerName: "Sarah Chen", interviewDate: "2026-07-16T18:00:00Z", mode: "Online", meetingLink: "https://zoom.us/j/9876543", location: "", status: "Scheduled" },
  { id: "i4", applicationId: "a12", round: "Case Study", interviewerName: "Rahul Iyer", interviewDate: "2026-07-18T11:00:00Z", mode: "Offline", meetingLink: "", location: "Flipkart HQ, Bangalore", status: "Rescheduled" },
  { id: "i5", applicationId: "a1", round: "Recruiter Screen", interviewerName: "Anna Kim", interviewDate: "2026-07-01T09:00:00Z", mode: "Online", meetingLink: "https://meet.google.com/xyz-uvwt-rst", location: "", status: "Completed" },
  { id: "i6", applicationId: "a3", round: "Onsite Loop", interviewerName: "David Park", interviewDate: "2026-06-24T09:00:00Z", mode: "Offline", meetingLink: "", location: "Stripe SF, 510 Townsend St", status: "Completed" },
];

// ---------- Derived dashboard data ----------
export const dashboardStats = {
  total: applications.length,
  Applied: applications.filter((a) => a.status === "Applied").length,
  Interview: applications.filter((a) => a.status === "Interview").length,
  Offer: applications.filter((a) => a.status === "Offer").length,
  Rejected: applications.filter((a) => a.status === "Rejected").length,
  Hired: applications.filter((a) => a.status === "Hired").length,
};

export const statusChartData = APPLICATION_STATUSES.map((status) => ({
  status,
  count: applications.filter((a) => a.status === status).length,
}));

export const timelineData = [
  { week: "W1", applications: 3 },
  { week: "W2", applications: 5 },
  { week: "W3", applications: 4 },
  { week: "W4", applications: 7 },
  { week: "W5", applications: 6 },
  { week: "W6", applications: 9 },
  { week: "W7", applications: 8 },
  { week: "W8", applications: 12 },
];

// ---------- Current user (backend only stores name + email) ----------
export const currentUser = {
  fullName: "Arjun Sharma",
  email: "arjun.sharma@applyflow.io",
};
