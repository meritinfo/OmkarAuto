export class Panvalidapiresultmodel {
    result: Reslt= new Reslt();
}

export class Reslt {
    name: string="";
    number: string="";
    typeOfHolder: string="";
    isIndividual: boolean= false;
    isValid:  boolean= false;
    firstName : string="";
    middleName : string="";
    lastName : string="";
    panStatus: string="";
    title: string="";
    panStatusCode: string="";
    aadhaarSeedingStatus: string="";
    aadhaarSeedingStatusCode : string="";
    lastUpdatedOn: string="";
}
