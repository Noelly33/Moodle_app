export type SubmittedFile = {
  filename: string;
  fileurl: string;
  filesize: number;
  mimetype: string;
};

export type Assignment = {
  id: number;
  cmid: number;
  courseId: number;
  name: string;
  intro: string;
  duedate: number | null;
  cutoffdate: number | null;
  allowSubmissionsFrom: number | null;
  submissionTypes: { onlineText: boolean; file: boolean };
  submission: {
    status: 'new' | 'draft' | 'submitted' | string;
    gradingStatus: 'graded' | 'notgraded' | string | null;
    canEdit: boolean;
    canSubmit: boolean;
    lastModified: number | null;
    onlineText: string;
    files: SubmittedFile[];
  };
  feedback: { grade: string | null; gradedAt: number | null; comments: string | null } | null;
};

export type PickedFile = {
  uri: string;
  name: string;
  mimeType?: string;
  size?: number;
};
