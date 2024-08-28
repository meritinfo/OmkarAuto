namespace Consignment.Models
{
    public class DprVehiPlacedModel
    {
        public string? VehiclePlacedId { get; set; }
        public string? DprId { get; set; }
        public string? DprDate { get; set; }
        public string? PayParty { get; set; }
        public string? PartyName { get; set; }
        public string? Origin { get; set; }
        public string? FromPlace { get; set; }
        public string? Destination { get; set; }
        public string? ToPlace { get; set; }    				
        public string? VehicleEngagedBy { get; set; }
        public string? BrokerId { get; set; }
        public string? BrokerName { get; set; }        
        public string? VehicleNo { get; set; }
        public string? VehOwnerName { get; set; }
        public string? VehAdd1 { get; set; }
        public string? VehAdd2 { get; set; }
        public string? OwnerPan { get; set; }
        public string? VehOwnerMobile { get; set; }
        public string? VehInsValidDate { get; set; }
        public string? VehFitValidDate { get; set; }
        public string? VehPermitValidDate { get; set; }
        public string? DriverName { get; set; }
        public string? DriverMob1 { get; set; }						
        public string? ChallanChrgWt { get; set; }
        public string? RatePerTon { get; set; }
        public string? LorryHire { get; set; }
        public string? Advance1 { get; set; }
        public string? Advance2 { get; set; }
        public string? Advance3 { get; set; }
        public string? AdvanceAmt { get; set; }
        public string? BalanceAmt { get; set; }
        public string? AssignToStaff { get; set; }
        public string? VehicleRptDateTime { get; set; }
        public string? PlacementStatus { get; set; }
        public string? PlacementStatusRemarks { get; set; }
        public string? NoofLr { get; set; }        
        public string? LoggedInUser { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public List<DprDtlModel> DprDtls { get; set; }

    }
}
