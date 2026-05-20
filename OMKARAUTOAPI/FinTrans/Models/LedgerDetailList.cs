using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class LedgerDetailList
    {
        public List<LedgerDetailModel> LedgerList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
