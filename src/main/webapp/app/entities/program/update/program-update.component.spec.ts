import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProgramService } from '../service/program.service';
import { IProgram, Program } from '../program.model';
import { ISector } from 'app/entities/sector/sector.model';
import { SectorService } from 'app/entities/sector/service/sector.service';

import { ProgramUpdateComponent } from './program-update.component';

describe('Program Management Update Component', () => {
  let comp: ProgramUpdateComponent;
  let fixture: ComponentFixture<ProgramUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let programService: ProgramService;
  let sectorService: SectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProgramUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProgramUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProgramUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    programService = TestBed.inject(ProgramService);
    sectorService = TestBed.inject(SectorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Sector query and add missing value', () => {
      const program: IProgram = { id: 456 };
      const sector: ISector = { id: 51106 };
      program.sector = sector;

      const sectorCollection: ISector[] = [{ id: 30785 }];
      jest.spyOn(sectorService, 'query').mockReturnValue(of(new HttpResponse({ body: sectorCollection })));
      const additionalSectors = [sector];
      const expectedCollection: ISector[] = [...additionalSectors, ...sectorCollection];
      jest.spyOn(sectorService, 'addSectorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ program });
      comp.ngOnInit();

      expect(sectorService.query).toHaveBeenCalled();
      expect(sectorService.addSectorToCollectionIfMissing).toHaveBeenCalledWith(sectorCollection, ...additionalSectors);
      expect(comp.sectorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const program: IProgram = { id: 456 };
      const sector: ISector = { id: 23322 };
      program.sector = sector;

      activatedRoute.data = of({ program });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(program));
      expect(comp.sectorsSharedCollection).toContain(sector);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Program>>();
      const program = { id: 123 };
      jest.spyOn(programService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ program });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: program }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(programService.update).toHaveBeenCalledWith(program);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Program>>();
      const program = new Program();
      jest.spyOn(programService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ program });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: program }));
      saveSubject.complete();

      // THEN
      expect(programService.create).toHaveBeenCalledWith(program);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Program>>();
      const program = { id: 123 };
      jest.spyOn(programService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ program });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(programService.update).toHaveBeenCalledWith(program);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSectorById', () => {
      it('Should return tracked Sector primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSectorById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
