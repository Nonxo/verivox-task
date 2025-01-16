import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tariff} from '../interface/tariff';
import {delay} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TariffService {
  private readonly http = inject(HttpClient)

  getTariffs() {
    // Simulating API call delay
    return this.http.get<{ tariffs: Tariff[] }>('assets/mock-data/tariffs.json')
      .pipe(delay(500));
  }
}
