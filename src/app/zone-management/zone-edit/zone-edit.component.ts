import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Common } from 'src/app/common';
import { Service } from 'src/app/model/service';
import { ZoneList } from 'src/app/model/zone-list';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.css']
})
export class ZoneEditComponent {
  mapObj!: GoogleMap;
  @ViewChild(GoogleMap, { static: false }) set map(m: GoogleMap) {
    if (m) {
      this.mapObj = m;
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

  zone_id = '';


  zoneObj: ZoneList = new ZoneList();
  serviceList: Array<Service> = [];
  
  constructor(httpClient: HttpClient, public webService: WebService, public snackBar: MatSnackBar, public route: ActivatedRoute) {

    this.route.params.subscribe( params => {
      this.zone_id = params['zone_id'];
    } )

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBEM36u8bnwKBKVJL74fZabGVoS0rGG4Ac&libraries=drawing', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
      
      
  }
  ngOnInit(): void {
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "ok", {
      duration: 2000,
    });
  }

  serviceCheckClick(serviceObj: Service, event: any) {
    serviceObj.isSelect = event.checked;
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
        editable: true,
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

    this.getZoneDetail()
  }

  //MARK: ServiceCall

  getZoneDetail(){
    
    this.webService.action(Common.svDetailZone, {'zone_id': this.zone_id}, true).then((responseObj: any) => {

      Common.Dlog(responseObj);
      if (responseObj.status == 1) {
        this.zoneObj =  responseObj.payload[0];
        this.serviceList = responseObj.service;


        
        this.serviceList.forEach(serviceObj => {
            this.zoneObj.on_service_id.split(',').forEach( (service_id) => {
              if (serviceObj.service_id.toString() == service_id) {
                serviceObj.isSelect = true;
              }
            } )
        });

        setTimeout(() => {
          const mapVal = JSON.parse(this.zoneObj.zone_json)

          Common.Dlog(mapVal);

          const bounds = new google.maps.LatLngBounds();

          mapVal.forEach((element : any) => {
              bounds.extend(element);
          });

          this.polygon = new google.maps.Polygon({
            paths: mapVal,
            strokeOpacity: 1.0,
            strokeWeight: 2,
            editable: true,
            strokeColor: '#00ff00',
          });


          if (this.mapObj != null) {
            this.polygon.setEditable(true)
            this.polygon.setMap(this.mapObj.googleMap);
            
            this.shapes.push(this.polygon);
            bounds.getCenter();
            this.mapObj.googleMap?.fitBounds(bounds);
          }else{
            Common.Dlog("Map not init")
          }
          

        }, 500);

      } else {
        this.serviceList = [];
      }
    });
  }

  editZone() {
    if (this.zoneObj.zone_name == '') {
      this.openSnackBar("please enter zone name");
      return;
    }

    if (this.zoneObj.tax == '') {
      this.openSnackBar("please enter tax value");
      return;
    }

    if (this.polygon == null || this.polygon == undefined) {
      this.openSnackBar("please select zone area");
      return;
    }

    const polygonBounds = this.polygon.getPath();
    this.subArray = [];

    polygonBounds.forEach((polygonLatlong: any) => {
      this.subArray.push({ 'lat': polygonLatlong.lat(), 'lng': polygonLatlong.lng() });
    });

    let serviceId = '';

    this.serviceList.forEach( (serviceObj) => {
      if(serviceObj.isSelect == true) {
        serviceId = serviceId + serviceObj.service_id.toString() + ',';
      }
    } )
    serviceId =  serviceId.replace(/,\s8$/,'');
    const paraObj = {
      "zone_id": this.zoneObj.zone_id.toString(),
      "zone_name": this.zoneObj.zone_name,
      "city": this.zoneObj.city,
      "zone_json": JSON.stringify(this.subArray),
      "service_id": serviceId,
      "tax": this.zoneObj.tax,
    }

    Common.Dlog(paraObj);

    this.webService.action(Common.svAddZone, paraObj, true).then((responseObj: any) => {

      Common.Dlog(responseObj);

      this.openSnackBar(responseObj.message)

    });
  }
}
