import { Injectable } from '@angular/core';
import { EAirConditioning, ECarsShiftType } from '../enums/cars.enum';
import { ICar } from '../models/cars.model';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  listOfCars: ICar[] = [
    {
      imgSrc: '../../../assets/images/cars/1.png',
      name: 'Mercedes GLS 2022',
      isAirConditioning: EAirConditioning.YES,
      shiftType: ECarsShiftType.AUTOMATIC,
      price: 24.0,
      city: 'alexandria',
    },
    {
      imgSrc: '../../../assets/images/cars/3.png',
      name: 'Mercedes V Class 2022',
      isAirConditioning: EAirConditioning.NO,
      shiftType: ECarsShiftType.MANUAL,
      price: 38.0,
      city: 'giza',
    },
    {
      imgSrc: '../../../assets/images/cars/2.png',
      name: 'Maybach Mercedes',
      isAirConditioning: EAirConditioning.YES,
      shiftType: ECarsShiftType.AUTOMATIC,
      price: 25.0,
      city: 'cairo',
    },
    {
      imgSrc: '../../../assets/images/cars/4.png',
      name: 'Mercedes E Class 2022',
      isAirConditioning: EAirConditioning.YES,
      shiftType: ECarsShiftType.MANUAL,
      price: 59.0,
      city: 'alexandria',
    },
    {
      imgSrc: '../../../assets/images/cars/5.png',
      name: 'BMW x7 2022',
      isAirConditioning: EAirConditioning.NO,
      shiftType: ECarsShiftType.AUTOMATIC,
      price: 83.0,
      city: 'hurgada',
    },
  ];

  constructor() {}

  add({ name, price, imgSrc, isAirConditioning, shiftType, city }: ICar) {
    this.listOfCars.push({
      name,
      price,
      imgSrc,
      city,
      shiftType,
      isAirConditioning,
    });
  }

  getAll() {
    return this.listOfCars;
  }

  filteration(filter: {
    cities: string[];
    shiftType: string[];
    airConditioning: string[];
    price: { min: number; max: number };
  }) {
    return this.listOfCars.filter((car) => {
      if (
        (filter.cities.length ? filter.cities.includes(car.city) : true) &&
        (filter.shiftType.length
          ? filter.shiftType.includes(car.shiftType)
          : true) &&
        (filter.airConditioning.length
          ? filter.airConditioning.includes(car.isAirConditioning)
          : true) &&
        car.price >= filter.price.min &&
        car.price <= filter.price.max
      ) {
        return car;
      }
      return null;
    });
  }

  
  
}
