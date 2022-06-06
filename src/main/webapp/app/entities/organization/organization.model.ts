import { ISector } from 'app/entities/sector/sector.model';

export interface IOrganization {
  id?: number;
  organiztaionName?: string;
  sectors?: ISector[] | null;
}

export class Organization implements IOrganization {
  constructor(public id?: number, public organiztaionName?: string, public sectors?: ISector[] | null) {}
}

export function getOrganizationIdentifier(organization: IOrganization): number | undefined {
  return organization.id;
}
