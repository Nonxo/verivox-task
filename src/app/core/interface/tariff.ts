export interface Tariff {
  id: number;
  name: string;
  price: number;
  downloadSpeed: number;
  uploadSpeed: number;
  features: string[];
}

export interface TariffSortConfig {
  criteria: keyof Tariff;
  order: 'asc' | 'desc';
}

export interface TariffFilterConfig {
  key: keyof Tariff;
  label: string;
  ariaLabel: string;
}
