namespace FreightMasters.Models
{
    public class FreightRatesMstModel
    {
        public string? MasterID { get; set; }
        public string? Accountid { get; set; }
        public string? FromPlace { get; set; }
        public string? ValidFrom { get; set; }
        public string? ValidUpto { get; set; }
        public string? RateTypeId { get; set; }
        public string? RateMethod { get; set; }
        public string? AccountName { get; set; }
        public string? FromPoint { get; set; }
        public string? RateForStateOrToPlace { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }
        public List<FreightRatesDtlModel> FreightRatesDetailsList { get; set; }

    }
}