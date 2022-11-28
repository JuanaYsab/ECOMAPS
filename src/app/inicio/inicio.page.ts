import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher, ToastController } from '@ionic/angular';
import { Material } from '../interfaces/material.interface';
import { MaterialService } from '../servicios/material.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

  materialesSeleccionados: {} = {};
  mostrarBoton: boolean = false;

  public listaMateriales: Material[] = [];
  public cargandoMateriales: boolean = false;

  constructor(
    private servicioMateriales: MaterialService,
    private servicioToast: ToastController,
    private router: Router
  ) { }

  ngOnInit(  ) {
    this.cargarMateriales();
  }

  public cargarMateriales(){
    this.refresher?.complete();
    this.cargandoMateriales = true;
    this.servicioMateriales.get().subscribe({
      next: (material) =>{
        this.listaMateriales = material;
        this.cargandoMateriales = false;
      },
      error: (e) => {
        console.error("Error al consultar Materiales", e);
        this.cargandoMateriales = false;
        this.servicioToast.create({
          header: 'Error al cargar Materiales',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  public mostrar(){
    this.router.navigate(['recicladoras'], {queryParams: {idmaterial: this.obtenerIdMateriales()}});
  }

  public resetear(){    
    this.materialesSeleccionados = {};
    this.seleccionMaterial();
  };

  public seleccionMaterial(){
    this.mostrarBoton = this.obtenerIdMateriales().length !== 0
  }
    
  private obtenerIdMateriales(): number[]{
    return Object.keys(this.materialesSeleccionados)
    .filter(key => this.materialesSeleccionados[key] === true)
    .map(value => Number(value));
  }
}
