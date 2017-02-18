export class Vehicle {


    constructor(
        public $key:string,
        public number: string,
        public driver: string,
        public company_id: string
        ){} 

    static fromJsonList(array): Vehicle[] {
        return array.map(Vehicle.fromJson);
    }

    static fromJson({$key, number, driver, company_id}):Vehicle {
        return new Vehicle(
            $key,
            number,
            driver,
            company_id
        );
    }


}