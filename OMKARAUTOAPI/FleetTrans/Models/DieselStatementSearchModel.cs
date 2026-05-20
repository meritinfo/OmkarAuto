
namespace FleetTrans.Models
{
    public class DieselStatementSearchModel
    {
        public string PmtId { get; set; }
        public string Branch { get; set; }
        public string PmtDate { get; set; }
        public string VehicleNo { get; set; }
        public string HsdAdvType { get; set; }
        public string TransDesc { get; set; }
        public string QtyLtrs { get; set; }
        public string RatePerLtr { get; set; }
        public string AmountPaid { get; set; }
        public string Remarks { get; set; }
        public bool Selected { get; set; }

    }
}
