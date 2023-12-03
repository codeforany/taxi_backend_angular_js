import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Common } from 'src/app/common';
import { Service } from 'src/app/model/service';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent {
  editObj = new Service()

  iconImageFile?: File;
  iconImageName: string = "";

  topIconImageFile?: File;
  topIconImageName: string = ""; 

  constructor(
    public dialogRef: MatDialogRef<EditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private webService: WebService,
    public snackBar: MatSnackBar,
  ) {

    this.editObj = Object.assign({}, data);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {

    Common.Dlog(message);
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }

  onIconChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.iconImageFile = file;
      this.iconImageName = this.iconImageFile?.name ?? "";
    } else {
      this.iconImageName = "Select Image"
    }
  }

  onTopIconChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.topIconImageFile = file;
      this.topIconImageName = this.topIconImageFile?.name ?? "";
    } else {
      this.topIconImageName = "Select Image"
    }
  }

  updateData() {
    if (this.editObj.service_name == "") {
      this.openSnackBar("Please enter service name");
      return
    }

    if (this.editObj.color.length != 6) {
      this.openSnackBar("Please enter valid color");
      return
    }

    const formData = new FormData();
    formData.append('service_id', this.editObj.service_id.toString());
    formData.append('service_name', this.editObj.service_name);
    formData.append('seat', this.editObj.seat.toString());
    formData.append('color', this.editObj.color);
    formData.append('gender', this.editObj.gender);
    formData.append('description', this.editObj.description);

    if(this.iconImageFile) {
      formData.append('icon', this.iconImageFile!, this.iconImageName);
    }

    if (this.topIconImageFile) {
      formData.append('top_icon', this.topIconImageFile!, this.topIconImageName);
    }
    
    this.webService.action(Common.svEditService, formData, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
       
        this.openSnackBar(responseObj.message);
        this.dialogRef.close(responseObj.payload);
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }

}
