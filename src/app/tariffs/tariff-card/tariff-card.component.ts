import {Component, input, LOCALE_ID} from '@angular/core';
import {Tariff} from '../../core/interface/tariff';
import {CurrencyPipe, registerLocaleData} from '@angular/common';
import de from '@angular/common/locales/de';

registerLocaleData(de)

@Component({
  selector: 'app-tariff-card',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  templateUrl: './tariff-card.component.html',
  styleUrl: './tariff-card.component.scss'
})
export class TariffCardComponent {
  index  = input.required<number>();
  tariff = input.required<Tariff>();
}
