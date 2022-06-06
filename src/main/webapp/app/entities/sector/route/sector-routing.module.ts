import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SectorComponent } from '../list/sector.component';
import { SectorDetailComponent } from '../detail/sector-detail.component';
import { SectorUpdateComponent } from '../update/sector-update.component';
import { SectorRoutingResolveService } from './sector-routing-resolve.service';

const sectorRoute: Routes = [
  {
    path: '',
    component: SectorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SectorDetailComponent,
    resolve: {
      sector: SectorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SectorUpdateComponent,
    resolve: {
      sector: SectorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SectorUpdateComponent,
    resolve: {
      sector: SectorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sectorRoute)],
  exports: [RouterModule],
})
export class SectorRoutingModule {}
