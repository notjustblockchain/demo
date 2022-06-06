import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISector } from '../sector.model';

@Component({
  selector: 'jhi-sector-detail',
  templateUrl: './sector-detail.component.html',
})
export class SectorDetailComponent implements OnInit {
  sector: ISector | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sector }) => {
      this.sector = sector;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
