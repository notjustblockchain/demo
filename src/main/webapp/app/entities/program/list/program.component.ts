import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgram } from '../program.model';
import { ProgramService } from '../service/program.service';
import { ProgramDeleteDialogComponent } from '../delete/program-delete-dialog.component';

@Component({
  selector: 'jhi-program',
  templateUrl: './program.component.html',
})
export class ProgramComponent implements OnInit {
  programs?: IProgram[];
  isLoading = false;

  constructor(protected programService: ProgramService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.programService.query().subscribe({
      next: (res: HttpResponse<IProgram[]>) => {
        this.isLoading = false;
        this.programs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IProgram): number {
    return item.id!;
  }

  delete(program: IProgram): void {
    const modalRef = this.modalService.open(ProgramDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.program = program;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
