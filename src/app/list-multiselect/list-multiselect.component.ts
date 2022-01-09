import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AlertController, AlertButton } from '@ionic/angular';

const ALERT_ROLE_CONFIRM: string = 'confirm';

@Component({
  selector: 'app-list-multiselect',
  templateUrl: './list-multiselect.component.html',
  styleUrls: ['./list-multiselect.component.scss'],
})
export class ListMultiselectComponent implements OnInit {
  @Input() dataList: any[];

  @Output('dataClicked') dataEvent = new EventEmitter<any>();
  @Output('dataListSelected') dataListSelectedEvent = new EventEmitter<any[]>();
  @Output('dataListRemove') removeDataListSelectedEvent = new EventEmitter<any[]>();
  @Output('dataEdit') editDataEvent = new EventEmitter<any>();

  selectMode: boolean = false;
  
  dataListSelected: any[] = [];
  indexListSelected: number[] = [];

  isPress: boolean = false; // control press event

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  updateAndEmitSelectList(data: any, index: number): void {
    const indexList = this.indexListSelected.indexOf(index);
    
    if (indexList != -1) {
      // remove item from list selected
      this.dataListSelected.splice(indexList, 1);
      // remove item from index selected
      this.indexListSelected.splice(indexList, 1);
      // disable select mode
      if (this.dataListSelected.length == 0) this.selectMode = false;
    }
    else {
      // add pressed data to select list
      this.dataListSelected.push(data);
      // add pressed index to index list
      this.indexListSelected.push(index);
    }

    // emit select list
    this.dataListSelectedEvent.emit(this.dataListSelected);
  }

  cleanAndEmitListSelected(): void {
    // reset list selected
    this.dataListSelected = [];
    // reset index list
    this.indexListSelected = [];

    // emit select list
    this.dataListSelectedEvent.emit(this.dataListSelected);
  }

  // TOOLBAR EVENT

  onClean(): void {
    // select mode off
    this.selectMode = false;

    // clean and emit list selectd
    this.cleanAndEmitListSelected();
  }

  onShare(): void {
    console.log('SHARING LIST')
  }

  onEdit(): void {
    const data = this.dataListSelected[0];

    this.editDataEvent.emit(data);
  }

  async onDelete(): Promise<void> {
    const respond: string = await this.deleteAlert();

    if (respond == ALERT_ROLE_CONFIRM) {
      // emit select list
      this.removeDataListSelectedEvent.emit(this.dataListSelected);
      // clean select list
      this.cleanAndEmitListSelected();
    }
  }

  // ITEM EVENTS

  onPress(data: any, index: number) {
    this.isPress = true;

    // activate select mode
    this.selectMode = true;
    
    // add pressed data to select list
    this.updateAndEmitSelectList(data, index);
  }

  onClick(data: any, index: number): void {
    // update and emit selectList
    if (this.selectMode && !this.isPress) {
      this.updateAndEmitSelectList(data, index);
    }
    // emit clicked data 
    if (!this.selectMode) {
      this.dataEvent.emit(data);
    }
    
    this.isPress = false;
  }

  // alert on delete
  async deleteAlert(): Promise<string> {
    const confirmAlertButton: AlertButton = {
      text: 'Sí',
      role: ALERT_ROLE_CONFIRM
    };

    const cancelAlertButton: AlertButton = {
      text: 'No',
      role: 'cancel'
    };

    const alert = await this.alertController.create({
      header: 'Eliminar elementos',
      message: 'Se van a eliminar los elementos seleccionados.',
      buttons: [confirmAlertButton, cancelAlertButton]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    return role;
  }
}
