export class ZonePrice {
    constructor(
        public price_id: number = 0,
        public service_id: number = 0,
        public zone_id: number = 0,
        public zone_name: string = '',
        public city: string = '',
        public tax: string = '',
        public service_name: string = '',
        public base_charge: string = '',
        public per_km_charge: string = '',
        public per_min_charge: string = '',
        public booking_charge: string = '',
        public mini_fair: string = '',
        public mini_km: string = '',
        public cancel_charge: string = '',
    ){

    }
}
