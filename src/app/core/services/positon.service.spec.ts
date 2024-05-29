import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PositonService } from './positon.service';
import { environment } from 'src/environments/environment';
import { Positions } from '../models/employee.model';

describe('PositionService', () => {
  let service: PositonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PositonService]
    });
    service = TestBed.inject(PositonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch positions successfully', () => {
    const mockPositions: Positions = { positions: ['Frontend Developer', 'Backend Developer'] };

    service.getPositions().subscribe((positions) => {
      expect(positions).toEqual(mockPositions);
    });

    const req = httpMock.expectOne(environment.apiPostitonsUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPositions);
  });

  it('should handle error when fetching positions', () => {
    const mockError = new ErrorEvent('Network error');

    service.getPositions().subscribe(
      () => fail('Expected an error, not positions'),
      (error) => {
        expect(error.error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne(environment.apiPostitonsUrl);
    req.error(mockError);
  });

  it('should have the correct URL for positions', () => {
    expect(service.urlPostions).toBe(environment.apiPostitonsUrl);
  });
});
