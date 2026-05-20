
namespace FleetTrans.Models
{
    public class VendorPmtDtlModel
    {        
        public string? PmtForm { get; set; } 
        public string? VendorBillMasterId { get; set; }  
        public string? VehicleNo { get; set; }
        public string? VendorInvNo { get; set; }  
        public string? VendorInvDt { get; set; }
        public string? NetAmount  { get; set; } 
        public string? AmtPaid { get; set; } 
        public string? AmtDed { get; set; } 
        public string? AmtTDS { get; set; } 
        public string? AmtExtras { get; set; } 
        public string? DtlRemarks { get; set; } 
    }
}
