import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISector } from '../sector.model';
import { SectorService } from '../service/sector.service';

@Component({
  templateUrl: './sector-delete-dialog.component.html',
})
export class SectorDeleteDialogComponent {
  sector?: ISector;

  constructor(protected sectorService: SectorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sectorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
