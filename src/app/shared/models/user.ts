export class User {


    constructor(
        public $uid:string,
        public company_id: string
        
        ){} 

    static fromJsonList(array): User[] {
        return array.map(User.fromJson);
    }

    static fromJson({$uid, company_id}):User {
        return new User(
            $uid,
            company_id
        );
    }


}