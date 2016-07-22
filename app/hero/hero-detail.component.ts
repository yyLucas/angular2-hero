import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import {HeroService} from '../service/hero.service';
import {Hero} from './hero';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero/hero-detail.component.html',
  styleUrls: ['app/hero/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(
      private heroService: HeroService,
      private route: ActivatedRoute) {
    }

    ngOnDestroy(){
      this.sub.unsubscribe();
    }

    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        if (params['id'] !== undefined) {
          let id = +params['id'];
          this.navigated = true;
          this.heroService.getHero(id)
              .then(hero => this.hero = hero);
        } else {
          this.navigated = false;
          this.hero = new Hero();
        }
      });
    }

    save() {
      this.heroService
          .save(this.hero)
          .then(hero => {
            this.hero = hero; // saved hero, w/ id if new
            this.goBack(hero);
          })
          .catch(error => this.error = error); // TODO: Display error message
    }

    goBack(savedHero: Hero = null) {
      this.close.emit(savedHero);
      if (this.navigated) { window.history.back(); }
    }
}