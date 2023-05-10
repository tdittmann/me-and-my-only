import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stage-of-life-accordion',
  templateUrl: './stage-of-life-accordion.component.html'
})
export class StageOfLifeAccordionComponent {

  @Input() description = '';
  @Input() date = 0;

}
