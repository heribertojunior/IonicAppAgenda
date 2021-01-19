import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
//criando variavel authForm para formulario
  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'login',
    actionChange: 'Create account'
  };
  private nameControl = new FormControl('',[Validators.required, Validators.minLength(3)]);

  //requerindo FormBuilder
  constructor(private fb: FormBuilder) { }

  //Chamando validação ao iniciar a pagina
  ngOnInit(): void {
    this.createForm();
  }

//Validação de formulario da pagina login
  private createForm(): void {
    this.authForm = this.fb.group({
      email: [' ',[Validators.required, Validators.email]],
      password: [' ',[Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void{
    this.configs.isSignIn = !this.configs.isSignIn;
  }
  onSubmit(): void {
    console.log('AuthForm: ',  this.authForm.value);
  }

}
