export class Model {
    constructor(
        public model_id: number = 0,
        public model_name: string = "",
        public brand_name: string = "",
        public brand_id: string = "",
        public seat: string = "1",
        public status: number = 0,
        public created_date: string = "",
        public modify_date: string = "",
    ) {
    }
}
