//import library
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
export class UserData {  
    static get parameters() {
        return [[Http]];
    }
    constructor(private http:Http) {
         
    }
  
    login(username,password) {
       var url = 'http://donghuongtrucmy.vn/json.php?type=login&e='+username+'&p='+password;
       var response = this.http.get(url).map(res => res.json());
       return response;
    }
}