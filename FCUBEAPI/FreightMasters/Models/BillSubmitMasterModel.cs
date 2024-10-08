using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Models
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
    }
}
