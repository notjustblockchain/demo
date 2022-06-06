import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProject, Project } from '../project.model';
import { ProjectService } from '../service/project.service';
import { IProgram } from 'app/entities/program/program.model';
import { ProgramService } from 'app/entities/program/service/program.service';

@Component({
  selector: 'jhi-project-update',
  templateUrl: './project-update.component.html',
})
export class ProjectUpdateComponent implements OnInit {
  isSaving = false;

  programsSharedCollection: IProgram[] = [];

  editForm = this.fb.group({
    id: [],
    projectCode: [],
    status: [],
    program: [],
  });

  constructor(
    protected projectService: ProjectService,
    protected programService: ProgramService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.updateForm(project);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const project = this.createFromForm();
    if (project.id !== undefined) {
      this.subscribeToSaveResponse(this.projectService.update(project));
    } else {
      this.subscribeToSaveResponse(this.projectService.create(project));
    }
  }

  trackProgramById(_index: number, item: IProgram): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProject>>): void {
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

  protected updateForm(project: IProject): void {
    this.editForm.patchValue({
      id: project.id,
      projectCode: project.projectCode,
      status: project.status,
      program: project.program,
    });

    this.programsSharedCollection = this.programService.addProgramToCollectionIfMissing(this.programsSharedCollection, project.program);
  }

  protected loadRelationshipsOptions(): void {
    this.programService
      .query()
      .pipe(map((res: HttpResponse<IProgram[]>) => res.body ?? []))
      .pipe(
        map((programs: IProgram[]) => this.programService.addProgramToCollectionIfMissing(programs, this.editForm.get('program')!.value))
      )
      .subscribe((programs: IProgram[]) => (this.programsSharedCollection = programs));
  }

  protected createFromForm(): IProject {
    return {
      ...new Project(),
      id: this.editForm.get(['id'])!.value,
      projectCode: this.editForm.get(['projectCode'])!.value,
      status: this.editForm.get(['status'])!.value,
      program: this.editForm.get(['program'])!.value,
    };
  }
}
