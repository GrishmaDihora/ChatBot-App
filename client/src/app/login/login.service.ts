import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable()
export class LoginService {

	constructor(private http: HttpClient){

    }

    public maxValue:Number=9999;
    public minValue:Number=1000;
    public randNum:Number = Math.floor(Math.random() * (+this.maxValue - +this.minValue)) + +this.minValue;


    loggedIn(user:User,randNum:Number)
    {
        return this.http.post('/api/user/loggedIn',{
            username : user.username,
            password : user.password,
            randNUm : randNum
        })
    }

    signUp(user:User)
    {
        return this.http.post('/api/user/createUser',{
            username : user.username,
            password : user.password,
            email : user.email
        })
    }
}