import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRefresher, ToastController, ViewWillEnter } from '@ionic/angular';
import { Comentarios } from '../interfaces/comentarios.interface';
import { ComentariosService } from '../servicios/comentarios.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.page.html',
  styleUrls: ['./sugerencias.page.scss'],
})
export class SugerenciasPage implements OnInit, ViewWillEnter {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

  public form: FormGroup = new FormGroup({
    comentarioCtrl: new FormControl<string>(null,Validators.required)
  });
  
  constructor(
    private servicioComentarios: ComentariosService,
    private servicioToast: ToastController
  ) { }

  ionViewWillEnter(): void {
    this.form.reset();
  }

  ngOnInit() {
    this.cargarComentarios();
  }

public cargarComentarios(){
  this.refresher?.complete();
}
  guardar(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.registrarComen();
    }
  };
  
  private registrarComen(){
    const comentarios: Comentarios = {
      idcomentario: null,
      comentario: this.form.controls.comentarioCtrl.value
    }
    this.servicioComentarios.post(comentarios).subscribe({
      next: ()=>{
        this.servicioToast.create({
          header: '',
          message: 'Su comentario se ha registrado con éxito.',
          duration: 10000,
          color: 'success'
        }).then(t=> {t.present()});
      },
      error: (e) => {
        console.error('Error al registrar comentario', e);
        this.servicioToast.create({
          header: 'Error al registrar',
          message: e.error,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }


}
