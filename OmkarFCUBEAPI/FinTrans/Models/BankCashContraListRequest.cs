using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class BankCashContraListRequest
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public string Search { get; set; }
    }
}
