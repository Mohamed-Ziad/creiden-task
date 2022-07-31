import { Injectable } from '@angular/core';
import { ICity } from '../models/cities.model';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  listOfCities: ICity[] = [
    {
      name: 'alexandria',
    },
    {
      name: 'cairo',
    },
    {
      name: 'hurgada',
    },
    {
      name: 'giza',
    },
  ];
  constructor() {}

  getAll() {
    return this.listOfCities;
  }
}
