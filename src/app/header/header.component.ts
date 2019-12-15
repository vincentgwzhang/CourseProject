import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {element} from "protractor";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loggingService: LoggingService) {
  }

  ngOnInit() {
  }
}
