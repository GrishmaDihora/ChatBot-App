import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './home.service';
import { Message } from '../model/message.model';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { AuthGuardService } from '../authGuard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})

export class HomeComponent implements OnInit {

  public message:Message;
  public contactlist : any[];
  public messages : any [];
  public Receiver:String;
  public dev:String;
  public receiverName:String;
  public token:String;
  public tempName:String;

  constructor(private authGuardService:AuthGuardService, private router:Router, private homeService:HomeService) { 
    this.message = new Message();
    
    setInterval(()=>this.getMessages(),1000);  
    setInterval(()=>this.getContacts(),1000);
        
  }

  changed(name:HTMLInputElement){
    this.Receiver = name.value;
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.authGuardService.userLoggedIn = false;
  }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    //this.token=this.sharedService.currentUserName;
    //this.sharedService.currentUser.subscribe(username => this.token=username);
    this.getMessages();
    this.getContacts();
    
  }
  
  createNew()
  {
    if(this.receiverName)
    {
      this.homeService.createNew(this.token,this.receiverName).subscribe(result => {
        console.log('result is',result);
      },error =>{
        console.log('error is',error);
      });  
    }else{
      alert('Enter receiver name');
    }
  }

  getContacts(){
    this.homeService.getContacts(this.token).subscribe(result => {
      this.contactlist = result['data'];
    });
  }


  getMessages(){
    this.homeService.getMessages(this.token,this.Receiver).subscribe(result=>{
      this.messages = result['data'];
      //this.tempMsgs = result['data'];
    });
  
  }

  sendMsg(){
    if(this.message.sendMsg) {
      
  		this.homeService.sendMsg(this.message,this.token,this.Receiver).subscribe(result => {
        console.log('result is ', result);  
      }, error => {
        console.log('error is ', error);
      }); 
  	} else {
  		alert('enter title and description');
  	}
  }

}
