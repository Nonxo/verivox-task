import { TestBed } from '@angular/core/testing';
import { TariffService } from './tariff.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';


describe('TariffService', () => {
  let service: TariffService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting(), TariffService]
    });
    service = TestBed.inject(TariffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
