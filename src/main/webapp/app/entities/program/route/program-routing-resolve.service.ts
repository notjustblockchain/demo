import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProgram, Program } from '../program.model';
import { ProgramService } from '../service/program.service';

@Injectable({ providedIn: 'root' })
export class ProgramRoutingResolveService implements Resolve<IProgram> {
  constructor(protected service: ProgramService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProgram> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((program: HttpResponse<Program>) => {
          if (program.body) {
            return of(program.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Program());
  }
}
