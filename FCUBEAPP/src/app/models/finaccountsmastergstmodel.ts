export class Finaccountsmastergstmodel {
    accountId: string="";
    finAccountsGstDetail: Finaccountsmastergstdetails[] = [];
}

export class Finaccountsmastergstdetails {    
    accountId: string="";
    location : string="";
    gstNo: string="";
    address1 : string="";
    address2 : string="";
    address3 : string="";
    address4 : string="";
    city: string="";
    stateCode: string="";
    pinCode: string="";
    mobileNo : string="";
    email : string="";
}