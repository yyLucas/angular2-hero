import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

import { HeroService }     from '../service/hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [ROUTER_DIRECTIVES, AlertComponent],
    providers: [
        HeroService
    ]
})



export class AppComponent {
  title = 'Tour of Heroes';
}