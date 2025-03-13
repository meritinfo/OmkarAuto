using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class CciInvoiceMstModel
    {
        public string? CciInvMstId { get; set; }
        public string? CciInvNo { get; set; }
        public string? CciInvDate { get; set; }
        public string? Remarks { get; set; }
        public string? GstType { get; set; }
        public string? TotalTaxableAmt { get; set; }
        public string? TotalSgstAmt { get; set; }
        public string? TotalCgstAmt { get; set; }
        public string? TotalIgstAmt { get; set; }
        public string? TotalInvAmt { get; set; }
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
        public List<CciInvoiceDtlModel> CcinvmstDtlList { get; set; }
    }
    public class CciInvoiceDtlModel
    {
        public string? CciInvDtlId { get; set; }
        public string? CciInvMstId { get; set; }
        public string? ContainerNo { get; set; }
        public string? GcYear { get; set; }
        public string? GcBook { get; set; }
        public string? GcNoteNo { get; set; }
        public string? ChCostId { get; set; }
        public string? TaxableAmt { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? TotalAmt { get; set; }
        public string? DtlRemarks { get; set; }
    }
}
