import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffCardComponent } from './tariff-card.component';
import { By } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

describe('tariffCardComponent', () => {
  let component: TariffCardComponent;
  let fixture: ComponentFixture<TariffCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffCardComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'de' }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TariffCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('index', 0);
    fixture.componentRef.setInput('tariff', {
      id: 1,
      name: 'Basic Internet',
      price: 299.99,
      downloadSpeed: 50,
      uploadSpeed: 10,
      contractLength: 12,
      features: ['Basic Support 9-5', 'Standard WiFi Router', 'Email Service']
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct tariff name', () => {
    const tariffNameElement = fixture.debugElement.query(By.css('.tariff-name')).nativeElement;
    expect(tariffNameElement.textContent).toContain('Basic Internet');
  });

  it('should display the correct download speed', () => {
    const downloadSpeedElement = fixture.debugElement.query(By.css('.speed .value')).nativeElement;
    expect(downloadSpeedElement.textContent).toContain('50 Mbit/s');
  });

  it('should display the correct upload speed', () => {
    const uploadSpeedElement = fixture.debugElement.query(By.css('.speed-type.upload .value')).nativeElement;
    expect(uploadSpeedElement.textContent).toContain('10 Mbit/s');
  });

  it('should display the correct price', () => {
    const priceElement = fixture.debugElement.query(By.css('.price .amount')).nativeElement;
    expect(priceElement.textContent).toContain('299,99');
  });

  it('should display the correct number of features', () => {
    const featureElements = fixture.debugElement.queryAll(By.css('.features .feature'));
    expect(featureElements.length).toBe(3);
  });
});
