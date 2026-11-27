export type ResourceFile = {
  filename: string;
  fileurl: string;
  mimetype: string;
  filesize: number;
  timemodified: number;
};

export type CourseResource = {
  id: number;
  name: string;
  description: string;
  section: { id: number; name: string } | null;
  files: ResourceFile[];
};
