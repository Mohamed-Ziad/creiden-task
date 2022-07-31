import { Component, Input, OnInit } from '@angular/core';
import { ICar } from '../../../shared/models/cars.model';
import { CarsService } from '../../../shared/services/cars.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss'],
})
export class DetailsViewComponent implements OnInit {
  @Input() modal!: any;
  @Input() carId: string = '';
  carData!: ICar;

  constructor(private _carService: CarsService) {}

  ngOnInit(): void {
    let car: any = this._carService.getOne(this.carId);

    if (car?.id) {
      return  this.carData = car;
    }
    return alert(car)
  }
}
