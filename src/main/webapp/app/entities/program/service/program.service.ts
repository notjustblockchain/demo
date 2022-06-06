import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProgram, getProgramIdentifier } from '../program.model';

export type EntityResponseType = HttpResponse<IProgram>;
export type EntityArrayResponseType = HttpResponse<IProgram[]>;

@Injectable({ providedIn: 'root' })
export class ProgramService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/programs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(program: IProgram): Observable<EntityResponseType> {
    return this.http.post<IProgram>(this.resourceUrl, program, { observe: 'response' });
  }

  update(program: IProgram): Observable<EntityResponseType> {
    return this.http.put<IProgram>(`${this.resourceUrl}/${getProgramIdentifier(program) as number}`, program, { observe: 'response' });
  }

  partialUpdate(program: IProgram): Observable<EntityResponseType> {
    return this.http.patch<IProgram>(`${this.resourceUrl}/${getProgramIdentifier(program) as number}`, program, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProgram>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProgram[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProgramToCollectionIfMissing(programCollection: IProgram[], ...programsToCheck: (IProgram | null | undefined)[]): IProgram[] {
    const programs: IProgram[] = programsToCheck.filter(isPresent);
    if (programs.length > 0) {
      const programCollectionIdentifiers = programCollection.map(programItem => getProgramIdentifier(programItem)!);
      const programsToAdd = programs.filter(programItem => {
        const programIdentifier = getProgramIdentifier(programItem);
        if (programIdentifier == null || programCollectionIdentifiers.includes(programIdentifier)) {
          return false;
        }
        programCollectionIdentifiers.push(programIdentifier);
        return true;
      });
      return [...programsToAdd, ...programCollection];
    }
    return programCollection;
  }
}
