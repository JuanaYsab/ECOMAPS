import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRefresher, ToastController } from '@ionic/angular';
import { SesionService } from '../servicios/sesion.service';
import { Credenciales } from './../interfaces/credenciales.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

  public cargandoAdministrador: boolean = false;

  public form: FormGroup = new FormGroup({
    ci: new FormControl<number | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  constructor(
    private servicioSesion: SesionService,
    private servicioToast: ToastController
  ) { 
    
  }

  ngOnInit(): void {
    this.iniciarSesion();
  }

  public iniciarSesion(){
    this.refresher?.complete();
    this.actualizarValidación();
    if(this.form.valid){
      const cred: Credenciales = {
        ci: this.form.get('ci')?.value,
        password: this.form.get('password')?.value
      }  
      this.servicioSesion.iniciar(cred).subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          this.servicioToast.create({
            header: 'Inicio de sesión correcto',
            message: '',
            duration: 10000,
            color: 'success',
            position: 'middle'
          }).then(t=> {t.present()});
        },
        error: (e) => {
          console.error('Error al iniciar sesión.', e);
          this.servicioToast.create({
            header: 'Error al iniciar sesión.',
            message: e.message,
            duration: 3000,
            color: 'danger',
            position: 'bottom'
          }).then(toast => toast.present());          
        }
      })
    }
    console.log(this.form.get('ci')?.value);
    console.log(this.form.get('password')?.value);
  }  

  private actualizarValidación(){
    if(this.form.get('ci')?.invalid){
      this.form.get('ci')?.markAsTouched();
      this.form.get('ci')?.markAsDirty();
    }
    if(this.form.get('password')?.invalid){
      this.form.get('password')?.markAsTouched();
      this.form.get('password')?.markAsDirty();
    }
  }

}
