export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string | null;
  fileUrl?: string;
  personalWebsite?: string;
  companyWebsite?: string;
}
