using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class TrailBalList
    {
        public List<TrailBalModel> TrailList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
