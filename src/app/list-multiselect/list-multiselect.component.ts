import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-multiselect',
  templateUrl: './list-multiselect.component.html',
  styleUrls: ['./list-multiselect.component.scss'],
})
export class ListMultiselectComponent implements OnInit {
  @Input() dataList: any[];

  @Output('dataClicked') dataEvent = new EventEmitter<any>();
  @Output('dataListSelected') dataListSelectedEvent = new EventEmitter<any[]>();

  selectMode: boolean = false;
  
  dataListSelected: any[] = [];
  indexListSelected: number[] = [];

  isPress: boolean = false; // control press event
  
  constructor() { }

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
    console.log('EDITING ITEM')
  }

  onDelete(): void {
    console.log('DELETING ITEM')
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
}
