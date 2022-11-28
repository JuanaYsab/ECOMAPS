import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.page.html',
  styleUrls: ['./denuncias.page.scss'],
})
export class DenunciasPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;


  constructor() { }

  ngOnInit( ) {
    this.cargarLey();
  }
  public cargarLey(){
    this.refresher?.complete();
  }
}
