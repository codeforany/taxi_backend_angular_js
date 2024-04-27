import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Common } from 'src/app/common';
import { ZonePrice } from 'src/app/model/zone-price';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-service-price-edit',
  templateUrl: './service-price-edit.component.html',
  styleUrls: ['./service-price-edit.component.css']
})
export class ServicePriceEditComponent {
  editObj: ZonePrice = new ZonePrice();
  

  constructor(
    public dialogRef: MatDialogRef<ServicePriceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private webService: WebService,
    public snackBar: MatSnackBar,
  ) {

    this.editObj = Object.assign({}, data);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }


  openSnackBar(message: string) {

    Common.Dlog(message);
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }

  updateData() {
  
    if (this.editObj.base_charge == '') {
      this.openSnackBar(' please enter base charge');
      return;
    }

    if (this.editObj.per_km_charge == '') {
      this.openSnackBar('please enter per KM charge');
      return;
    }

    if (this.editObj.per_min_charge == '') {
      this.openSnackBar('please enter per minute charge');
      return;
    }

    if (this.editObj.booking_charge == '') {
      this.openSnackBar('please enter booking charge');
      return;
    }

    if (this.editObj.mini_fair == '') {
      this.openSnackBar('please enter minimum fair');
      return;
    }

    if (this.editObj.mini_km == '') {
      this.openSnackBar('please enter minimum km');
      return;
    }

    if (this.editObj.cancel_charge == '') {
      this.openSnackBar('please enter cancel charge');
      return;
    }

    this.webService.action(Common.svEditServicePrice, { 
      "price_id": this.editObj.price_id ,
      "zone_id": this.editObj.zone_id ,
      "service_id": this.editObj.service_id ,
      "base_charge": this.editObj.base_charge ,
      "per_km_charge": this.editObj.per_km_charge ,
      "per_min_charge": this.editObj.per_min_charge ,
      "booking_charge": this.editObj.booking_charge ,
      "mini_fair": this.editObj.mini_fair ,
      "mini_km": this.editObj.mini_km ,
      "cancel_charge" : this.editObj.cancel_charge
    }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.editObj.price_id = responseObj.payload.price_id;
        this.openSnackBar(responseObj.message);
        this.dialogRef.close(this.editObj);

      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }
}
