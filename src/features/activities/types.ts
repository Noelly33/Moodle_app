export type BackendActivity = {
  id: number; 
  courseId: number;
  activityId: number; 
  name: string;
  type: 'assign' | 'forum' | string;
  description?: string | null;
  intro?: string | null;
  duedate?: number | null;
  sectionName?: string | null;
};

export type ActivityStatus = 'pendiente' | 'vencido';

export type StoredActivity = {
  id: number;
  courseId: number;
  activityId: number;
  name: string;
  type: string;
  descripcion: string;
  duedate: number | null;
  estado: ActivityStatus;
  curso: string;
  sectionName: string | null;
};

export type ActivityItem = {
  id: number;
  courseId: number;
  activityId: number;
  nombre: string;
  tipo: string;
  curso: string;
  seccion: string | null;
  fechaEntrega: string;
  estado: ActivityStatus;
  descripcion: string;
};
