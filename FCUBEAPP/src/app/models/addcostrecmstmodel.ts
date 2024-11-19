import { Addcostrecdtlmodel } from "./addcostrecdtlmodel";

export class Addcostrecmstmodel {
    masterID :string = "";
    branchCode :string = "";
    transNo :string = ""; 
    transDate :string = "";
    addCostID :string = "";
    addCostDescription :string = "";
    addCostType :string = "";
    manualOrDateRange :string = ""; 
    documentType :string = ""; 
    docBranch :string = "";
    fromDate :string = "";
    toDate :string = "";
    totalAmount :string = "";
    divisionOption :string = "";
    partyOption :string = "";
    partyCode :string = "";
    costTot :string = ""; 
    othTot :string = "";
    grossTot :string = "";
    tdsRate :string = ""; 
    tdsAmt :string = "";
    netTot :string = "";
    remarks :string = ""; 
    othDbCrAc :string = "";
    tdsAc :string = "";
    approvedYN :string = "";
    rpType :string = "";
    creditAc:string = "";
    neftPmt :string = ""; 
    chequeNo :string = "";
    chequeDate :string = "";
    finDocID :string = "";
    finDocIdJV :string = "";
    beneficiaryId :string = "";
    attatchFile1 :string = ""; 
    attatchFile2 :string = ""; 
    modifyRemarks :string = "";
    yearId :string = "";
    loggedInUser :string = ""; 
    branch :string = "";
    addCostTp :string = "";
        
    addCostRecDtlList: Addcostrecdtlmodel[] = [];
}
