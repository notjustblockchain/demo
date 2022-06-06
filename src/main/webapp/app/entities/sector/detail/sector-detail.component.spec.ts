import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SectorDetailComponent } from './sector-detail.component';

describe('Sector Management Detail Component', () => {
  let comp: SectorDetailComponent;
  let fixture: ComponentFixture<SectorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sector: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SectorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SectorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sector on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.sector).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
