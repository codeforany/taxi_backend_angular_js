import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from 'src/app/common';
import { Brand } from 'src/app/model/brand';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'name', 'status', 'created_date', 'modify_date', 'action']
  listArray: Array<Brand> = [];
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource<Brand>();


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

  toggle( bObj: Brand , obj: any ) {

    this.webService.action(Common.svApprovedBrand, {
     
      "brand_id": bObj.brand_id, 
    }, true).then((responseObj: any) => {

      bObj.status = bObj.status == 1 ? 0 : 1;
      this.openSnackBar(responseObj.message);
      this.dataSource = new MatTableDataSource(this.listArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  getStatusName(obj: Brand) {
    switch (obj.status) {
      case 1:
        return "Approved"
      default:
        return "Pending"
    }
  }


  
  getList() {

    this.webService.action(Common.svListCarBrand, {}, true).then((responseObj: any) => {

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

  deleteData(obj: Brand) {
    this.webService.action(Common.svDeleteBrand, { "brand_id": obj.brand_id }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.listArray = this.listArray.filter(item => item.brand_id != obj.brand_id);
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("brand deleted successfully");
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }
}
