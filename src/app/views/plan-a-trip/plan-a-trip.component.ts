import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarsService } from '../../shared/services/cars.service';
import { ICar } from '../../shared/models/cars.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CitiesService } from '../../shared/services/cities.service';
import { ESortTypes } from '../../shared/enums/cars.enum';

@Component({
  selector: 'app-plan-a-trip',
  templateUrl: './plan-a-trip.component.html',
  styleUrls: ['./plan-a-trip.component.scss'],
})
export class PlanATripComponent implements OnInit {
  //#region Price Slider Config Code
  options: Options = {
    floor: 20,
    ceil: 100,
    translate: (value: number): string => {
      return `<small style="font-size: 12px;">USD</small>` + value.toFixed(2);
    },
  };
  //#endregion Price Slider Config  Code

  filterForm!: FormGroup;
  constructor(
    private modalService: NgbModal,
    private _carsService: CarsService,
    private _fb: FormBuilder,
    private _citiesService: CitiesService
  ) {
    //#region Build Filter Form
    this.filterForm = this._fb.group({
      price: [[20, 100]],
      airConditioning: this._fb.array([
        this._fb.group({
          name: 'yes',
          selected: false,
        }),
        this._fb.group({
          name: 'no',
          selected: false,
        }),
      ]),
      cities: this._fb.array([]),
      shiftType: this._fb.array([
        this._fb.group({
          name: 'manual',
          selected: false,
        }),
        this._fb.group({
          name: 'automatic',
          selected: false,
        }),
      ]),
    });
    //#endregion Build Filter Form
  }
  get cities() {
    return this.filterForm.controls['cities'] as FormArray;
  }

  get airConditioning() {
    return this.filterForm.controls['airConditioning'] as FormArray;
  }
  get shiftType() {
    return this.filterForm.controls['shiftType'] as FormArray;
  }

  getAllCities() {
    let listOfCities = this._citiesService.getAll();
    listOfCities.forEach(({ name }) => {
      this.cities.push(this._fb.group({ name, selected: false }) as FormGroup);
    });
  }

  resetForm() {
    this.cities.controls.forEach((element) => {
      element.get('selected')?.setValue(false);
    });
    this.shiftType.controls.forEach((element) => {
      element.get('selected')?.setValue(false);
    });
    this.airConditioning.controls.forEach((element) => {
      element.get('selected')?.setValue(false);
    });
    this.filterForm.get('price')?.setValue([20, 100]);
  }

  filteration = () => {
    let cities: string[] = this.cities.value.map((car: any) =>
      car.selected ? car.name : ''
    );

    let airConditioning: string[] = this.airConditioning.value.map((car: any) =>
      car.selected ? car.name : ''
    );
    let shiftType: string[] = this.shiftType.value.map((car: any) =>
      car.selected ? car.name : ''
    );

    this.listOfCars = this._carsService.filteration({
      cities: cities.filter((e: string) => e),
      airConditioning: airConditioning.filter((e: string) => e),
      shiftType: shiftType.filter((e: string) => e),
      price: {
        min: this.filterForm.get('price')?.value[0],
        max: this.filterForm.get('price')?.value[1],
      },
    });
  };

  ngOnInit(): void {
    this.getAllCars();
    this.getAllCities();
  }

  listOfCars: ICar[] = [];

  getAllCars() {
    this.listOfCars = this._carsService.getAll();
  }

  get SortTypes(): typeof ESortTypes {
    return ESortTypes;
  }

  sortCars(sortType: ESortTypes) {
    console.log({ sortType });

    switch (sortType) {
      case this.SortTypes.ALPHABET:
        this.listOfCars.sort(function compare(a: ICar, b: ICar) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        break;
      case this.SortTypes.PRICE_H_2_L:
        this.listOfCars.sort(({ price: a }, { price: b }) => b - a);
        break;
      case this.SortTypes.PRICE_L_2_H:
        this.listOfCars.sort(({ price: a }, { price: b }) => a - b);
        break;
      default:
        return;
    }
  }
  //#region Add Car Modal Control Code
  closeResult = '';
  viewDetailsCarId:string = "";
  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //#endregion Add Car Modal Control Code
}
