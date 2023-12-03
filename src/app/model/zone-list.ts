export class ZoneList {
    constructor(
        public zone_id: number = 0,
        public zone_doc_id: number = 0,
        public price_id: number = 0,
        public service_id: number = 0,
        public on_service_id: string = '',

        public zone_name: string = '',
        public zone_json: string = '',
        public city: string = '',
        public tax: string = '',
        public service_name: string = '',

        public document_name: string = '',
        public car_document_name: string = '',
        public base_charge: string = '',
        public per_km_charge: string = '',
        public per_min_charge: string = '',
        public booking_charge: string = '',
        public mini_fair: string = '',
        public mini_km: string = '',
        public cancel_change: string = ''

    ){

    }
}
