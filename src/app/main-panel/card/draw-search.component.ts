import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'santa-draw-search',
  template: `
    <div class="row">
      <div class="input-field input-field__grid col s12">
        <i class="material-icons prefix">search</i>
        <input (ngModelChange)="onChange($event)" type="text" [ngModel]="searchValue" name="searchValue">
        <label for="searchValue">{{placeholder}}</label>
      </div>
    </div>
  `
})
export class DrawSearchComponent {
  @Input() placeholder = 'Szukaj...';
  @Output() onSearch = new EventEmitter<string>();
  public searchValue = '';

  public onChange(newValue: string) {
    this.searchValue = newValue;
    this.onSearch.emit(this.searchValue);
  }
}
