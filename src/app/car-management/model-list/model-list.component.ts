import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { Model } from 'src/app/model/model';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'brand_name' , 'name', 'status', 'created_date', 'modify_date', 'action' ]
  listArray: Array<Model> = [];
  dataSource: MatTableDataSource<Model> = new MatTableDataSource<Model>();


  constructor(private webService: WebService, public snackBar: MatSnackBar) {

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

  toggle(mObj: Model, obj: any) {

    this.webService.action(Common.svApprovedModel, {

      "model_id": mObj.model_id,
    }, true).then((responseObj: any) => {

      mObj.status = mObj.status == 1 ? 0 : 1;
      this.openSnackBar(responseObj.message);
      this.dataSource = new MatTableDataSource(this.listArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  getStatusName(obj: Model) {
    switch (obj.status) {
      case 1:
        return "Approved"
      default:
        return "Pending"
    }
  }


  getList() {

    this.webService.action(Common.svListCarModel, {}, true).then((responseObj: any) => {

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

  deleteData(obj: Model) {
    this.webService.action(Common.svDeleteModel, { "model_id": obj.model_id }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.listArray = this.listArray.filter(item => item.model_id != obj.model_id);
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("model deleted successfully");
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }
}
