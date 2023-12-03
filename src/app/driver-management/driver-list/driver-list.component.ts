import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { User } from 'src/app/model/user';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'name', 'image', 'email', 'mobile', 'device_source', 'gender', 'zone_name', 'is_block', "status", "is_online", 'created_date', 'action']
  listArray: Array<User> = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();


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

  isBlock(obj: any) {
    switch (obj.is_block) {
      case 1:

        return "Block"

      default:

        return "Unblock"
    }
  }

  genderName(obj: any) {
    switch (obj.gender) {
      case "M":

        return "Male"

      default:

        return "Female"
    }
  }

  isOnline(obj: any) {
    switch (obj.is_online) {
      case 1:

        return "Online"

      default:

        return "Offline"
    }
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

  openDialogEdit(obj: User) {
    // const dialogRef = this.dialog.open(EditServiceComponent, {
    //   width: '400px',
    //   data: obj
    // })
    // dialogRef.afterClosed().subscribe((updateInfo) => {
    //   Common.Dlog(updateInfo);
    //   if (updateInfo) {
    //     const index = this.listArray.findIndex(item => item.service_id == updateInfo.service_id);
    //     this.listArray[index] = updateInfo;
    //     this.dataSource = new MatTableDataSource(this.listArray);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   }
    // })
  }

  deleteData(obj: User) {
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

    this.webService.action(Common.svListDriver, {}, true).then((responseObj: any) => {

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
