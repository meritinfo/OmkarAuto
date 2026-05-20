using System.Data;

namespace FinanceMasters.Models
{
    public class FinAccountsMasterGstModel
    { 
        public string? AccountId { get; set; }
        public List<FinAccountsMasterGstDetail> finAccountsGstDetail { get; set; }

    }
    public class FinAccountsMasterGstDetail
    {
        public string? AccountId { get; set; }
        public string? Location { get; set; }
        public string? GstNo { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? Address4 { get; set; }
        public string? City { get; set; }
        public string? StateCode { get; set; }
        public string? PinCode { get; set; }
        public string? MobileNo { get; set; }
        public string? Email { get; set; }
    }

}
