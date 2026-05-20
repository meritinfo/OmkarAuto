export class Spareslubesmastermodel {
    spareLubId: string="";
    spareLubName: string="";
    spareLubType: string="";
    sch_Oth: string="";
    lifeType: string="";
    lifeExpectancy: string="";
    isActive: string="";
    loggedInUser: string="";
    stype: string="";
    inventroyYN: string="";
  //  openingQty: string="";
   // openingValue: string="";
   sparesLubesDetailList: Spareslubesdetailmodel[] = [];
}

export class Spareslubesdetailmodel {
  spareLubId: string = "";
  brandId: string = "";
  openingQty: string = "";
  openingValue: string = "";
  godownId: string = "";
}