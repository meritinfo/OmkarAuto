import { Paginationmodel } from "./paginationmodel";
import { VehiclerepmaintMaster } from "./vehiclerepmaintmastermodel";

export class Vehiclerepmaintlistmodel {
    maintList: VehiclerepmaintMaster[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}