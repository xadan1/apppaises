import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent implements OnInit {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  sugerencias(termino: string) {
    this.hayError = false;
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
        this.termino = termino;
        console.log(this.termino);
        localStorage.setItem('capital', JSON.stringify(this.paises));
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
  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}
}
