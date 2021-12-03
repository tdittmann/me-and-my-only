import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Relationship} from '../entities/Relationship';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {credentials} from "../../environments/credentials";

@Injectable()
export class RelationshipService {

  constructor(private httpClient: HttpClient) {

  }

  loadRelationship(code: string): Observable<Relationship> {
    return this.httpClient.get<Relationship>(environment.backendUrl + 'relationship.php?code=' + code, {
      headers: RelationshipService.getHttpHeaders()
    });
  }

  saveRelationship(relationship: Relationship): Observable<string> {
    console.log(JSON.stringify(relationship))
    return this.httpClient.put<string>(environment.backendUrl + 'relationship.php', JSON.stringify(relationship), {
      headers: RelationshipService.getHttpHeaders()
    });
  }

  private static getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa(credentials.authUsername + ':' + credentials.authPassword)
    });
  }

}
