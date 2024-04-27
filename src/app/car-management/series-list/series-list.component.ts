import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { Series } from 'src/app/model/series';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'brand_name', 'model_name', 'name', 'status', 'created_date', 'modify_date', 'action']
  listArray: Array<Series> = [];
  dataSource: MatTableDataSource<Series> = new MatTableDataSource<Series>();


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

  toggle(mObj: Series, obj: any) {

    this.webService.action(Common.svApprovedSeries, {

      "series_id": mObj.series_id,
    }, true).then((responseObj: any) => {

      mObj.status = mObj.status == 1 ? 0 : 1;
      this.openSnackBar(responseObj.message);
      this.dataSource = new MatTableDataSource(this.listArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  getStatusName(obj: Series) {
    switch (obj.status) {
      case 1:
        return "Approved"
      default:
        return "Pending"
    }
  }


  getList() {

    this.webService.action(Common.svListCarSeries, {}, true).then((responseObj: any) => {

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

  deleteData(obj: Series) {
    this.webService.action(Common.svDeleteSeries, { "series_id": obj.series_id }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.listArray = this.listArray.filter(item => item.series_id != obj.series_id);
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("series deleted successfully");
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }
} 
