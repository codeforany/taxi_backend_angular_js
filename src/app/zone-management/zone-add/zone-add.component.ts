import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, map, of } from 'rxjs';
import { Common } from 'src/app/common';
import { Document } from 'src/app/model/document';
import { Service } from 'src/app/model/service';
import { ZoneAdd } from 'src/app/model/zone-add';
import { WebService } from 'src/app/web.service';

@Component({
    selector: 'app-zone-add',
    templateUrl: './zone-add.component.html',
    styleUrls: ['./zone-add.component.css']
})
export class ZoneAddComponent implements OnInit {

    @ViewChild(GoogleMap, { static: false }) set map(m: GoogleMap) {
        if (m) {
            this.initDrawingManager(m);
        }
    }

    apiLoaded: Observable<boolean>;
    drawingManager: any;

    polygons: Array<any> = [];
    subArray: Array<any> = [];
    shapes: Array<any> = [];
    polygon: any;

    options: google.maps.MapOptions = {
        zoom: 14,
        disableDefaultUI: true
    };

    zoneName = '';
    cityName = '';
    taxVal = '5';

    serviceList: Array<Service> = [];
    documentList: Array<Document> = [];
    carDocumentList: Array<Document> = [];
    serviceWisePriceDocument: Array<ZoneAdd> = [];
    serviceWisePriceDocumentAll: Array<ZoneAdd> = [];

    dataSource: MatTableDataSource<ZoneAdd> = new MatTableDataSource<ZoneAdd>();

    displayedColumns = ['serviceName', 'baseCharge', 'perKmCharge', 'perMinCharge', 'perBookingCharge',
        'perMinimumCharge', 'minimumKm', 'cancelCharge', 'documentName', 'carDocument'];

    constructor(httpClient: HttpClient, public webService: WebService, public snackBar: MatSnackBar) {

        this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBEM36u8bnwKBKVJL74fZabGVoS0rGG4Ac&libraries=drawing', 'callback')
            .pipe(
                map(() => true),
                catchError(() => of(false))
            );
    }
    ngOnInit(): void {
        this.getList();
    }

