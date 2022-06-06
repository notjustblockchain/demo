import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProgram, Program } from '../program.model';

import { ProgramService } from './program.service';

describe('Program Service', () => {
  let service: ProgramService;
  let httpMock: HttpTestingController;
  let elemDefault: IProgram;
  let expectedResult: IProgram | IProgram[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProgramService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      programNane: 'AAAAAAA',
      sponser: 'AAAAAAA',
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

    it('should create a Program', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Program()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Program', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          programNane: 'BBBBBB',
          sponser: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Program', () => {
      const patchObject = Object.assign({}, new Program());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Program', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          programNane: 'BBBBBB',
          sponser: 'BBBBBB',
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

    it('should delete a Program', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProgramToCollectionIfMissing', () => {
      it('should add a Program to an empty array', () => {
        const program: IProgram = { id: 123 };
        expectedResult = service.addProgramToCollectionIfMissing([], program);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(program);
      });

      it('should not add a Program to an array that contains it', () => {
        const program: IProgram = { id: 123 };
        const programCollection: IProgram[] = [
          {
            ...program,
          },
          { id: 456 },
        ];
        expectedResult = service.addProgramToCollectionIfMissing(programCollection, program);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Program to an array that doesn't contain it", () => {
        const program: IProgram = { id: 123 };
        const programCollection: IProgram[] = [{ id: 456 }];
        expectedResult = service.addProgramToCollectionIfMissing(programCollection, program);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(program);
      });

      it('should add only unique Program to an array', () => {
        const programArray: IProgram[] = [{ id: 123 }, { id: 456 }, { id: 27176 }];
        const programCollection: IProgram[] = [{ id: 123 }];
        expectedResult = service.addProgramToCollectionIfMissing(programCollection, ...programArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const program: IProgram = { id: 123 };
        const program2: IProgram = { id: 456 };
        expectedResult = service.addProgramToCollectionIfMissing([], program, program2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(program);
        expect(expectedResult).toContain(program2);
      });

      it('should accept null and undefined values', () => {
        const program: IProgram = { id: 123 };
        expectedResult = service.addProgramToCollectionIfMissing([], null, program, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(program);
      });

      it('should return initial array if no Program is added', () => {
        const programCollection: IProgram[] = [{ id: 123 }];
        expectedResult = service.addProgramToCollectionIfMissing(programCollection, undefined, null);
        expect(expectedResult).toEqual(programCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
