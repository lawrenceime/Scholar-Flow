export type Role = 'Admin' | 'Teacher';
export type Status = 'Active' | 'Invited' | 'Inactive';

export interface SubjectAssignment {
  subject: string;
  classGroup: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  role: Role;
  status: Status;
  isClassTeacher?: boolean;
  assignedClass?: string;
  subjectAssignments: SubjectAssignment[];
}
