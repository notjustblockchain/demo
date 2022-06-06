import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProgramService } from '../service/program.service';

import { ProgramComponent } from './program.component';

describe('Program Management Component', () => {
  let comp: ProgramComponent;
  let fixture: ComponentFixture<ProgramComponent>;
  let service: ProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProgramComponent],
    })
      .overrideTemplate(ProgramComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProgramComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProgramService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.programs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
