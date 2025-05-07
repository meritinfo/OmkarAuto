using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillsMasterModel
    {
        public string? BillsMasterId { get; set; }
        public string? BillingStation { get; set; }
        public string? BillNo { get; set; }
        public string? BillStatus { get; set; }
        public string? BillType { get; set; }
        public string? SacHsn { get; set; }
        public string? BillDate { get; set; }
        public string? DueDate { get; set; }
        public string? SuppYN { get; set; }
        public string? PartyCode { get; set; }
        public string? PartyGstLocation { get; set; }
        public string? CollBranch { get; set; }
        public string? GstType { get; set; }
        public string? GstBy { get; set; }        
        public string? TotalFreight { get; set; }
        public string? TotalStatistical { get; set; }
        public string? TotalFov { get; set; }
        public string? TotalDoorColl { get; set; }
        public string? TotalHandling { get; set; }
        public string? TotalLoadingDetn { get; set; }
        public string? TotalEnroute { get; set; }
        public string? TotalMisc { get; set; }
        public string? TotalDoorDel { get; set; }
        public string? TotalUnLoading { get; set; }
        public string? TotalDetention { get; set; }
        public string? TotalExtras { get; set; }
        public string? TotalOthers { get; set; }
        public string? TotalSubTotal { get; set; }
        public string? TotalSgstAmt { get; set; }
        public string? TotalCgstAmt { get; set; }
        public string? TotalIgstAmt { get; set; }
        public string? TotalNonGstAmt1 { get; set; }
        public string? TotalNonGstAmt2 { get; set; }
        public string? TotalGtotal { get; set; }
        public string? BillRemarks { get; set; }
        public string? EnlcosedDocs { get; set; }
        public string? SuppParticulars { get; set; }
        public string? Attachedfile { get; set; }
        public string? BillAmtCleared { get; set; }
        public string? BillDed { get; set; }
        public string? BillTDS { get; set; }
        public string? Recoverable { get; set; }
        public string? BillExcess { get; set; }
        public string? SdEmdAmt { get; set; }
        public string? RecoveredAmt { get; set; }
        public string? PrintedYN { get; set; }
        public string? PrintedDate { get; set; }
        public string? MRDone { get; set; }
        public string? MRDate { get; set; }
        public string? SubmitYN { get; set; }
        public string? SubmitDate { get; set; }
        public string? YearId { get; set; }
        public string? FinFtmid { get; set; }
        public string? CheckedBy { get; set; }
        public string? ApprovedBy { get; set; }
        public string? DisputeType { get; set; }
        public string? DisputeDate { get; set; }
        public string? DisputeCaseNo { get; set; }
        public string? DisputeCaseStory { get; set; }
        public string? DisputeReleaseDate { get; set; }
        public string? StationName { get; set; }
        public string? Party { get; set; }
        public string? CollectionBranch { get; set; }
        public string? LoggedInUser { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public List<BillsDetailModel> BillsMasterListData { get; set; }
        public List<BillsMasterSearchModel> BillsEnqListData { get; set; }
        public List<BillSubmitMasterModel> BillSubmitList { get; set; }
        public List<MrList> MrList { get; set; }
    }
}
