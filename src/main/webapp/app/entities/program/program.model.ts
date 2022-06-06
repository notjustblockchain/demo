import { IProject } from 'app/entities/project/project.model';
import { ISector } from 'app/entities/sector/sector.model';

export interface IProgram {
  id?: number;
  programNane?: string | null;
  sponser?: string | null;
  projects?: IProject[] | null;
  sector?: ISector | null;
}

export class Program implements IProgram {
  constructor(
    public id?: number,
    public programNane?: string | null,
    public sponser?: string | null,
    public projects?: IProject[] | null,
    public sector?: ISector | null
  ) {}
}

export function getProgramIdentifier(program: IProgram): number | undefined {
  return program.id;
}
