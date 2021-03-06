export class Journey {


    constructor(
        public $key:string,
        public company_name: string,
        public depart_date:Date,
        public trip_id:string,
        public vehicle_id:string,
        public trip_title:string
        
        ){} 


    // get isBeginner() {
    //     return this.tags && this.tags.includes('BEGINNER');
    // }


    static fromJsonList(array): Journey[] {
        return array.map(Journey.fromJson);
    }

    static fromJson({$key, company_name, depart_date, trip_id, vehicle_id, trip_title}):Journey {
        return new Journey(
            $key,
            company_name,
            depart_date,
            trip_id,
            vehicle_id,
            trip_title
        );
    }


}