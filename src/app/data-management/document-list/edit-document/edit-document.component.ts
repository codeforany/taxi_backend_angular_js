import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Common } from 'src/app/common';
import { Document } from 'src/app/model/document';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {

  editObj: Document = new Document();
  documentList = [
    {
      "name": "Personal",
      "value": 1
    },
    {
      "name": "Cars",
      "value": 2
    },
  ]

  constructor(
    public dialogRef: MatDialogRef<EditDocumentComponent>,
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
    if (this.editObj.name == "") {
      this.openSnackBar("Please enter document name");
      return
    }

    this.webService.action(Common.svEditDocument, { "doc_id": this.editObj.doc_id, "document_name": this.editObj.name, "document_type": this.editObj.type.toString() }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        
        this.openSnackBar(responseObj.message);
        this.dialogRef.close(this.editObj);

      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }
}
