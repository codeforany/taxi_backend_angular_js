import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-base-design',
  templateUrl: './base-design.component.html',
  styleUrls: ['./base-design.component.css'],
})

export class BaseDesignComponent {
  panelOpenState = false;
}
