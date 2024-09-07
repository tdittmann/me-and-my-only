import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RelationshipPage} from './relationship.page';
import {CountdownComponent} from './countdown/countdown.component';
import {RelationshipService} from '../../services/relationship.service';
import {
  StageOfLifeAccordionComponent
} from './stage-of-life-accordion/stage-of-life-accordion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RelationshipPage
      }
    ]),
  ],
  providers: [
    RelationshipService,
  ],
  declarations: [RelationshipPage, CountdownComponent, StageOfLifeAccordionComponent]
})
export class RelationshipPageModule {
}
