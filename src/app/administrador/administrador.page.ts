import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { Recicladoras } from '../interfaces/recicladoras.interface';
import { AdministrarService } from '../servicios/administrar.service';
import { RecicladorasComponent } from './recicladoras/recicladoras.component';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;
  @ViewChild(RecicladorasComponent) formularioRecicladora: RecicladorasComponent;

  public listaRecicladoras: Recicladoras[] = [];
  public cargandoRecicladoras: boolean = false;
  public modalVisible: boolean = false;

  private recicladoraSeleccionada: Recicladoras | null = null;
  public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioRecicladoras: AdministrarService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarRecicladoras();
  }

  public cargarRecicladoras(){
    this.refresher?.complete();
    this.cargandoRecicladoras = true;
    this.servicioRecicladoras.get().subscribe({
      next: (recicladora) =>{
        this.listaRecicladoras = recicladora;
        this.cargandoRecicladoras = false;
      },
      error: (e) => {
        console.error("Error al consultar Recicladoras", e);
        this.cargandoRecicladoras = false;
        this.servicioToast.create({
          header: 'Error al cargar Recicladoras',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present()); 
      }
    });
  }

  public nuevo(){
    this.modoFormulario = 'Registrar';
    this.recicladoraSeleccionada = null;
    this.modalVisible = true;
  }

  public editar(recicladora: Recicladoras){
    this.recicladoraSeleccionada = recicladora;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar(){
    if(this.modoFormulario === 'Editar'){
      this.formularioRecicladora.modo = this.modoFormulario;
      this.formularioRecicladora.form.controls.idrecicladoraCtrl.setValue(this.recicladoraSeleccionada.idrecicladora);
      this.formularioRecicladora.form.controls.nombreCtrl.setValue(this.recicladoraSeleccionada.nombre_rec);
      this.formularioRecicladora.form.controls.telefonoCtrl.setValue(this.recicladoraSeleccionada.telefono_rec);
      this.formularioRecicladora.form.controls.pagaCtrl.setValue(this.recicladoraSeleccionada.paga);
      this.formularioRecicladora.form.controls.ciudadCtrl.setValue(this.recicladoraSeleccionada.ciudad);
      this.formularioRecicladora.form.controls.barrioCtrl.setValue(this.recicladoraSeleccionada.barrio);
      this.formularioRecicladora.form.controls.calleCtrl.setValue(this.recicladoraSeleccionada.calle);
      this.formularioRecicladora.form.controls.gpsCtrl.setValue(this.recicladoraSeleccionada.gps);
      this.formularioRecicladora.form.controls.estadoCtrl.setValue(this.recicladoraSeleccionada.estado);
    }
  }

  
  public confirmarEliminacion(recicladora: Recicladoras){
    this.servicioAlert.create({
      header: "Confirmar eliminación",
      subHeader: '¿Realmente desea eliminar la recicladora?',
      message: `${recicladora.idrecicladora} - ${recicladora.nombre_rec} (${recicladora.ciudad} ${recicladora.barrio})`,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminar(recicladora)
        }
      ]
    }).then(a => a.present());
  }

  private eliminar(recicladora: Recicladoras){
    this.servicioRecicladoras.delete(recicladora).subscribe({
      next: () => {
        this.cargarRecicladoras();
         this.servicioToast.create({
          header: 'Éxito.',
          message: 'La recicladora se eliminó correctamente.',
          duration: 2000,
          position: 'bottom',
          color: 'success'
         }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar recicladora', e);
        this.servicioToast.create({
          header: 'Error al eliminar.',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    })
  }

}
