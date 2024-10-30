using DocumentFormat.OpenXml.Bibliography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class FastTagModel
    {
       public string? FtMasterID    { get; set; }
       public string? FtAccount     { get; set; }
       public string? AccountName { get; set; }        
       public string? FromDate      { get; set; }
       public string? ToDate        { get; set; }
       public string? StmtDate      { get; set; }
       public string? Remarks       { get; set; }
       public string? TotalFtAmt    { get; set; }
        public string? FtmId { get; set; }        
       public string? BranchCode    { get; set; }
       public string? YearID        { get; set; }
       public string? LoggedInUser  { get; set; }
        public List<FastTagDtlsModel> FastTagDtlList { get; set; }
    }
}
