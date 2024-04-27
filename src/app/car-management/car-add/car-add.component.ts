import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Common } from 'src/app/common';
import { Brand } from 'src/app/model/brand';
import { Model } from 'src/app/model/model';
import { Series } from 'src/app/model/series';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  isOther = -1;
  selectBrandId: number|null = null;
  selectModelId: number | null = null;
  selectSeriesId: number | null = null;
  txtSeat = '';
  txtBrand = '';
  txtModel =  '';
  txtSeries = '';

  brandArr: Array<Brand> = [];
  modelArr: Array<Model> = [];
  seriesArr: Array<Series> = [];

  constructor(private webService: WebService, public snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.getBrandList();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "ok", {
      duration: 2000,
    });
  }

  onBrandChange(selectId: any) {
    this.selectBrandId = selectId;
    if(this.selectBrandId == 0) {
      this.isOther = 1;
    }else{
      this.isOther = 0;
      this.getModelList(selectId);
    }
  }

  onModelChange(selectId: any) {
    this.selectModelId = selectId;
    if (this.selectModelId == 0) {
      this.isOther = 2;
    } else {
      this.isOther = 0;
      this.getSeriesList(selectId);
    }
  }

  onSeriesChange(selectId: any) {
    this.selectSeriesId = selectId;
    if (this.selectSeriesId == 0) {
      this.isOther = 3;
    } else {
      this.isOther = 0;
    }
  }


  getBrandList(){

    this.webService.action(Common.svListBrand, {}, true).then((responseObj: any) => {
      this.brandArr = responseObj.payload;
    })
  }

  getModelList(brandId: any) {
    this.webService.action(Common.svListModel, { "brand_id": brandId }, true).then((responseObj: any) => {
      this.modelArr = responseObj.payload;
    })
  }

  getSeriesList(modelId: any) {
    this.webService.action(Common.svListSeries, { "model_id": modelId }, true).then((responseObj: any) => {
      this.seriesArr = responseObj.payload;
    })
  }

  addCar(){

    let carBrand: number|string = this.txtBrand;
    let carModel: number | string = this.txtModel;
    let carSeries: number | string = this.txtSeries;

    if(this.isOther == -1) {
      this.openSnackBar("please select brand");
      return
    }
    if(this.isOther == 0) {
        carBrand = this.selectBrandId ?? "";
        carModel = this.selectModelId ?? "";
        carSeries = this.selectSeriesId ?? "";
    }else if(this.isOther == 1) {
      if(this.txtBrand == '') {
        this.openSnackBar("please enter brand name");
        return;
      }

      if (this.txtModel == '') {
        this.openSnackBar("please enter model name");
        return;
      }
    } else if (this.isOther == 2) {
      
      if (this.txtModel == '') {
        this.openSnackBar("please enter model name");
        return;
      }
      carBrand = this.selectBrandId ?? "";
    } else if (this.isOther == 3) {
      carBrand = this.selectBrandId ?? "";
      carModel = this.selectModelId ?? "";
    }


    this.webService.action(Common.svAddCar, {
      "brand": carBrand,
      "model": carModel,
      "series": carSeries,
      "seat": this.txtSeat,
      "other_status": this.isOther

     }, true).then((responseObj: any) => {

       if (responseObj.status == 1) {
         this.isOther = -1;
         this.selectBrandId = null;
         this.selectModelId = null;
         this.selectSeriesId = null;
         this.txtSeat  = "";
         this.txtModel = "";
         this.txtBrand = "";
         this.txtSeries = "";
         this.getBrandList();
       }
       this.openSnackBar(responseObj.message);
    })
  }


}
