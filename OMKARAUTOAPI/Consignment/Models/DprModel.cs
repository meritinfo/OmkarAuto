namespace Consignment.Models
{
    public class DprModel
    {
        public string? DprId { get; set; }
        public string? DprBranch { get; set; }
        public string? DprSlNo { get; set; }
        public string? DprDate { get; set; }
        public string? PayParty { get; set; }
        public string? PartyName { get; set; }
        public string? BookStatus { get; set; }
        public string? Origin { get; set; }
        public string? FromPlace { get; set; }
        public string? Destination { get; set; }
        public string? ToPlace { get; set; }
        public string? VehicleTypeId { get; set; }
        public string? VehTypeDesc { get; set; }
        public string? ActualWt { get; set; }
        public string? ChargeWt { get; set; }
        public string? OdcDimensions { get; set; }
        public string? OdcCft { get; set; }
        public string? RateType { get; set; }
        public string? RateRs { get; set; }
        public string? FreightRs { get; set; }
        public string? HamaliAmt { get; set; }
        public string? HamaliDesc { get; set; }
        public string? LDDetenAmt { get; set; }
        public string? LDDetenDesc { get; set; }
        public string? ExtraAmt { get; set; }
        public string? ExtraDesc { get; set; }
        public string? OtherAmt { get; set; }
        public string? OtherDesc { get; set; }
        public string? TotFreightAmt { get; set; }
        public string? YearId { get; set; }
        public string? AttachConfirmDoc { get; set; }
        public string? Dpr_Status { get; set; }
        public string? VehicleNo { get; set; }
        public string? BrokerName { get; set; }
        public string? DriverName { get; set; }
        public string? DriverMob { get; set; }
        public string? NoofLr { get; set; }
        public string? BusinessBy { get; set; }
        public string? LoggedInUserID { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public List<DprDtlModel> DprDtls { get; set; }

    }

    public class DprDtlModel
    {
        public string? DprDtlId { get; set; }
        public string? DprId { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? FromStn { get; set; }
        public string? ToStn { get; set; }
        public string? GcNoteNo { get; set; }
        public string? MainGcYN { get; set; }
        public string? SpecialRemarks { get; set; }
    }
}
