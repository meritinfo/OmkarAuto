using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class JournalEntryList
    {
        public List<FinTransMasterModel> JournalEntList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
