export class Transportmastermodel {
  tptCode: string = "";
  tptName: string = "";
  address1: string = "";
  address2: string = "";
  address3: string = "";
  address4: string = "";
  stateCode: string = "";
  pinCode: string = "";
  phone: string = "";
  email: string = "";
  contactPerson1: string = "";
  mobile1: string = "";
  contactPerson2: string = "";
  mobile2: string = "";
  panNo: string = "";
  gstNo: string = "";
  aadharNo: string = "";
  cancelChq: string = "";
  addrProof: string = "";
  eligibleForBid: string = "";
  whatsappMblNo: string = "";
  branchCode: string = "";
  remarks: string = "";
  isActive: string = "";
  inActiveDate: string = "";
     
  transportLocationList: TransportLocationListmodel[] = [];
  transportStatesList: TransportStateListmodel[] = [];
  transportVehTypesList: TransportVehTypesListmodel[] = [];
}

export class TransportLocationListmodel {
  dtlid: string = "";
  tptCode: string = "";
  locId: string = "";
}

export class TransportStateListmodel {
  dtlid: string = "";
  tptCode: string = "";
  stateCode: string = "";
 // adbluedieselAmount: string = "";
}
export class TransportVehTypesListmodel {
  dtlid: string = "";
  tptCode: string = "";
  vehTypeId: string = "";
 // adbluedieselAmount: string = "";
}