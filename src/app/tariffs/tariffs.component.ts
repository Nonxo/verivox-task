import {Component, inject, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Tariff} from '../core/interface/tariff';
import {TariffService} from '../core/services/tariff.service';
import {AsyncPipe} from '@angular/common';
import {TariffCardComponent} from './tariff-card/tariff-card.component';

@Component({
  selector: 'app-tariffs',
  standalone: true,
  templateUrl: './tariffs.component.html',
  imports: [
    AsyncPipe,
    TariffCardComponent
  ],
  styleUrl: './tariffs.component.scss'
})
export class TariffsComponent implements OnInit{

  tariffs$: Observable<Tariff[]> | undefined;
  sortBy: string = 'price';
  sortOrder: 'asc' | 'desc' = 'asc';

  tariffs: Tariff[] = [];

  private readonly tariffService = inject(TariffService);

  ngOnInit(): void {
    this.tariffs$ = this.tariffService.getTariffs().pipe(
      map(response => this.sortTariffs(response.tariffs))
    );
  }

  sortTariffs(tariffs: Tariff[]): Tariff[] {
    return [...tariffs].sort((a, b) => {
      const factor = this.sortOrder === 'asc' ? 1 : -1;
      return (a[this.sortBy as keyof Tariff] as number) * factor -
        (b[this.sortBy as keyof Tariff] as number) * factor;
    });
  }

  updateSort(criteria: string): void {
    if (this.sortBy === criteria) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = criteria;
      this.sortOrder = 'asc';
    }

    this.tariffs$ = this.tariffService.getTariffs().pipe(
      map(response => this.sortTariffs(response.tariffs))
    );
  }

}
