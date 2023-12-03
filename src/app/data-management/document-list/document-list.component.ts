import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { Document } from 'src/app/model/document';
import { WebService } from 'src/app/web.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDocumentComponent } from './edit-document/edit-document.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements AfterViewInit {
  newObj = new Document()
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'name', 'type', 'action']
  listArray: Array<Document> = [];
  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>();


  constructor(private webService: WebService, public snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelectType(obj: any) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "ok", {
      duration: 2000,
    });
  }

  getDocTypeName(obj: Document) {
    switch (obj.type) {
      case 1:
        return "Personal Doc"


      default:
        return "Cars Doc"
    }
  }

  addData() {
    if (this.newObj.name == "") {
      this.openSnackBar("Please enter document name");
      return
    }

    this.webService.action(Common.svAddDocument, { "document_name": this.newObj.name, "document_type": this.newObj.type.toString() }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.newObj = new Document();
        this.getList();
        this.openSnackBar(responseObj.message);
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }

  openDialogEdit(obj: Document) {
    const dialogRef = this.dialog.open(EditDocumentComponent, {
      width: '400px',
      data: obj
    })
    dialogRef.afterClosed().subscribe( (updateInfo) => {
      Common.Dlog(updateInfo);
      if (updateInfo) 
      {
        const index = this.listArray.findIndex(item => item.doc_id == updateInfo.doc_id);
        this.listArray[index] = updateInfo;
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } )
  }

  deleteData(obj: Document) {
    this.webService.action(Common.svDeleteDocument, {"doc_id": obj.doc_id }, true ).then( (responseObj: any) => {
      if(responseObj.status == 1) {
        this.listArray = this.listArray.filter(item => item.doc_id != obj.doc_id);
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("document deleted successfully");
      }else{
        this.openSnackBar(responseObj.message);
      }
    } )
  }



  getList() {

    this.webService.action(Common.svListDocument, {}, true).then((responseObj: any) => {

      Common.Dlog(responseObj);
      if (responseObj.status == 1) {
        this.listArray = responseObj.payload;
        

      } else {
        this.listArray = [];
        this.openSnackBar(responseObj.message);
      }

      this.dataSource = new MatTableDataSource(this.listArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }


}
