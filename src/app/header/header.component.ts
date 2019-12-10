import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {element} from "protractor";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  featureSelected = new EventEmitter<string>();

  private _item1_active: boolean;
  private _item2_active: boolean;

  constructor() {
    this._item1_active = true;
    this._item2_active = false;
  }

  ngOnInit() {
  }

  onSelect(feature: string, event: MouseEvent) {
    let targetID = (<HTMLInputElement>event.target).id;
    if (targetID === 'nav-link-1') {
      this._item1_active = true;
      this._item2_active = false;
    } else {
      this._item1_active = false;
      this._item2_active = true;
    }
    this.featureSelected.emit(feature);
  }


  get item1_active(): boolean {
    return this._item1_active;
  }

  set item1_active(value: boolean) {
    this._item1_active = value;
  }

  get item2_active(): boolean {
    return this._item2_active;
  }

  set item2_active(value: boolean) {
    this._item2_active = value;
  }
}
