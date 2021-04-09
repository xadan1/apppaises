import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [],
})
export class PorPaisComponent implements OnInit {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  sugerencias(termino: string) {
    this.hayError = false;
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
        this.termino = termino;
        console.log(this.termino);
        localStorage.setItem('paises', JSON.stringify(this.paises));
      },
      (err) => {
        console.log(err);
        this.hayError = true;
      }
    );
    if (localStorage.getItem('paises')) {
      this.paises = JSON.parse(localStorage.getItem('paises')!);
    }
  }
}
