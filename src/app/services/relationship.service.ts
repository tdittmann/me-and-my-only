import {HttpClient} from '@angular/common/http';
import {Relationship} from '../entities/Relationship';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class RelationshipService {

    constructor(private httpClient: HttpClient) {

    }

    loadRelationship(code: string): Observable<Relationship> {
        return this.httpClient.get<Relationship>(environment.backendUrl + 'relationship.php?code=' + code);
    }

    saveRelationship(relationship: Relationship): Observable<string> {
        return this.httpClient.put<string>(environment.backendUrl + 'relationship.php', JSON.stringify(relationship));
    }

}
