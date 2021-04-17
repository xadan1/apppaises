import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private PaisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //es un subcriber dentro de otro
        switchMap((param) => this.PaisService.getPaisPorAlpha(param.id)),
        //para enviar respuesta corta dentro de pipe
        tap(console.log)
      )
      .subscribe((pais) => {
        this.pais = pais;
      });
    //otra forma de hacer peticiones
    /*  this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);
      this.PaisService.getPaisPorAlpha(id).subscribe((pais) => {
        console.log(pais);
      });
    });*/
  }
}
