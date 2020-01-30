import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover2',
  templateUrl: './popover2.component.html',
  styleUrls: ['./popover2.component.scss'],
})
export class Popover2Component implements OnInit {

  constructor( public popoverController: PopoverController) { }

  ngOnInit() {}
  async DismissClick() {
    await this.popoverController.dismiss();
      }

}
