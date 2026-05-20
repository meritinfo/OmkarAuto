export class Partygroupmastermodel {
    partyGroupId: string = "";
    partyGroupDesc: string = "";
    deleteFlag: string = "";
    loggedInUser: string = "";
    partyGroupDetailModellist: PartyGroupDetailModel[] = [];
    
}
export class PartyGroupDetailModel {
    partyGroupDtlId :string = "";
    partyGroupId: string = "";
    partyId: string = "";
    
}
