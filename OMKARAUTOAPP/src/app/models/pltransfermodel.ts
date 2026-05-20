export class Pltransfermodel {
 tfrBranch        :string = "";
 tfrYear          :string = "";
 tfrPLAmt         :string = "";
 tfrTotalDrAmt    :string = ""; 
 tfrTotalCrAmt    :string = ""; 
 loggedInUser     :string = ""; 
 plTransferDetails: plTransferDetails[] = [];
}

export class plTransferDetails {
 TfrId              :string = "";
 accountName        :string = "";
 drAmt              :string = "";
 crAmt              :string = ""; 
 accountId          :string = ""; 
}

