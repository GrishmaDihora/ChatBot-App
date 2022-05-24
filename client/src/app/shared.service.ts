import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

    private nameSource = new BehaviorSubject(" ");
    currentUser = this.nameSource.asObservable();
    public currentUserName:string;

	constructor(){ }

    changeUser(userName:string){
        this.nameSource.next(userName);
        this.currentUserName = userName;
    }

    
}