import { IProgram } from 'app/entities/program/program.model';
import { IOrganization } from 'app/entities/organization/organization.model';

export interface ISector {
  id?: number;
  sectorName?: string | null;
  programs?: IProgram[] | null;
  organization?: IOrganization | null;
}

export class Sector implements ISector {
  constructor(
    public id?: number,
    public sectorName?: string | null,
    public programs?: IProgram[] | null,
    public organization?: IOrganization | null
  ) {}
}

export function getSectorIdentifier(sector: ISector): number | undefined {
  return sector.id;
}
