import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { Service } from 'src/app/model/service';
import { ZoneDocument } from 'src/app/model/zone-document';
import { ZoneList } from 'src/app/model/zone-list';
import { WebService } from 'src/app/web.service';
import { ServiceDocumentEditComponent } from '../service-document-edit/service-document-edit.component';

@Component({
  selector: 'app-service-document-list',
  templateUrl: './service-document-list.component.html',
  styleUrls: ['./service-document-list.component.css']
})
export class ServiceDocumentListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  zone_id = "";
  service_id = "";
  selectZoneObj: ZoneList = new ZoneList();
  selectServiceObj: Service = new Service();

  zoneArr: Array<ZoneList> = [];
  serviceArr: Array<Service> = [];
  documentArr: Array<Document> = [];

  displayedColumns: string[] = ['no', 'zone_name', 'service_name', 'personDocument', 'carDocument', 'action']
  listArray: Array<ZoneDocument> = [];
  dataSource: MatTableDataSource<ZoneDocument> = new MatTableDataSource<ZoneDocument>();


  constructor(private webService: WebService, public snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getServiceList();
    this.getList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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



  openDialogEdit(obj: ZoneDocument) {
    const dialogRef = this.dialog.open(ServiceDocumentEditComponent, {
      width: '400px',
      data: {
        'edit': obj,
        'doc': this.documentArr,
      }
    })
    dialogRef.afterClosed().subscribe((updateInfo) => {
      Common.Dlog(updateInfo);
      if (updateInfo) {
        const index = this.listArray.findIndex(item => item.zone_doc_id == updateInfo.zone_doc_id);
        this.listArray[index] = updateInfo;
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }



  onSelectZone(zObj: ZoneList) {
    this.zone_id = zObj.zone_id.toString();
    this.service_id = '';
    this.selectServiceObj = new Service();
    this.getList();

  }

  onSelectService(sObj: Service) {
    this.service_id = sObj.service_id.toString();
    this.getList();
  }

  clear(){
    this.zone_id = "";
    this.service_id = "";
    this.selectZoneObj = new ZoneList();
    this.selectServiceObj = new Service();
    this.getList();
  }


  getServiceList() {


    this.webService.action(Common.svZoneServiceList, {}, true).then((responseObj: any) => {

      Common.Dlog(responseObj);
      if (responseObj.status == 1) {
        this.zoneArr = responseObj.payload.zone_list;
        this.serviceArr = responseObj.payload.service_list;
      }

    })
  }

  getList() {

    var paraObj: any = {};

    if (this.zone_id != "") {
      paraObj["zone_id"] = this.zone_id;
    }

    if (this.service_id != '') {
      paraObj["service_id"] = this.service_id;
    }


    this.webService.action(Common.svZoneServiceDocument, paraObj, true).then((responseObj: any) => {

      Common.Dlog(responseObj);
      if (responseObj.status == 1) {
        this.listArray = responseObj.payload;
      } else {
        this.listArray = [];
        this.openSnackBar(responseObj.message);
      }
      this.documentArr = responseObj.document_list;

      this.dataSource = new MatTableDataSource(this.listArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
}
