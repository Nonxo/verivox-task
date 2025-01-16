import {Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, shareReplay} from 'rxjs';
import {Tariff, TariffFilterConfig, TariffSortConfig} from '../core/interface/tariff';
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

  private readonly sortConfig = new BehaviorSubject<TariffSortConfig>({
    criteria: 'price',
    order: 'asc'
  });


  filterConfigs: TariffFilterConfig[] = [
    {
      key: 'price',
      label: 'Price',
      ariaLabel: 'Sort by price'
    },
    {
      key: 'downloadSpeed',
      label: 'Download Speed',
      ariaLabel: 'Sort by download speed'
    },
    {
      key: 'uploadSpeed',
      label: 'Upload Speed',
      ariaLabel: 'Sort by upload speed'
    }
  ];


  tariffs$: Observable<Tariff[]> | undefined;
  sortConfig$ = this.sortConfig.asObservable();

  private readonly tariffService = inject(TariffService);

  ngOnInit(): void {

    const rawTariffs$ = this.tariffService.getTariffs().pipe(
      map(response => response.tariffs),
      shareReplay(1)
    );

    // Combine latest sort config with tariffs to create sorted stream
    this.tariffs$ = combineLatest([
      rawTariffs$,
      this.sortConfig$.pipe(distinctUntilChanged())
    ]).pipe(
      map(([tariffs, sortConfig]) => this.sortTariffs(tariffs, sortConfig))
    );
  }

  private sortTariffs(tariffs: Tariff[], config: TariffSortConfig): Tariff[] {
    return [...tariffs].sort((a, b) => {
      const aValue = a[config.criteria];
      const bValue = b[config.criteria];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return config.order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      const factor = config.order === 'asc' ? 1 : -1;
      return ((Number(aValue)) - (Number(bValue))) * factor;
    });
  }

  updateSort(criteria: keyof Tariff): void {
    const currentConfig = this.sortConfig.value;
    const newConfig: TariffSortConfig = {
      criteria,
      order: currentConfig.criteria === criteria
        ? (currentConfig.order === 'asc' ? 'desc' : 'asc')
        : 'asc'
    };

    this.sortConfig.next(newConfig);
  }

}
