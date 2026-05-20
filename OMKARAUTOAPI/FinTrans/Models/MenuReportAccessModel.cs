using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class MenuReportAccessModel
    {
        public string? AccountID { get; set; }
        public string? AccountName { get; set; }
        public string? ApproveYn { get; set; }
        public string? Level { get; set; }
        public string? ParentAccountID { get; set; }
        public List<MenuReportAccessModel> Children { get; set; } = new List<MenuReportAccessModel>();
    }
}
