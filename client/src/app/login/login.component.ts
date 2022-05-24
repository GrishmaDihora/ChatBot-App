import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { AuthGuardService } from '../authGuard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})


export class LoginComponent implements OnInit {

  public user:User;
  public username:String;
  public LoginMessage:String;
  public randNum:Number;
  

  constructor(private authGuardService:AuthGuardService, private sharedService:SharedService, private loginService:LoginService, private route:Router) { 
    this.user= new User();
  }

  ngOnInit() {
    
    //this.loggedIn();
  }

  loggedIn(){
    if(this.user.username && this.user.password){
      this.loginService.loggedIn(this.user,this.randNum).subscribe( (result:any) => {
        console.log('result is ', result);
          
         if(result.status == "success")
         {
            localStorage.setItem('token',this.user.username); 
            this.route.navigate(['/home']);
            this.sharedService.changeUser(this.user.username);
            this.authGuardService.userLoggedIn = true;          
          }
          else{
            this.LoginMessage="Wrong Username or Password";
          }  
      }, error => {
        console.log('error is ', error);
      }); 
    } else {
  		alert('enter username and password');
    }
      	    
  }

  signUp(){
    if(this.user.username && this.user.password){
      this.loginService.signUp(this.user).subscribe((result:any) => {
        console.log('result is ', result);
        if(result.status=="success")
        {
            localStorage.setItem('token',this.user.username);
            this.route.navigate(['/home']);
            this.authGuardService.userLoggedIn = true;  
        }  
        this.LoginMessage = "Signup successfully";
      }, error => {
        console.log('error is ', error);
      }); 
  	} else {
  		alert('enter username and password');
    }
  }

  
}
