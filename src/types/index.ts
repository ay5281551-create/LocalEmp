export interface Job {
  id: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  contact: string;
  postedAt: Date;
}

export interface Application {
  id: string;
  name: string;
  contact: string;
  jobTitle: string;
  message: string;
  appliedAt: Date;
}

export type Language = 'english' | 'telugu' | 'hindi';
