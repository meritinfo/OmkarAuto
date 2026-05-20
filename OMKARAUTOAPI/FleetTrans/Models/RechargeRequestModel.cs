using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class RechargeRequestModel
    {
        public string? ReqId { get; set; }
        public string? ReqBranch { get; set; }
        public string? ReqDate { get; set; }
        public string? ReqCard { get; set; }
        public string? ReqAmt { get; set; }
        public string? VehicleMasterId { get; set; }
        public string? Remarks { get; set; }
        public string? AttachPath { get; set; }
        public string? VerifiedYN { get; set; }
        public string? VerifiedBy { get; set; }
        public string? VerifiedDt { get; set; }
        public string? ApprovedYN { get; set; }
        public string? ApprovedBy { get; set; }
        public string? ApprovedDt { get; set; }
        public string? ApprovedAmt { get; set; }
        public string? AppRejRemarks { get; set; }
        public string? LoggedInUser { get; set; }
        public string? VehicleNo { get; set; }
        public string? CardNo { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public bool Selected { get; set; }

    }
}
