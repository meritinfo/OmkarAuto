using FinanceMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Models
{
    public class BeneficiaryMasterList
    {
        public List<BeneficiaryMasterModel> BeneficiaryList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}
