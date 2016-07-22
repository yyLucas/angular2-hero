import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeroService }     from '../service/hero.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app/app.component.html',
    styleUrls: ['app/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HeroService
    ]
})

export class AppComponent {
  title = 'Tour of Heroes';
}