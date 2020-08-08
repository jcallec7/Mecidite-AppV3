import { Component, OnInit } from '@angular/core';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
  }
  llamar()
  {
    this.callNumber.callNumber('072828628', true);
  }

}
