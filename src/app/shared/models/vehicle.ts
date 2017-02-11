export class Vehicle {


    constructor(
        public $key:string,
        public number: string
        
        ){} 

    static fromJsonList(array): Vehicle[] {
        return array.map(Vehicle.fromJson);
    }

    static fromJson({$key, number}):Vehicle {
        return new Vehicle(
            $key,
            number
        );
    }


}