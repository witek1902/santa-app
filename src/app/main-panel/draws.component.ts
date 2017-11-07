import {Component} from '@angular/core';

@Component({
  selector: 'santa-draws',
  template: `
    <div class="container">
      <div class="row">
        <santa-draws-list
          [title]="'Available draws'"
          [draws]="mockAvailableDraws"
        ></santa-draws-list>
        <santa-draws-list
          [title]="'Your draws'"
          [draws]="mockUserDraws"
        ></santa-draws-list>
      </div>
    </div>
  `
})
export class DrawsComponent {

  public mockAvailableDraws = [
    {id: 1, name: 'Av1', description: 'Av1', owner: 'notme', participants: ['xaxa', 'xexe'], status: 'ACTIVE'},
    {id: 2, name: 'Av2', description: 'Av2', owner: 'notme', participants: ['xaxa'], status: 'ACTIVE'},
  ];

  public mockUserDraws = [
    {
      id: 3, name: 'Mock1', description: 'Mock1 Mock1 Mock1 Mock1 Mock1 Mock1 ', owner: 'qrGjDRcyfFhozeh6BXvcwFRpruk1',
      participants: ['qrGjDRcyfFhozeh6BXvcwFRpruk1', 'xexe'], status: 'ACTIVE'
    },
    {
      id: 5, name: 'Mock3', description: 'Mock3', owner: 'qrGjDRcyfFhozeh6BXvcwFRpruk1',
      participants: ['xoxox', 'xexex', 'qrGjDRcyfFhozeh6BXvcwFRpruk1'], status: 'FINISHED'
    },
    {
      id: 4, name: 'Mock2', description: 'Mock2 Mock2 Mock2 Mock2', owner: 'notme',
      participants: ['xaxa', 'qrGjDRcyfFhozeh6BXvcwFRpruk1'], status: 'ACTIVE'
    }
  ];

}
