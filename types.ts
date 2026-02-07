
export enum FeedbackColor {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN'
}

export interface Exercise {
  id: string;
  name: string;
  reps: number;
  sets: number;
  icon: string;
  description: string;
}

export interface SessionFeedback {
  color: FeedbackColor;
  painLevel: number; // 1-10
  easeRating: number; // 1-10
  breaksTaken: number;
  comments?: string;
}

export interface CarePlan {
  id: string;
  weekNumber: number;
  exercises: Exercise[];
  status: 'pending' | 'completed';
  feedback?: SessionFeedback;
}

export interface Buddy {
  id: string;
  name: string;
  lastMessage?: string;
  status: 'online' | 'offline';
}

export type AppView = 'dashboard' | 'plan' | 'buddies' | 'progress' | 'exercise-view';
