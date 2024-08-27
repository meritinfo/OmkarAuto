import { Paginationmodel } from "./paginationmodel";
import { VehicleadvbalreceiptModel } from "./vehicleadvbalreceiptmodel";

export class VehicleadvbalreceiptlistModel {
    advanceList: VehicleadvbalreceiptModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
