using FinanceMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FinanceMaster.Models
{
    public class BenBankList
    {
        public List<BenBankListModel> BenList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
