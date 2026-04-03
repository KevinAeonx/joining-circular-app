export interface FormData {
  name: string;
  gender: "he" | "she";
  jobTitle: string;
  joiningDate: string;
  reportingManager: string;
  languages: string;
  hobbies: string;
  email: string;
  officeLocation: string;
  profilePhoto: string | null;
}

export interface GenerateParagraphRequest {
  formData: Omit<FormData, "profilePhoto">;
}

export interface GenerateParagraphResponse {
  paragraph: string;
  error?: string;
}

export interface SaveCircularRequest {
  formData: Omit<FormData, "profilePhoto">;
  paragraph: string;
}

export interface SaveCircularResponse {
  id?: string;
  error?: string;
}

export interface CircularRecord {
  id: string;
  name: string;
  job_title: string;
  joining_date: string;
  reporting_manager: string;
  office_location: string;
  email: string;
  paragraph: string;
  languages: string;
  hobbies: string;
  gender: string;
  created_at: string;
}
