export class Service {
    constructor(
        public service_id: number = 0,
        public service_name: string = "",
        public seat: number = 1,
        public color: string = "#000000",
        public icon: string = "",
        public top_icon: string = "",
        public gender: string = "",
        public status: number = 1,
        public created_date: string = "",
        public description: string = "",
        public isSelect: boolean = false,
    ) {

    }
}
