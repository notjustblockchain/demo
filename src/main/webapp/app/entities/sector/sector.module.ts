import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SectorComponent } from './list/sector.component';
import { SectorDetailComponent } from './detail/sector-detail.component';
import { SectorUpdateComponent } from './update/sector-update.component';
import { SectorDeleteDialogComponent } from './delete/sector-delete-dialog.component';
import { SectorRoutingModule } from './route/sector-routing.module';

@NgModule({
  imports: [SharedModule, SectorRoutingModule],
  declarations: [SectorComponent, SectorDetailComponent, SectorUpdateComponent, SectorDeleteDialogComponent],
  entryComponents: [SectorDeleteDialogComponent],
})
export class SectorModule {}
