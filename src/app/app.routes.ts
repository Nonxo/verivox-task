import { Routes } from '@angular/router';
import {TariffsComponent} from './tariffs/tariffs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tariffs', pathMatch: 'full' },
  { path: 'tariffs', component: TariffsComponent }
];
