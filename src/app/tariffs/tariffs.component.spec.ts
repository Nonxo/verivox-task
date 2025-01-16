import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffsComponent } from './tariffs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TariffService } from '../core/services/tariff.service';
import { of } from 'rxjs';

describe('TariffsComponent', () => {
  let component: TariffsComponent;
  let fixture: ComponentFixture<TariffsComponent>;
  let tariffServiceMock: jasmine.SpyObj<TariffService>;

  const mockTariffs = [
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
    // Create spy object before TestBed configuration
    tariffServiceMock = jasmine.createSpyObj('TariffService', ['getTariffs']);
    tariffServiceMock.getTariffs.and.returnValue(of({ tariffs: mockTariffs }));

    await TestBed.configureTestingModule({
      imports: [TariffsComponent],
      providers: [{ provide: TariffService, useValue: tariffServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a container element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container')).toBeTruthy();
  });

  it('should render tariff list', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.tariff-list')).toBeTruthy();
  });

  it('should render filters', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.filters')).toBeTruthy();
  });

  it('should initialize tariffs$ on ngOnInit', (done) => {
    component.ngOnInit();
    component.tariffs$?.subscribe(tariffs => {
      expect(tariffs.length).toBe(2);
      expect(tariffs[0].price).toBe(299.99);
      expect(tariffs[1].price).toBe(499.99);
      done();
    });
  });

  it('should sort tariffs by price ascending', () => {
    const sortedTariffs = component.sortTariffs([...mockTariffs]);
    component.sortBy = 'price';
    component.sortOrder = 'asc';

    expect(sortedTariffs[0].price).toBe(299.99);
    expect(sortedTariffs[1].price).toBe(499.99);
  });

  it('should sort tariffs by price descending', () => {
    component.sortBy = 'price';
    component.sortOrder = 'desc';
    const sortedTariffs = component.sortTariffs([...mockTariffs]);

    expect(sortedTariffs[0].price).toBe(499.99);
    expect(sortedTariffs[1].price).toBe(299.99);
  });

  it('should update sort criteria and order correctly', () => {
    component.sortBy = 'price';
    component.sortOrder = 'desc';

    // First click - ascending
    component.updateSort('price');
    expect(component.sortBy).toBe('price');
    expect(component.sortOrder).toBe('asc');

    // Second click - descending
    component.updateSort('price');

    expect(component.sortBy).toBe('price');
    expect(component.sortOrder).toBe('desc');

    // Click different criteria - ascending
    component.updateSort('name');
    expect(component.sortBy).toBe('name');
    expect(component.sortOrder).toBe('asc');
  });

  it('should sort tariffs by download speed', () => {
    component.sortBy = 'downloadSpeed';
    component.sortOrder = 'desc';
    const sortedTariffs = component.sortTariffs([...mockTariffs]);
    expect(sortedTariffs[0].downloadSpeed).toBe(100);
    expect(sortedTariffs[1].downloadSpeed).toBe(50);
  });

  it('should sort tariffs by upload speed', () => {
    component.sortBy = 'uploadSpeed';
    component.sortOrder = 'desc';
    const sortedTariffs = component.sortTariffs([...mockTariffs]);
    expect(sortedTariffs[0].uploadSpeed).toBe(20);
    expect(sortedTariffs[1].uploadSpeed).toBe(10);
  });
});
