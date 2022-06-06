import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISector, Sector } from '../sector.model';

import { SectorService } from './sector.service';

describe('Sector Service', () => {
  let service: SectorService;
  let httpMock: HttpTestingController;
  let elemDefault: ISector;
  let expectedResult: ISector | ISector[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SectorService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sectorName: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Sector', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Sector()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Sector', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sectorName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Sector', () => {
      const patchObject = Object.assign({}, new Sector());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Sector', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sectorName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Sector', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSectorToCollectionIfMissing', () => {
      it('should add a Sector to an empty array', () => {
        const sector: ISector = { id: 123 };
        expectedResult = service.addSectorToCollectionIfMissing([], sector);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sector);
      });

      it('should not add a Sector to an array that contains it', () => {
        const sector: ISector = { id: 123 };
        const sectorCollection: ISector[] = [
          {
            ...sector,
          },
          { id: 456 },
        ];
        expectedResult = service.addSectorToCollectionIfMissing(sectorCollection, sector);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Sector to an array that doesn't contain it", () => {
        const sector: ISector = { id: 123 };
        const sectorCollection: ISector[] = [{ id: 456 }];
        expectedResult = service.addSectorToCollectionIfMissing(sectorCollection, sector);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sector);
      });

      it('should add only unique Sector to an array', () => {
        const sectorArray: ISector[] = [{ id: 123 }, { id: 456 }, { id: 1512 }];
        const sectorCollection: ISector[] = [{ id: 123 }];
        expectedResult = service.addSectorToCollectionIfMissing(sectorCollection, ...sectorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sector: ISector = { id: 123 };
        const sector2: ISector = { id: 456 };
        expectedResult = service.addSectorToCollectionIfMissing([], sector, sector2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sector);
        expect(expectedResult).toContain(sector2);
      });

      it('should accept null and undefined values', () => {
        const sector: ISector = { id: 123 };
        expectedResult = service.addSectorToCollectionIfMissing([], null, sector, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sector);
      });

      it('should return initial array if no Sector is added', () => {
        const sectorCollection: ISector[] = [{ id: 123 }];
        expectedResult = service.addSectorToCollectionIfMissing(sectorCollection, undefined, null);
        expect(expectedResult).toEqual(sectorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
