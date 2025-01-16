export interface Tariff {
  id: number;
  name: string;
  price: number;
  downloadSpeed: number;
  uploadSpeed: number;
  features: string[];
}
