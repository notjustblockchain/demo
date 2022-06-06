import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISector, getSectorIdentifier } from '../sector.model';

export type EntityResponseType = HttpResponse<ISector>;
export type EntityArrayResponseType = HttpResponse<ISector[]>;

@Injectable({ providedIn: 'root' })
export class SectorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sectors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sector: ISector): Observable<EntityResponseType> {
    return this.http.post<ISector>(this.resourceUrl, sector, { observe: 'response' });
  }

  update(sector: ISector): Observable<EntityResponseType> {
    return this.http.put<ISector>(`${this.resourceUrl}/${getSectorIdentifier(sector) as number}`, sector, { observe: 'response' });
  }

  partialUpdate(sector: ISector): Observable<EntityResponseType> {
    return this.http.patch<ISector>(`${this.resourceUrl}/${getSectorIdentifier(sector) as number}`, sector, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISector>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISector[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSectorToCollectionIfMissing(sectorCollection: ISector[], ...sectorsToCheck: (ISector | null | undefined)[]): ISector[] {
    const sectors: ISector[] = sectorsToCheck.filter(isPresent);
    if (sectors.length > 0) {
      const sectorCollectionIdentifiers = sectorCollection.map(sectorItem => getSectorIdentifier(sectorItem)!);
      const sectorsToAdd = sectors.filter(sectorItem => {
        const sectorIdentifier = getSectorIdentifier(sectorItem);
        if (sectorIdentifier == null || sectorCollectionIdentifiers.includes(sectorIdentifier)) {
          return false;
        }
        sectorCollectionIdentifiers.push(sectorIdentifier);
        return true;
      });
      return [...sectorsToAdd, ...sectorCollection];
    }
    return sectorCollection;
  }
}
