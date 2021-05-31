import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0;
  // il retrieve din route
  gameId: string;
  // va stoca toate detalile jocului
  game: Game;
  // vom avea doi subscrieberi pe pagina
  gameSub: Subscription;
  routeSub: Subscription;

  constructor(
    // provides API of the route odata ce a este activat
    private ActivatedRoute: ActivatedRoute,
    // provides comunication with the API
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    // atribuim subscribtia routeSub la params; vrem sa alocam la gameId ce primim din params
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe;
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe;
    }
  }
}
