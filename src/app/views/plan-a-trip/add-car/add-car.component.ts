import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICity } from '../../../shared/models/cities.model';
import { CarsService } from '../../../shared/services/cars.service';
import { CitiesService } from '../../../shared/services/cities.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent implements OnInit {
  @Input() modal!: any;

  addCarForm!: FormGroup;
  constructor(
    private _citiesService: CitiesService,
    private _carsService: CarsService,
    private _fb: FormBuilder
  ) {
    this.addCarForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required]],
      imgSrc: ['', [Validators.required]],
      city: ['', [Validators.required]],
      shiftType: ['', [Validators.required]],
      isAirConditioning: ['', [Validators.required]],
    });
  }

  submit() {
    this._carsService.add(this.addCarForm.value);
    this.modal.close('Save click'); 
  }

  ngOnInit(): void {
    this.getAllCities();
  }

  listOfCities: ICity[] = [];
  getAllCities() {
    this.listOfCities = this._citiesService.getAll();
  }

  message: string = '';
  url: string | ArrayBuffer | null = '';
  imagePath: any = '';

  uploadPhoto(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      this.addCarForm.get('imgSrc')?.setValue(this.url);
    };
  }
}
