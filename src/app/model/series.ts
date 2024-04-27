export class Series {
    constructor(
        public series_id: number = 0,
        public series_name: string = "",
        public model_id: string = "",
        public model_name: string = "",
        public brand_name: string = "",
        public brand_id: string = "",
        public status: number = 0,
        public created_date: string = "",
        public modify_date: string = "",
    ) {
    }
}
