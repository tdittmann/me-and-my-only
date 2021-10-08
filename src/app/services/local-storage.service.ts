import {Injectable} from '@angular/core';
import {Relationship} from '../entities/Relationship';
import {Storage} from '@ionic/storage-angular';

@Injectable()
export class LocalStorageService {

    private RELATIONSHIP_KEY = 'relationship';
    private SHOW_QUOTE_KEY = 'show-quote';

    private _storage: Storage;

    constructor(private storage: Storage) {

    }

    public async initStorage() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        this._storage = await this.storage.create();
    }

    public setRelationship(relationship: Relationship): void {
        const relationshipJson = JSON.stringify(relationship);
        this._storage.set(this.RELATIONSHIP_KEY, relationshipJson).then(
            (result) => {
                console.log('Successfully saved relationship.');
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public loadRelationship(): Promise<Relationship> {
        return this._storage.get(this.RELATIONSHIP_KEY)
            .then(value => this.mapToModel(value));
    }

    private mapToModel(relationshipString: string): Relationship {
        if (!relationshipString) {
            return null;
        }

        const decodedRelationship = JSON.parse(relationshipString);
        const relationship = new Relationship();
        relationship.code = decodedRelationship.code;
        relationship.name1 = decodedRelationship.name1;
        relationship.name2 = decodedRelationship.name2;
        relationship.image = decodedRelationship.image;
        relationship.anniversary = decodedRelationship.anniversary;
        return relationship;
    }

    public setShowQuote(quoteEnabled: boolean) {
        this._storage.set(this.SHOW_QUOTE_KEY, quoteEnabled).then(
            (result) => {
                console.log('Successfully set show quote: ' + quoteEnabled);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public getShowQuote(): Promise<boolean> {
        return this._storage.get(this.SHOW_QUOTE_KEY);
    }

    public reset(): void {
        this._storage.clear().then(
            (result) => {
                console.log('Successfully reseted local storage');
            },
            (error) => {
                console.error(error);
            }
        );
    }

}
