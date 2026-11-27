export type Course = {
  id: number;
  name: string;
  shortname: string;
  teacher?: string | null;
};

export type CourseModule = {
  id: number;
  instance: number; 
  name: string;
  type: string;
  url?: string | null;
  description?: string;
  externalUrl?: string;
};

export type CourseSection = {
  id: number;
  title: string;
  summary: string;
  modules: CourseModule[];
};
