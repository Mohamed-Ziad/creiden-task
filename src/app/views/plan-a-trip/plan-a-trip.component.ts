import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarsService } from '../../shared/services/cars.service';
import { ICar } from '../../shared/models/cars.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CitiesService } from '../../shared/services/cities.service';
import { ICity } from '../../shared/models/cities.model';
import { ESortTypes } from '../../shared/enums/cars.enum';

@Component({
  selector: 'app-plan-a-trip',
  templateUrl: './plan-a-trip.component.html',
  styleUrls: ['./plan-a-trip.component.scss'],
})
export class PlanATripComponent implements OnInit {
  minValue: number = 20;
  maxValue: number = 100;
  options: Options = {
    floor: 20,
    ceil: 100,
    translate: (value: number): string => {
      return `<small style="font-size: 12px;">USD</small>` + value.toFixed(2);
    },
  };

  logPrice() {
    console.log(this.maxValue, this.minValue);
  }

  filterForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private _carsService: CarsService,
    private _fb: FormBuilder,
    private _citiesService: CitiesService
  ) {
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

  addCityForm({ selected, name }: { name: string; selected: boolean }) {
    this.cities.push(this._fb.group({ name, selected }) as FormGroup);
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
  }

  filteration = () => {
    let cities: string[] = this.cities.value
      .map((car: any) => {
        return car.selected ? car.name : '';
      })
      .filter((e: string) => e);
    let airConditioning: string[] = this.airConditioning.value
      .map((car: any) => {
        return car.selected ? car.name : '';
      })
      .filter((e: string) => e);
    let shiftType: string[] = this.shiftType.value
      .map((car: any) => {
        return car.selected ? car.name : '';
      })
      .filter((e: string) => e);

    console.log({
      cities,
      airConditioning,
      shiftType,
      price: {
        min: this.filterForm.get('price')?.value[0],
        max: this.filterForm.get('price')?.value[1],
      },
    });

    this.listOfCars = this._carsService.filteration({
      cities,
      airConditioning,
      shiftType,
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
    console.log({sortType});
    
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
        break
      default: return
    }

    // function priceHeightToLow() {}

    // this.listOfCars.sort(({ price: a }, { price: b }) => a - b);
  }

  listOfCities: ICity[] = [];
  getAllCities() {
    this.listOfCities = this._citiesService.getAll();
    this.listOfCities.forEach(({ name }) => {
      this.addCityForm({ name, selected: false });
    });
    console.log(this.filterForm.value);
  }

  closeResult = '';
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
}
