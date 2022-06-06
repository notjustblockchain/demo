import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProgram, Program } from '../program.model';
import { ProgramService } from '../service/program.service';
import { ISector } from 'app/entities/sector/sector.model';
import { SectorService } from 'app/entities/sector/service/sector.service';

@Component({
  selector: 'jhi-program-update',
  templateUrl: './program-update.component.html',
})
export class ProgramUpdateComponent implements OnInit {
  isSaving = false;

  sectorsSharedCollection: ISector[] = [];

  editForm = this.fb.group({
    id: [],
    programNane: [],
    sponser: [],
    sector: [],
  });

  constructor(
    protected programService: ProgramService,
    protected sectorService: SectorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ program }) => {
      this.updateForm(program);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const program = this.createFromForm();
    if (program.id !== undefined) {
      this.subscribeToSaveResponse(this.programService.update(program));
    } else {
      this.subscribeToSaveResponse(this.programService.create(program));
    }
  }

  trackSectorById(_index: number, item: ISector): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgram>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(program: IProgram): void {
    this.editForm.patchValue({
      id: program.id,
      programNane: program.programNane,
      sponser: program.sponser,
      sector: program.sector,
    });

    this.sectorsSharedCollection = this.sectorService.addSectorToCollectionIfMissing(this.sectorsSharedCollection, program.sector);
  }

  protected loadRelationshipsOptions(): void {
    this.sectorService
      .query()
      .pipe(map((res: HttpResponse<ISector[]>) => res.body ?? []))
      .pipe(map((sectors: ISector[]) => this.sectorService.addSectorToCollectionIfMissing(sectors, this.editForm.get('sector')!.value)))
      .subscribe((sectors: ISector[]) => (this.sectorsSharedCollection = sectors));
  }

  protected createFromForm(): IProgram {
    return {
      ...new Program(),
      id: this.editForm.get(['id'])!.value,
      programNane: this.editForm.get(['programNane'])!.value,
      sponser: this.editForm.get(['sponser'])!.value,
      sector: this.editForm.get(['sector'])!.value,
    };
  }
}
