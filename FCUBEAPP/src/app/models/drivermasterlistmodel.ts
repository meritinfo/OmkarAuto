import { Paginationmodel } from "./paginationmodel";
import { Drivermodel } from "./drivermodel";

export class Drivermasterlistmodel {
  driverList: Drivermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
