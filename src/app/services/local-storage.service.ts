import {Injectable} from '@angular/core';
import {Relationship} from '../entities/Relationship';
import {Storage} from '@ionic/storage';

@Injectable()
export class LocalStorageService {

    private RELATIONSHIP_KEY = 'relationship';
    private SHOW_QUOTE_KEY = 'show-quote';

    constructor(private storage: Storage) {

    }

    public setRelationship(relationship: Relationship): void {
        const relationshipJson = JSON.stringify(relationship);
        this.storage.set(this.RELATIONSHIP_KEY, relationshipJson).then(
            (result) => {
                console.log('Successfully saved relationship: ' + relationshipJson);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public loadRelationship(): Promise<Relationship> {
        return this.storage.get(this.RELATIONSHIP_KEY)
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
        this.storage.set(this.SHOW_QUOTE_KEY, quoteEnabled).then(
            (result) => {
                console.log('Successfully set show quote: ' + quoteEnabled);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public getShowQuote(): Promise<boolean> {
        return this.storage.get(this.SHOW_QUOTE_KEY);
    }

    public reset(): void {
        this.storage.clear().then(
            (result) => {
                console.log('Successfully created local storage');
            },
            (error) => {
                console.error(error);
            }
        );
    }

}
