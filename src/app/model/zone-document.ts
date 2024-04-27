export class ZoneDocument {
    constructor(
        public zone_doc_id: number = 0,
        public service_id: number = 0,
        public zone_id: number = 0,

        public zone_name: string = '',
        public document_name: string = '',
        public car_document_name: string = '',

        public document_ids: string = '',
        public car_document_ids: string = '',
        

        public isSelect: boolean = false,
    ) {

    }
}
