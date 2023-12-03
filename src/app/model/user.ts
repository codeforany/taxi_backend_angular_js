export class User {
    constructor(
        public user_id: number = 0,
        public name: string = "",
        public email: string = "",
        public gender: string = "",
        public mobile: string = "",
        public mobile_code: string = "",
        public user_type: number = 1,
        public device_source: string = "",
        public zone_id: number = 0,
        public image: string = "",
        public is_block: number = 0,
        public is_online: number = 0,
        public status: number = 0,
        public created_date: string = "",
        public zone_name: string = ""

    ) {

    }
}
