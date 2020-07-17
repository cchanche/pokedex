import { Component, OnInit } from '@angular/core';
import PokemonData from '../../assets/seed.json';
import Pokemon from '../pokemon';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = PokemonData; // pokemons to display attribute
  types = []; // types of pokemons attribute
  angForm = new FormGroup({
    // form group for filter inputs
    name: new FormControl(),
    id: new FormControl(),
    type: new FormControl(),
  });

  constructor() {}

  // Handles values changes in the formGroup
  onChange(value: any) {
    console.log(value);
    let newpokemons = PokemonData;

    if (value.name && value.name !== '') {
      newpokemons = newpokemons.filter((p) => p.name.includes(value.name));
    }

    if (value.id) {
      newpokemons = newpokemons.filter((p) => parseInt(p.id) === value.id);
    }

    if (value.type) {
      newpokemons = newpokemons.filter((p) => p.type.includes(value.type));
    }

    this.pokemons = newpokemons;
  }

  ngOnInit(): void {
    // subscribe formGroup value changes to our onChange function
    this.angForm.valueChanges.subscribe((val) => this.onChange(val));
    // fill up the different pokemon types
    PokemonData.forEach((p) => {
      p.type.forEach((pt) => {
        if (!this.types.includes(pt)) {
          this.types.push(pt);
        }
      });
    });
  }
}
