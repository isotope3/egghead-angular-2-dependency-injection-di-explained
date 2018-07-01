import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { LogDebugger } from './log-debugger.service';
import { ConsoleService } from './console.service';

// All the components and pipes now must be 
// declared via an NgModule since 2.0.0-rc.6
// https://github.com/angular/angular/blob/master/CHANGELOG.md

@Component({
  moduleId: module.id,
  selector: 'list-component',
  template: `
    <ul>
      <li *ngFor="let item of items">
        {{item.id}}: {{item.name}} lives in {{item.country}}
      </li>  
    </ul>
  `,
  providers: [
    DataService,
    ConsoleService,
    {
      provide: LogDebugger,
      useFactory: (consoleService) => 
        return new LogDebugger(consoleService, true);
      },
      deps: [ConsoleService]
  ]
})
export class ListComponent implements OnInit {

  items: Array<any>;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.items = this.dataService.getItems();
  }

}