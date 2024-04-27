import * as monment from 'moment-timezone';

export class Common {
    public static timeZone = "Asia/Kolkata";
    public static isDev = true;
    
    public static baseUrl = "http://localhost:3001/api/";
    public static socketBaseUrl = "http://localhost:3001";
    public static imageBaseUrl = "http://localhost:3001/img/";

    public static svLogin = Common.baseUrl + "admin/login";

    //TODO: Documents Api
    public static svAddDocument = Common.baseUrl + "admin/add_document";
    public static svListDocument = Common.baseUrl + "admin/document_list";
    public static svEditDocument = Common.baseUrl + "admin/document_update";
    public static svDeleteDocument = Common.baseUrl + "admin/document_delete";

    //TODO: Service Api
    public static svAddService = Common.baseUrl + "admin/service_add";
    public static svListService = Common.baseUrl + "admin/service_list";
    public static svEditService = Common.baseUrl + "admin/service_edit";
    public static svDeleteService = Common.baseUrl + "admin/service_delete";
    public static svListServiceDoc = Common.baseUrl + "admin/service_document_list";

    //TODO: User Api
    public static svListUser = Common.baseUrl + "admin/user_list";
    public static svListDriver = Common.baseUrl + "admin/driver_list";

    //TODO: Zone Api
    public static svAddZone = Common.baseUrl + "admin/zone_add";
    public static svListZone = Common.baseUrl + "admin/zone_list";
    public static svDetailZone = Common.baseUrl + "admin/zone_detail";
    public static svEditZone = Common.baseUrl + "admin/zone_edit";
    public static svZoneServicePrice = Common.baseUrl + "admin/zone_price_list";
    public static svZoneServiceList = Common.baseUrl + "admin/zone_service_list";
    public static svDeleteServicePrice = Common.baseUrl + "admin/zone_price_delete";
    public static svEditServicePrice = Common.baseUrl + "admin/zone_price_edit";
    public static svZoneServiceDocument = Common.baseUrl + "admin/zone_document_list";
    public static svEditServiceDocument = Common.baseUrl + "admin/zone_document_edit";

    //TODO: Car  Api
    public static svAddCar = Common.baseUrl + "admin/add_car";
    public static svListBrand = Common.baseUrl + "brand_list";
    public static svListModel = Common.baseUrl + "model_list";
    public static svListSeries = Common.baseUrl + "series_list";

    public static svListCarBrand = Common.baseUrl + "admin/brand_list";
    public static svApprovedBrand = Common.baseUrl + "admin/brand_approved";
    public static svDeleteBrand = Common.baseUrl + "admin/brand_delete";

    public static svListCarModel = Common.baseUrl + "admin/model_list";
    public static svApprovedModel = Common.baseUrl + "admin/model_approved";
    public static svDeleteModel = Common.baseUrl + "admin/model_delete";

    public static svListCarSeries = Common.baseUrl + "admin/series_list";
    public static svApprovedSeries = Common.baseUrl + "admin/series_approved";
    public static svDeleteSeries = Common.baseUrl + "admin/series_delete";
    

    public static accessToken: string|null = localStorage.getItem("auth_token");

    static Dlog(object: any) {
        if(Common.isDev) {
            console.log(object);
        }
    }
}
