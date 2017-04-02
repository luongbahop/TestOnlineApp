import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class Reddit{
    baseUrl: String;

    constructor( public http: Http){
        this.baseUrl="https://www.reddit.com/r";
    }
    getPosts(category,limit){
        return this.http.get(this.baseUrl+'/'+category+'/top.json?limit='+limit)
                .map(res=>res.json());
    }
}