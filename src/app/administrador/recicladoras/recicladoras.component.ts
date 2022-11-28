import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Recicladoras } from 'src/app/interfaces/recicladoras.interface';
import { Material } from 'src/app/interfaces/material.interface';
import { MaterialService } from 'src/app/servicios/material.service';
import { AdministrarService } from 'src/app/servicios/administrar.service';

@Component({
  selector: 'app-recicladoras',
  templateUrl: './recicladoras.component.html',
  styleUrls: ['./recicladoras.component.scss'],
})
export class RecicladorasComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaMateriales: Material[] = [];

  public form: FormGroup = new FormGroup({
    idrecicladoraCtrl: new FormControl<number>(null, [Validators.required]),
    nombreCtrl: new FormControl<string>(null, [Validators.required]),
    telefonoCtrl: new FormControl<number>(null, [Validators.required]),
    pagaCtrl: new FormControl<number>(null, [Validators.required]),
    ciudadCtrl: new FormControl<string>(null, [Validators.required]),
    barrioCtrl: new FormControl<string>(null, [Validators.required]),
    calleCtrl: new FormControl<string>(null, [Validators.required]),
    gpsCtrl: new FormControl<string>(null, [Validators.required]),
    estadoCtrl: new FormControl<string>(null, [Validators.required]),
    materialesCtrl: new FormControl<string>(null, [Validators.required])
  });

  constructor(
    private servicioRecicladora: AdministrarService,
    private servicioMaterial: MaterialService,
    private servicioToast: ToastController
  ) { }

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

  ngOnInit() {
    this.cargarMaterial();
  }

  guardar(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      if(this.modo === 'Registrar'){
        this.registrar();
      }else{
        this.editar();
      }      
    }
  }

  private registrar(){
    const recicladora: Recicladoras = {
      idrecicladora: this.form.controls.idrecicladoraCtrl.value,
      nombre_rec: this.form.controls.nombreCtrl.value,
      telefono_rec: this.form.controls.telefonoCtrl.value,
      paga: this.form.controls.pagaCtrl.value,
      ciudad: this.form.controls.ciudadCtrl.value,
      barrio: this.form.controls.barrioCtrl.value,
      calle: this.form.controls.calleCtrl.value,
      gps: this.form.controls.gpsCtrl.value,
      estado: this.form.controls.estadoCtrl.value,
      materiales: this.form.controls.materialesCtrl.value
    }
    this.servicioRecicladora.post(recicladora).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se registró correctamente la recicladora.',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar recicladora.', e);
        this.servicioToast.create({
          header: 'Error al registrar.',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }

  private editar(){
    const recicladora: Recicladoras = {
      idrecicladora: this.form.controls.idrecicladoraCtrl.value,
      nombre_rec: this.form.controls.nombreCtrl.value,
      telefono_rec: this.form.controls.telefonoCtrl.value,
      paga: this.form.controls.pagaCtrl.value,
      ciudad: this.form.controls.ciudadCtrl.value,
      barrio: this.form.controls.barrioCtrl.value,
      calle: this.form.controls.calleCtrl.value,
      gps: this.form.controls.gpsCtrl.value,
      estado: this.form.controls.estadoCtrl.value,
      materiales: this.form.controls.materialCtrl.value
    }
    this.servicioRecicladora.put(recicladora).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se editó correctamente la recicladora.',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al editar recicladora.', e);
        this.servicioToast.create({
          header: 'Error al editar.',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present());
      }
    })
  }

}
