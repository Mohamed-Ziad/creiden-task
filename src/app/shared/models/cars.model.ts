import { EAirConditioning, ECarsShiftType } from '../enums/cars.enum';

export interface ICar {
  id: string;
  imgSrc: string;
  name: string;
  isAirConditioning: EAirConditioning;
  shiftType: ECarsShiftType;
  price: number;
  city: string;
}
