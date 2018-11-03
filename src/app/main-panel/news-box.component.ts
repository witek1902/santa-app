import {Component, OnInit} from '@angular/core';

declare let $: any;

@Component({
  selector: 'santa-news',
  template: `
    <div class="container">
      <div class="row">
        <div class="col s12 white-text">
          <ul class="collapsible collapsible__grid">
            <li>
              <div class="collapsible-header collapsible-header__grid"><i class="material-icons">arrow_drop_down</i>Nowości</div>
              <div class="collapsible-body">
                <span>
                  Cześć! Dzięki za ciepłe przyjęcie aplikacji w roku :)
                  Jako, że aplikacja nadal jest używana to doczekała ona się pewnych usprawnień i poprawek.
                  Po więcej szczegółów zapraszam na mojego bloga
                  <a href="https://simplecoding.pl/santaapp-2018" target="_blank">w to miejsce.</a>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class NewsBoxComponent implements OnInit {
  ngOnInit(): void {
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });
  }

}
