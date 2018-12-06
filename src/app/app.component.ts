/// <reference types="@types/googlemaps" />

import { Component } from '@angular/core';
import { Iorderdetails } from './orderdetails';
import { GetoredersService } from './getoreders.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})

export class AppComponent {

  title = 'LogiNext Delivery System';

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  errorMessage: string;

  //to get filtered pincode
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: Iorderdetails[];
    products: Iorderdetails[] = [];

    constructor(private orderService: GetoredersService) {}

    //method for searching specific pincode
    performFilter(filterBy: string): Iorderdetails[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Iorderdetails) =>
              product.pincode.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    //method for highlighting specific location 
    setcenter(lat:number,long:number, city:string){

      this.map.setCenter(new google.maps.LatLng(lat,long));

      var infowindow = new google.maps.InfoWindow({
        content: city+" latitude : "+lat+" longtitude : "+long
      });

      var pos = { lat: lat , lng : long};

      var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'Order location'
      });

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    }
   
    ngOnInit(): void {

      var mapProp = {
        center: new google.maps.LatLng(29.176523, 120.390932),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //setting inital map view
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      //Service call to get data
      this.orderService.getorders()
                .subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                    error => this.errorMessage = <any>error);                  
    }
  }
