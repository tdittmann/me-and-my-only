import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Quote} from '../entities/Quote';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class QuoteService {

  constructor(private httpClient: HttpClient) {

  }

  loadQuote(): Observable<Quote> {
    return this.httpClient.get<any>(environment.quoteUrl)
        .pipe(map((response) => response.contents.quotes[0]));
  }

}
