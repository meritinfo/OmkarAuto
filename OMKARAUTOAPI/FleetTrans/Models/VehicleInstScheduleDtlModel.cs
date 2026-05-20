

using DocumentFormat.OpenXml.Wordprocessing;

namespace FleetTrans.Models
{
    public class VehicleInstScheduleDtlModel
    {        
        public string? MasterID         { get; set; }
        public string? VehicleMasterId  { get; set; }
        public string? InstNo           { get; set; }
        public string? InstDate         { get; set; }
        public string? Pri_InstAmt      { get; set; }
        public string? Int_InstAmt      { get; set; }
        public string? Tot_InstAmt      { get; set; }
        public string? DtlRemarks       { get; set; }
        public string? PaidAmt          { get; set; }

    }
}
