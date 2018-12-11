import { Injectable } from '@angular/core';

declare var H: any;

@Injectable({
    providedIn: 'root'
})
export class HereService {

    public platform: any;
    public geocoder: any;

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": "9hER6DupA1NaVJc4XZy4",
            "app_code": "VHVsTwmy7Dnbs-_MMwJEBw"
        });
        this.geocoder = this.platform.getGeocodingService();
    }

    public getAddress(query: string) {}

    public getAddressFromLatLng(query: string) {}

}