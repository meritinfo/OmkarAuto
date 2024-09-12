using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
	public class DeliveryAckPodModel
	{
		public string? AckId { get; set; }
		public string? AckBranch { get; set; }
        public string? AckBr { get; set; }
        public string? AckDate { get; set; }
		public string? AckSlNo { get; set; }
		public string? GcYear { get; set; }
		public string? GcBook { get; set; }
        public string? GcDate { get; set; }
		public string? GcNoteNo { get; set; }
		public string? ConsignmentId { get; set; }
        public string? GcFrom { get; set; }
        public string? GcTo { get; set; }
        public string? Consignor { get; set; }
        public string? Consignee { get; set; }
        public string? Party { get; set; }
        public string? CnPkgs { get; set; }
		public string? CnActWt { get; set; }
		public string? DelPkgs { get; set; }
		public string? DelActWt { get; set; }
		public string? ShExPkgs { get; set; }
		public string? ShExpActWt { get; set; }
		public string? ExpectedRptdate { get; set; }
        public string? ExpectedRptTime { get; set; }
        public string? ReportingDate { get; set; }
        public string? ReportingTime { get; set; }        
        public string? DelayDays { get; set; }
		public string? DeliveryDate { get; set; }
        public string? DeliveryTime { get; set; }        
        public string? DetnDays { get; set; }
		public string? PodRecdYN { get; set; }
		public string? PodRecdDate { get; set; }
		public string? PodAttach1 { get; set; }
		public string? PodAttach2 { get; set; }
		public string? BalancePayable { get; set; }
		public string? HandlingPayable { get; set; }
		public string? DetiontionPayable { get; set; }
		public string? Others1Payable { get; set; }
		public string? Others2Payable { get; set; }
		public string? TotExtPayable { get; set; }
		public string? ShortageDesc { get; set; }
		public string? DamageDesc { get; set; }
		public string? ShortageClaim { get; set; }
		public string? DamageClaim { get; set; }
		public string? LateRptDed { get; set; }
		public string? LatePodDed { get; set; }
		public string? OthDed { get; set; }
		public string? NetPayable { get; set; }      
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
    }
}