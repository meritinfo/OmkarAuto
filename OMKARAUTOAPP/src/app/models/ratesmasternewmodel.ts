export class Ratesmasternewmodel {
    rateId: string = '';
    partyId : string = '';
    validFrom : string = '';
    validUpto : string = '';
    vehTypeId : string = '';
    rateTypeId : string = '';
    fromLocationType : string = '';
    fromLocation : string = '';
    location : string = '';
    party : string = '';
 
    loggedInUser:  string = "";
    ratesMasterNewDetailList: Ratesdetailnewmodel[] = [];
}
export class Ratesdetailnewmodel {
  //id: string = "";
  rateDtlId: string = "";
  rateId: string = "";
  destination: string = "";
  productId: string = "";
  rateRs: string = "";
}


