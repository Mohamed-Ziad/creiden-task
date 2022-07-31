import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICity } from '../../../shared/models/cities.model';
import { CarsService } from '../../../shared/services/cars.service';
import { CitiesService } from '../../../shared/services/cities.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent implements OnInit {
  @Input() modal!: any;

  addCarForm!: FormGroup;
  constructor(private _sanitizer: DomSanitizer,private _citiesService: CitiesService, private _carsService: CarsService, private _fb: FormBuilder) {
    this.addCarForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dailyRate: [0, [Validators.required]],
      imgSrc: ['', [Validators.required]],
      city: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
      airConditioning: ['', [Validators.required]],
    });
  }

  logForm() {
    console.log(this.addCarForm.value);
    this._carsService.add({
      price: this.addCarForm.get("dailyRate")?.value,
      name: this.addCarForm.get("name")?.value,
      city: this.addCarForm.get("city")?.value,
      shiftType: this.addCarForm.get("transmission")?.value,
      isAirConditioning: this.addCarForm.get("airConditioning")?.value,
      imgSrc: this.addCarForm.get("imgSrc")?.value
    });
    this.modal.close('Save click')
  }

  ngOnInit(): void {
    this.getAllCities();
  }

  listOfCities: ICity[] = [];
  getAllCities() {
    this.listOfCities = this._citiesService.getAll();
  }

  message:string = '';
  url : string | ArrayBuffer | null = "";
  imagePath : any = "";
  
  uploadPhoto(event:any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
        this.addCarForm.get("imgSrc")?.setValue(this.url)
        console.log(this.imagePath);
        

    }
  }
  
}
