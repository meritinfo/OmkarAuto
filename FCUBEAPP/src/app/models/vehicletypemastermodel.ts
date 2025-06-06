export class Vehicletypemastermodel {
    vehicleTypeID: string = "";
    vehicleTypeDesc: string = "";
    vehicleTypeGroupId: string = "";
    tonCap: string = "";
    runPerDayKM: string = "";
    loggedInUser: string = "";

  vehicletypeDetailList: VehicleTypeDetailModel[] = [];

}
export class VehicleTypeDetailModel {
    vehTypeId :  string="";
      vehTypeAlias :  string="";
 
  }