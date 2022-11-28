import { Component, Input, OnInit } from '@angular/core';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { ListarecicladorasService } from '../servicios/listarecicladoras.service';
import { Recicladoras } from '../interfaces/recicladoras.interface';

@Component({
  selector: 'app-agregar-rec',
  templateUrl: './agregar-rec.page.html',
  styleUrls: ['./agregar-rec.page.scss'],
})
export class AgregarRecPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;

  public listaRecicladoras: Recicladoras[] = [];
  public cargandoRecicladoras: boolean = false;

  public modalVisible: boolean = false

  constructor(
    private servicioListaRecicladoras: ListarecicladorasService,
    private servicioToast: ToastController,
  ) { }

  ngOnInit() {
    this.cargarRecicladoras();
  }

  public nuevo(){
    this.modalVisible = true;
  }

  public cargarRecicladoras(){
    this.refresher?.complete();
    this.cargandoRecicladoras = true;
    this.servicioListaRecicladoras.get().subscribe({
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

}