    initDrawingManager(map: GoogleMap) {
        const drawingOptions: google.maps.drawing.DrawingManagerOptions = {
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON,
                ],
            },
            polygonOptions: {
                strokeColor: '#00ff00',
            }
        };
        this.drawingManager = new google.maps.drawing.DrawingManager(drawingOptions);
        this.drawingManager.setMap(map.googleMap);


        google.maps.event.addListener(this.drawingManager, "overlaycomplete", (event: any) => {
            //Polygon Drawn
            if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                const newShape = event.overlay;
                newShape.type = event.type;
                this.shapes.push(newShape);
                if (this.drawingManager.getDrawingMode()) {
                    this.drawingManager.setDrawingMode(null);
                }
            }
        });

        google.maps.event.addListener(this.drawingManager, "polygoncomplete", (polygon: any) => {
            Common.Dlog("polygoncomplete");
            this.polygon = polygon;
            polygon.setEditable(true);
            const polygonBounds = polygon.getPath();
            this.subArray = [];
            polygonBounds.forEach((polygonLatLong: any) => {
                Common.Dlog({ 'lat': polygonLatLong.lat(), "lng": polygonLatLong.lng() });
                this.subArray.push({ 'lat': polygonLatLong.lat(), "lng": polygonLatLong.lng() });

            });
            Common.Dlog(JSON.stringify(this.subArray));
        });

        google.maps.event.addListener(this.drawingManager, "drawingmode_changed", () => {
            Common.Dlog("drawingmode_changed");
            if (this.drawingManager.getDrawingMode() != null) {

                this.shapes.forEach(shape => {
                    shape.setMap(null);
                });

                this.shapes = [];
                this.polygon = null;
            }
        });
    }

    serviceCheckClick(serviceObj: Service, event: any) {
        serviceObj.isSelect = event.checked;
        this.serviceWisePriceDocumentAll.find((item: ZoneAdd) => item.service_id == serviceObj.service_id)!.isSelect = event.checked;
        this.serviceWisePriceDocument = this.serviceWisePriceDocumentAll.filter(item => item.isSelect == true);
        this.dataSource = new MatTableDataSource(this.serviceWisePriceDocument);
    }

    serviceDocumentCheckedClick(serviceObj: ZoneAdd, docObj: Document, event: any) {
        docObj.isSelect = event.checked;
    }


    getList() {

        this.webService.action(Common.svListServiceDoc, {}, true).then((responseObj: any) => {

            Common.Dlog(responseObj);
            if (responseObj.status == 1) {
                this.serviceList = responseObj.payload.service;

                responseObj.payload.document.forEach((docObj: Document) => {
                    docObj.isSelect = false;
                    if (docObj.type == 1) {
                        this.documentList.push(docObj);
                    } else {
                        this.carDocumentList.push(docObj);
                    }
                });

                this.serviceList.forEach(serviceObj => {
                    const priceObj = new ZoneAdd();
                    priceObj.service_id = serviceObj.service_id;
                    priceObj.service_name = serviceObj.service_name;
                    priceObj.document_array = this.documentList;
                    priceObj.car_document_array = this.carDocumentList;
                    this.serviceWisePriceDocumentAll.push(JSON.parse(JSON.stringify(priceObj)));
                });
            } else {
                this.serviceList = [];
            }
            this.dataSource = new MatTableDataSource(this.serviceWisePriceDocument);
        });
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, "ok", {
            duration: 2000,
        });
    }

    createZone() {
        if (this.zoneName == '') {
            this.openSnackBar("please enter zone name");
            return;
        }

        if (this.taxVal == '') {
            this.openSnackBar("please enter tax value");
            return;
        }

        if (this.polygon == null || this.polygon == undefined) {
            this.openSnackBar("please select zone area");
            return;
        }

        const dataObj = [];

        for (let i = 0; i < this.serviceWisePriceDocument.length; i++) {
            const serviceObj = this.serviceWisePriceDocument[i];

            if (serviceObj.base_charge == '') {
                this.openSnackBar('"' + serviceObj.service_name + '" please enter base charge');
                return;
            }

            if (serviceObj.per_km_charge == '') {
                this.openSnackBar('"' + serviceObj.service_name + '" please enter per KM charge');
                return;
            }

            if (serviceObj.per_minute_charge == '') {
                this.openSnackBar('"' + serviceObj.service_name + '" please enter per minute charge');
                return;
            }

            if (serviceObj.booking_charge == '') {
                this.openSnackBar('"' + serviceObj.service_name + '" please enter booking charge');
                return;
            }

            if (serviceObj.minimum_fair == '') {
                this.openSnackBar('"' + serviceObj.service_name + '" please enter minimum fair');
                return;
            }

            if (serviceObj.minimum_km == '') {
                this.openSnackBar('"' + serviceObj.service_name + '" please enter minimum km');
                return;
            }

            if (serviceObj.cancel_charge == '') {
                this.openSnackBar('"' + serviceObj.service_name + '" please enter cancel charge');
                return;
            }

            serviceObj.document_id = this.getDocumentId(serviceObj.document_array);
            serviceObj.car_document_id = this.getDocumentId(serviceObj.car_document_array);
            const data = Object.assign({}, serviceObj);
            data['document_array'] = [];
            data['car_document_array'] = [];
            dataObj.push(data);
        }

        const polygonBounds = this.polygon.getPath();
        this.subArray = [];

        polygonBounds.forEach((polygonLatlong: any) => {
            this.subArray.push({ 'lat': polygonLatlong.lat(), 'lng': polygonLatlong.lng() });
        });

        const paraObj = {
            "zone_name": this.zoneName,
            "city": this.cityName,
            "zone_json": JSON.stringify(this.subArray),
            "price_json": JSON.stringify(dataObj),
            "tax": this.taxVal.toString(),
        }

        Common.Dlog(paraObj);

        this.webService.action(Common.svAddZone, paraObj, true).then((responseObj: any) => {

            Common.Dlog(responseObj);
            if (responseObj.status == 1) {
                this.zoneName = '';
                this.cityName = '';
                this.taxVal = '';
                this.serviceWisePriceDocumentAll = [];
                this.serviceWisePriceDocument = [];

                this.serviceList.forEach(serviceObj => {
                    const priceObj = new ZoneAdd();
                    priceObj.service_id = serviceObj.service_id;
                    priceObj.service_name = serviceObj.service_name;
                    priceObj.document_array = this.documentList;
                    priceObj.car_document_array = this.carDocumentList;
                    this.serviceWisePriceDocumentAll.push(JSON.parse(JSON.stringify(priceObj)));
                });


                this.shapes.forEach(shape => {
                    shape.setMap(null);
                })
                this.shapes = [];
                this.polygon = null;
                this.dataSource = new MatTableDataSource(this.serviceWisePriceDocument);
            }
            this.openSnackBar(responseObj.message)

        });

    }

    getDocumentId(docArr: Array<Document>, documentId: string = '') {
        docArr.forEach(item => {
            if (item.isSelect == true) {
                documentId = documentId + item.doc_id.toString() + ',';
            }
        });

        return documentId.replace(/,\s*$/, '');
    }




}
