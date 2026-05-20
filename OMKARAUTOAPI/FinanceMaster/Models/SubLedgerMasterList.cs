using FinanceMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;
namespace FinanceMaster.Models
{
    public class SubLedgerMasterList
    {
        public List<SubLedgerMasterModel> SubList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
