using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillSubmitMasterModel
    {
        public string? SubmitMstId { get; set; }
        public string? SubmitStn { get; set; }
        public string? SubmitNo { get; set; }
        public string? SubmitDt { get; set; }
        public string? SubmitType { get; set; }
        public string? CourierCo { get; set; }
        public string? CourierDocketNo { get; set; }
        public string? PartyCode { get; set; }
        public string? SubmitLocation { get; set; }
        public string? DeptId { get; set; }
        public string? BillsUptoDt { get; set; }
        public string? KindAttnTo { get; set; }
        public string? Remarks { get; set; }
        public string? PartyAcceptDt { get; set; }
        public string? PartyAccceptRemarks { get; set; }
        public string? TotalSubmitAmt { get; set; }
        public string? YearID { get; set; }
        public string? LoggedInUser { get; set; }
        public string? Sname { get; set; }
        public string? dname { get; set; }
        public string? Lname{ get; set; }
        public string? party { get; set; }


        public List<BillSubmitMasterDtlListmodel> BillSubmitMasterDtlList { get; set; }
    }
    public class BillSubmitMasterDtlListmodel
    {
            public string? SubmitDtlId { get; set; }
            public string? SubmitMstId { get; set; }
            public string? SubmitDt { get; set; }
            public string? BillsMasterId { get; set; }
            public string? BillAmt { get; set; }
            public string? DtlRemarks { get; set; }
            public string? BillNo { get; set; }
            public string? BillDate { get; set; }
            public bool Selected { get; set; }

    }
    
}
