import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Common } from 'src/app/common';
import { Document } from 'src/app/model/document';
import { ZoneDocument } from 'src/app/model/zone-document';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-service-document-edit',
  templateUrl: './service-document-edit.component.html',
  styleUrls: ['./service-document-edit.component.css']
})
export class ServiceDocumentEditComponent implements OnInit {
  editObj: ZoneDocument = new ZoneDocument();

  documentArr: Array<Document> = [];
  personalDocumentArr: Array<Document> = [];
  carDocumentArr: Array<Document> = [];

  personalDoc = "";
  personalDocName = "";
  carDoc = "";
  carDocName = "";



  constructor(
    public dialogRef: MatDialogRef<ServiceDocumentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private webService: WebService,
    public snackBar: MatSnackBar,
  ) {

    this.editObj = Object.assign({}, data.edit);
    this.documentArr = Object.assign([], data.doc);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    Common.Dlog(this.documentArr);
    this.documentArr.forEach(docObj => {

      if (docObj.type == 1) {
        var data = this.editObj.document_ids

        if (data != null) {
          data.split(',').forEach(docId => {



            if (docId == docObj.doc_id.toString()) {
              docObj.isSelect = true;
            }
          })
        }

        this.personalDocumentArr.push(docObj);
      } else {
        var data = this.editObj.car_document_ids

        if (data != null) {
          data.split(',').forEach(docId => {
            if (docId == docObj.doc_id.toString()) {
              docObj.isSelect = true;
            }
          })
        }
        this.carDocumentArr.push(docObj);
      }
    })
  }

  serviceDocumentCheckedClick(docObj: Document, event: any) {
    docObj.isSelect = event.checked;
  }

  openSnackBar(message: string) {

    Common.Dlog(message);
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }

  updateData() {

    this.personalDoc = "";
    this.personalDocName = "";
    this.carDocName = "";
    this.carDoc = "";

    this.personalDocumentArr.forEach(docObj => {
      if (docObj.isSelect == true) {
        this.personalDoc = this.personalDoc + docObj.doc_id + ',';
        this.personalDocName = this.personalDocName + docObj.name + ',';
      }
    })

    this.carDocumentArr.forEach(docObj => {
      if (docObj.isSelect == true) {
        this.carDoc = this.carDoc + docObj.doc_id + ',';
        this.carDocName = this.carDocName + docObj.name + ',';
      }
    })

    this.editObj.document_name = this.personalDocName.replace(/,\s*$/, '');
    this.editObj.document_ids = this.personalDoc.replace(/,\s*$/, '');

    this.editObj.car_document_name = this.carDocName.replace(/,\s*$/, '');
    this.editObj.car_document_ids = this.carDoc.replace(/,\s*$/, '');


    this.webService.action(Common.svEditServiceDocument, {
      "zone_doc_id": this.editObj.zone_doc_id,
      "personal_doc": this.editObj.document_ids,
      "car_doc": this.editObj.car_document_ids
    }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {

        this.openSnackBar(responseObj.message);
        this.dialogRef.close(this.editObj);

      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }
}
