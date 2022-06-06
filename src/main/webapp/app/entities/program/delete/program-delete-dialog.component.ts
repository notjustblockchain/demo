import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgram } from '../program.model';
import { ProgramService } from '../service/program.service';

@Component({
  templateUrl: './program-delete-dialog.component.html',
})
export class ProgramDeleteDialogComponent {
  program?: IProgram;

  constructor(protected programService: ProgramService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
