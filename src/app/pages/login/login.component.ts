import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup;
  email: FormControl;
  pass: FormControl;

  constructor(private http:HttpClient,private cookieService: CookieService,private router: Router){
    this.email = new FormControl('',[Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);
    this.pass = new FormControl('',[Validators.required, Validators.minLength(8)]);
    this.myForm = new FormGroup({
      email: this.email,
      pass: this.pass
    });
  }


  submit(){
    if(this.myForm.valid){

      const body = {
        userName: this.email.value,
        password: this.pass.value
      };

      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post<any>('https://localhost:7035/api/Authorization/login',body,{headers}).subscribe((response:any) => {
      //console.log(response.token);
      if(response.token != null){
        let expDate = new Date();
        expDate.setDate(expDate.getDate() + 1);
        this.cookieService.set('token',response.token,expDate);
          this.email.setValue('');
          this.pass.setValue('');
          alert("Valid");
          this.router.navigate(['/genres_dashboard']);
        }
        else{
          alert("Not Valid!!!!!!!!!!!!!!");
        }
      });
    }
  }
}
