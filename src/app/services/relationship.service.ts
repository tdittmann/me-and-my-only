import {HttpClient} from '@angular/common/http';
import {Relationship} from '../entities/Relationship';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class RelationshipService {

  constructor(private httpClient: HttpClient) {

  }

  loadRelationship(): Observable<Relationship> {
    return this.httpClient.get<Relationship>('/assets/data.json');
  }

}
