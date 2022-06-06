import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISector } from '../sector.model';
import { SectorService } from '../service/sector.service';
import { SectorDeleteDialogComponent } from '../delete/sector-delete-dialog.component';

@Component({
  selector: 'jhi-sector',
  templateUrl: './sector.component.html',
})
export class SectorComponent implements OnInit {
  sectors?: ISector[];
  isLoading = false;

  constructor(protected sectorService: SectorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.sectorService.query().subscribe({
      next: (res: HttpResponse<ISector[]>) => {
        this.isLoading = false;
        this.sectors = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISector): number {
    return item.id!;
  }

  delete(sector: ISector): void {
    const modalRef = this.modalService.open(SectorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sector = sector;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
