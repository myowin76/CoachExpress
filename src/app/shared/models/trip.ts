export class Trip {


    constructor(
        public $key:string,
        public title: string
        
        ){} 

    static fromJsonList(array): Trip[] {
        return array.map(Trip.fromJson);
    }

    static fromJson({$key, title}):Trip {
        return new Trip(
            $key,
            title
        );
    }


}