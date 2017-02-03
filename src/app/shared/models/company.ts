export class Company {


    constructor(
        public $key:string,
        public title: string
        
        ){} 

    static fromJsonList(array): Company[] {
        return array.map(Company.fromJson);
    }

    static fromJson({$key, title}):Company {
        return new Company(
            $key,
            title
        );
    }


}