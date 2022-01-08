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

  isPress: boolean = false; // control press event
  
  constructor() { }

  ngOnInit() {}

  updateAndEmitSelectList(data: any): void {
    // add pressed data to select list
    this.dataListSelected.push(data);

    // emit select list
    this.dataListSelectedEvent.emit(this.dataListSelected);
  }

  cleanAndEmitListSelected(): void {
    // reset list selected
    this.dataListSelected = [];

    // 
    this.dataListSelectedEvent.emit(this.dataListSelected);
  }

  onPress(data: any) {
    this.isPress = true;

    // activate select mode
    this.selectMode = true;
    
    // add pressed data to select list
    this.updateAndEmitSelectList(data);

    console.log("Pressed!")
  }

  onClick(data: any): void {
    // update and emit selectList
    if (this.selectMode && !this.isPress) {
      this.updateAndEmitSelectList(data);
    }
    // emit clicked data 
    if (!this.selectMode) {
      this.dataEvent.emit(data);
    }
    
    this.isPress = false;

    console.log("Clicked!")
  }

  // TOOLBAR ACTIONS

  onCleanListSelected(): void {
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
}
