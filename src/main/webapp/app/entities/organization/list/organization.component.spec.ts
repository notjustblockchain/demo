import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { OrganizationService } from '../service/organization.service';

import { OrganizationComponent } from './organization.component';

describe('Organization Management Component', () => {
  let comp: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  let service: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [OrganizationComponent],
    })
      .overrideTemplate(OrganizationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OrganizationComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OrganizationService);

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
    expect(comp.organizations?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
