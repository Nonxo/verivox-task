import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffsComponent } from './tariffs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TariffService } from '../core/services/tariff.service';
import { AsyncPipe } from '@angular/common';
import { TariffCardComponent } from './tariff-card/tariff-card.component';
import { of, firstValueFrom } from 'rxjs';
import { Tariff } from '../core/interface/tariff';

describe('TariffsComponent', () => {
  let component: TariffsComponent;
  let fixture: ComponentFixture<TariffsComponent>;
  let tariffServiceMock: jasmine.SpyObj<TariffService>;

  const mockTariffs: Tariff[] = [
    {
      id: 1,
      name: 'Basic Internet',
      price: 299.99,
      downloadSpeed: 50,
      uploadSpeed: 10,
      features: ['Basic Support 9-5', 'Standard WiFi Router', 'Email Service']
    },
    {
      id: 2,
      name: 'Premium Internet',
      price: 499.99,
      downloadSpeed: 100,
      uploadSpeed: 20,
      features: ['24/7 Support', 'Premium WiFi Router', 'Cloud Storage']
    }
  ];

  beforeEach(async () => {
    tariffServiceMock = jasmine.createSpyObj('TariffService', ['getTariffs']);
    tariffServiceMock.getTariffs.and.returnValue(of({ tariffs: mockTariffs }));

    await TestBed.configureTestingModule({
      imports: [
        TariffsComponent,
        AsyncPipe,
        TariffCardComponent
      ],
      providers: [
        { provide: TariffService, useValue: tariffServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct filter configurations', () => {
    expect(component.filterConfigs.length).toBe(3);
    expect(component.filterConfigs[0]).toEqual({
      key: 'price',
      label: 'Price',
      ariaLabel: 'Sort by price'
    });
  });

  it('should initialize tariffs$ with default sorting', async () => {
    const tariffs = await firstValueFrom(component.tariffs$!);
    expect(tariffs.length).toBe(2);
    expect(tariffs[0].price).toBe(299.99);
    expect(tariffs[1].price).toBe(499.99);
  });

  it('should call tariffService.getTariffs on init', () => {
    expect(tariffServiceMock.getTariffs).toHaveBeenCalled();
  });

  describe('sorting functionality', () => {
    it('should sort tariffs by price ascending by default', async () => {
      const tariffs = await firstValueFrom(component.tariffs$!);
      expect(tariffs[0].price).toBe(299.99);
      expect(tariffs[1].price).toBe(499.99);
    });

    it('should sort tariffs by price descending when toggled', async () => {
      component.updateSort('price');
      const tariffs = await firstValueFrom(component.tariffs$!);
      expect(tariffs[0].price).toBe(499.99);
      expect(tariffs[1].price).toBe(299.99);
    });

    it('should sort tariffs by download speed', async () => {
      component.updateSort('downloadSpeed');
      const tariffs = await firstValueFrom(component.tariffs$!);
      expect(tariffs[0].downloadSpeed).toBe(50);
      expect(tariffs[1].downloadSpeed).toBe(100);
    });

    it('should sort tariffs by upload speed', async () => {
      component.updateSort('uploadSpeed');
      const tariffs = await firstValueFrom(component.tariffs$!);
      expect(tariffs[0].uploadSpeed).toBe(10);
      expect(tariffs[1].uploadSpeed).toBe(20);
    });

    it('should handle sort updates correctly', async () => {
      let sortConfig = await firstValueFrom(component.sortConfig$);
      expect(sortConfig).toEqual({ criteria: 'price', order: 'asc' });

      component.updateSort('price');
      sortConfig = await firstValueFrom(component.sortConfig$);
      expect(sortConfig).toEqual({ criteria: 'price', order: 'desc' });

      component.updateSort('downloadSpeed');
      sortConfig = await firstValueFrom(component.sortConfig$);
      expect(sortConfig).toEqual({ criteria: 'downloadSpeed', order: 'asc' });
    });
  });

  describe('template rendering', () => {
    it('should render all filter buttons', () => {
      const compiled = fixture.nativeElement;
      const buttons = compiled.querySelectorAll('.filters button');
      expect(buttons.length).toBe(component.filterConfigs.length);
    });

    it('should display correct sort indicators', async () => {
      const compiled = fixture.nativeElement;
      fixture.detectChanges();

      let priceButton = compiled.querySelector('[aria-label="Sort by price"]');
      expect(priceButton.querySelector('span').textContent.trim()).toBe('↑');

      component.updateSort('price');
      fixture.detectChanges();
      expect(priceButton.querySelector('span').textContent.trim()).toBe('↓');
    });

    it('should render tariff cards', async () => {
      const compiled = fixture.nativeElement;
      fixture.detectChanges();

      const tariffCards = compiled.querySelectorAll('app-tariff-card');
      expect(tariffCards.length).toBe(mockTariffs.length);
    });
  });
});
