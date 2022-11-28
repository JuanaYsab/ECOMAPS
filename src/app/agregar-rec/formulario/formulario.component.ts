import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { Recicladoras } from 'src/app/interfaces/recicladoras.interface';
import { Material } from 'src/app/interfaces/material.interface';
import { ListarecicladorasService } from 'src/app/servicios/listarecicladoras.service';
import { MaterialService } from 'src/app/servicios/material.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit, ViewWillEnter {

  public listaMateriales: Material[] = [];

  public form: FormGroup = new FormGroup({
    nombreCtrl: new FormControl<string>(null,[Validators.required]),
    ciudadCtrl: new FormControl<string>(null,[Validators.required]),
    barrioCtrl: new FormControl<string>(null,[Validators.required]),
    calleCtrl: new FormControl<string>(null,[Validators.required]),
    gpsCtrl: new FormControl<string>(null,[Validators.required]),
    telefonoCtrl: new FormControl<number>(null,[Validators.required]),
    pagaCtrl: new FormControl<string>(null,[Validators.required]),
    materialesCtrl: new FormControl<string>(null,[Validators.required]),
  
  });

  constructor(
    private servicioRecicladora: ListarecicladorasService,
    private servicioMaterial: MaterialService,
    private servicioToast: ToastController
  ) { }

  ionViewWillEnter(): void {
    this.form.reset();
  }

  ngOnInit() {
    this.cargarMaterial();
  }

  private cargarMaterial(){
    this.servicioMaterial.get().subscribe({
      next: (materiales) => {
        this.listaMateriales = materiales;
      },
      error: (e) => {
        console.log('Error al cargar Materiales', e);
        this.servicioToast.create({
          header: 'Error al cargar Materiales',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }
  


  guardar(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.registrar();
    }
  };

  private registrar(){
    const formulario: Recicladoras = {
     idrecicladora: null,
      nombre_rec: this.form.controls.nombreCtrl.value,
      ciudad: this.form.controls.ciudadCtrl.value,
      barrio: this.form.controls.barrioCtrl.value,
      calle: this.form.controls.calleCtrl.value,
      gps: this.form.controls.gpsCtrl.value,
      telefono_rec: this.form.controls.telefonoCtrl.value,
      paga: this.form.controls.pagaCtrl.value,
      estado: null,
      materiales: this.form.controls.materialesCtrl.value,
    }
    this.servicioRecicladora.post(formulario).subscribe({
      next: ()=>{
        this.servicioToast.create({
          header: '',
          message: 'Se registró correctamente la recicladora. <p> Ahora los administradores se encargarán de verificar los datos.',
          duration: 10000,
          color: 'success'
        }).then(t=> {t.present()});
      },
      error: (e) => {
        console.error('Error al registrar recicladora', e);
        this.servicioToast.create({
          header: 'Error al registrar',
          message: e.error,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }

  

}
