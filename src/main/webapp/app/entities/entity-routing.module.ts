import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'organization',
        data: { pageTitle: 'jhipsterSampleApplicationApp.organization.home.title' },
        loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
      },
      {
        path: 'sector',
        data: { pageTitle: 'jhipsterSampleApplicationApp.sector.home.title' },
        loadChildren: () => import('./sector/sector.module').then(m => m.SectorModule),
      },
      {
        path: 'program',
        data: { pageTitle: 'jhipsterSampleApplicationApp.program.home.title' },
        loadChildren: () => import('./program/program.module').then(m => m.ProgramModule),
      },
      {
        path: 'project',
        data: { pageTitle: 'jhipsterSampleApplicationApp.project.home.title' },
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
