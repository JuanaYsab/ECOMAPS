import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

    @ViewChild(IonRefresher) refresher!: IonRefresher;

  constructor() { }

  ngOnInit( ) {
    this.recargarGaleria();
  }
  public recargarGaleria(){
    this.refresher?.complete();
  }

}
