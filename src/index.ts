abstract class Vehicle {
    private _make: string;
    private _model: string;
    private _year: number;
    private _rented: boolean;

    constructor(_pmake: string, _pmodel: string, _pyear: number, _prented: boolean) {
        this._make = _pmake;
        this._model = _pmodel;
        this._year = _pyear;
        this._rented = _prented;
    }

    set make(makeName: string) {
        this._make = makeName;
    }

    set model(modelName: string) {
        this._model = modelName;
    }

    set year(yearVal: number) {
        this._year = yearVal;
    }

    set rented(Rented: boolean) {
        this._rented = Rented;
    }

    get make() {
        return this._make;
    }

    get model() {
        return this._model;
    }

    get year() {
        return this._year;
    }

    get rented() {
        return this._rented;
    }

    public rent(): string {
        if (this._rented == true) {
            return "Vehicle is already rented!";
        }
        this._rented = true;
        return "Vehicle rented successfully!";
    }

    public returnVehicle(): string {
        if (this._rented == true) {
            this._rented = false;
            return "Vehicle returned successfully!";
        }
        return "Vehicle is not rented yet!";
    }

    abstract rentalRate(rate: number): number;
}

class Motorcycle extends Vehicle {
    public speed: string;
    public category: string;
    constructor(_make: string, _model: string, _year: number, _rented: boolean, s: string) {
        super(_make, _model, _year, _rented);
        this.category = "Motorcycle";
        this.speed = s;
    }

    rentalRate(rate: number): number {
        return rate;
    }
}

class Car extends Vehicle {
    public speed: string;
    public category: string;
    constructor(_make: string, _model: string, _year: number, _rented: boolean, s: string) {
        super(_make, _model, _year, _rented);
        this.category = "Car";
        this.speed = s;
    }

    rentalRate(rate: number): number {
        return rate;
    }
}

class Truck extends Vehicle {
    public speed: string;
    public category: string;
    constructor(_make: string, _model: string, _year: number, _rented: boolean, s: string) {
        super(_make, _model, _year, _rented);
        this.category = "Truck";
        this.speed = s;
    }

    rentalRate(rate: number): number {
        return rate;
    }
}

let vehicles: (Car | Motorcycle | Truck)[] = [];

vehicles.push(new Car("Ford", "Mustang GT", 2022, false, "155 mph"));
vehicles.push(new Car("Tesla", "Model S", 2021, false, "200 mph"));
vehicles.push(new Truck("Ford", "F-150", 2022, false, "107 mph"));
vehicles.push(new Motorcycle("Harley-Davidson", "Sportster S", 2021, false, "120 mph"));
vehicles.push(new Car("BMW", "M4", 2022, false, "180 mph"));

let vi: number = 0;

const nbtn = document.getElementById("next")! as HTMLButtonElement;
const pbtn = document.getElementById("prev")! as HTMLButtonElement;
const vcard = document.getElementById("v-card")! as HTMLDivElement;
const notify = document.getElementById("notify")! as HTMLDivElement;

nbtn.onclick = function(){
	vi++;
	if(vi > vehicles.length-1){
		vi = 0;
	}
	dispV();
}

pbtn.onclick = function(){
	vi--;
	if(vi < 0){
		vi = vehicles.length-1;
	}
	dispV();
}
let timeoutID: number[] = [];
function notifyUser(n: string): void{
	for(let b in timeoutID){
		clearTimeout(+b);
	}
           
  timeoutID = [];
	notify.innerHTML = n;
	let a: number = setTimeout(()=>{notify.innerHTML = "";},1500);
	timeoutID.push(a);
}
function dispV(): void {
	vcard.innerHTML = `</br>Category: ${vehicles[vi].category}</br></br>Make: ${vehicles[vi].make}</br>Model: ${vehicles[vi].model}</br>Year: ${vehicles[vi].year}</br>Top Speed: ${vehicles[vi].speed}</br></br>Rented: `;

  if(vehicles[vi].rented == false){
		vcard.innerHTML+=`No</br><button class="fwidth" onclick="notifyUser(vehicles[vi].rent());dispV();">Rent</button>`;
	}
	else{
		vcard.innerHTML+=`Yes</br><button class="fwidth" onclick="notifyUser(vehicles[vi].returnVehicle());dispV();">Return</button>`;
  }
}
dispV();
