import { Document } from "./document";

export class ZoneAdd {
    constructor(
        public service_id: number = 0,
        public service_name: string = '',

        public base_charge: string = '',
        public per_km_charge: string = '',
        public per_minute_charge: string = '',
        public minimum_fair: string = '',
        public booking_charge: string = '',
        public cancel_charge: string = '',
        public minimum_km: string = '2',
        public tax: string = '0',
        public document_id: string = '',
        public car_document_id: string = '',

        public document_array: Array<Document> = [],
        public car_document_array: Array<Document> = [],

        public isSelect = false,
        

    ) {

    }
}
