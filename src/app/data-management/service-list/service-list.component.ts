import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { Service } from 'src/app/model/service';
import { WebService } from 'src/app/web.service';
import { EditServiceComponent } from './edit-service/edit-service.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements AfterViewInit {
  newObj = new Service()

  iconImageFile?: File;
  iconImageName: string = ""; 

  topIconImageFile?: File;
  topIconImageName: string = ""; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'icon', 'name', 'top_icon', 'description', 'seat', 'color',  'gender', 'action']
  listArray: Array<Service> = [];
  dataSource: MatTableDataSource<Service> = new MatTableDataSource<Service>();


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

  onIconChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.iconImageFile = file;
      this.iconImageName = this.iconImageFile?.name ?? "";
    }else{
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

  addData() {
    if (this.newObj.service_name == "") {
      this.openSnackBar("Please enter service name");
      return
    }

    if(this.newObj.color.length != 6) {
      this.openSnackBar("Please enter valid color");
      return
    }

    if (this.iconImageFile == null) {
      this.openSnackBar("Please select service icon");
      return
    }

    if (this.topIconImageFile == null) {
      this.openSnackBar("Please select service top icon");
      return
    }

    const formData = new FormData();
    formData.append('service_name', this.newObj.service_name );
    formData.append('seat', this.newObj.seat.toString());
    formData.append('color', this.newObj.color);
    formData.append('gender', this.newObj.gender);
    formData.append('description', this.newObj.description);
    formData.append('icon', this.iconImageFile!, this.iconImageName);
    formData.append('top_icon', this.topIconImageFile!, this.topIconImageName);

    this.webService.action(Common.svAddService, formData , true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.newObj = new Service();
        this.getList();
        this.openSnackBar(responseObj.message);
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }

  openDialogEdit(obj: Service) {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      width: '400px',
      data: obj
    })
    dialogRef.afterClosed().subscribe((updateInfo) => {
      Common.Dlog(updateInfo);
      if (updateInfo) {
        const index = this.listArray.findIndex(item => item.service_id == updateInfo.service_id);
        this.listArray[index] = updateInfo;
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  deleteData(obj: Service) {
    this.webService.action(Common.svDeleteService, { "service_id": obj.service_id }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.listArray = this.listArray.filter(item => item.service_id != obj.service_id);
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("service deleted successfully");
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }



  getList() {

    this.webService.action(Common.svListService, {}, true).then((responseObj: any) => {

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
