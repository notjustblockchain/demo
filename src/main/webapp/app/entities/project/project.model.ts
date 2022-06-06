import { IProgram } from 'app/entities/program/program.model';

export interface IProject {
  id?: number;
  projectCode?: string | null;
  status?: string | null;
  program?: IProgram | null;
}

export class Project implements IProject {
  constructor(public id?: number, public projectCode?: string | null, public status?: string | null, public program?: IProgram | null) {}
}

export function getProjectIdentifier(project: IProject): number | undefined {
  return project.id;
}
