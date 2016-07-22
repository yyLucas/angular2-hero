import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {HeroDetailComponent} from '../hero/hero-detail.component'
import {Hero} from '../hero/hero';
import {HeroService} from '../service/hero.service';

@Component({
  selector: 'my-heroes',
  directives: [HeroDetailComponent],
  templateUrl: 'app/heroes/heroes.component.html',
  styleUrls: ['app/heroes/heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  error: any;
  addingHero = false;

  constructor(
    private router: Router,
    private heroService: HeroService) { }
  
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  gotoDetail() {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error);
  }
}

