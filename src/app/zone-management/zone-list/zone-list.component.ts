import { ZoneList } from './../../model/zone-list';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'name', 'city', 'tax', 'action']
  listArray: Array<ZoneList> = [];
  dataSource: MatTableDataSource<ZoneList> = new MatTableDataSource<ZoneList>();


  constructor(private webService: WebService, public snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit(): void {
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

  deleteData(obj: ZoneList) {
    // this.webService.action(Common.svDeleteService, { "service_id": obj.service_id }, true).then((responseObj: any) => {
    //   if (responseObj.status == 1) {
    //     this.listArray = this.listArray.filter(item => item.service_id != obj.service_id);
    //     this.dataSource = new MatTableDataSource(this.listArray);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.openSnackBar("service deleted successfully");
    //   } else {
    //     this.openSnackBar(responseObj.message);
    //   }
    // })
  }



  getList() {

    this.webService.action(Common.svListZone, {}, true).then((responseObj: any) => {

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
