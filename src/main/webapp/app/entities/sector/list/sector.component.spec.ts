import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SectorService } from '../service/sector.service';

import { SectorComponent } from './sector.component';

describe('Sector Management Component', () => {
  let comp: SectorComponent;
  let fixture: ComponentFixture<SectorComponent>;
  let service: SectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SectorComponent],
    })
      .overrideTemplate(SectorComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SectorComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SectorService);

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
    expect(comp.sectors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
