using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FreightMasters.Models
{
    public class LRBillSeriesList
    {
        public List<LR_Bill_SeriesModel> lrbillseriesList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
