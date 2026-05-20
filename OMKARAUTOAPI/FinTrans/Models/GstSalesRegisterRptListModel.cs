using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FinTrans.Models
{
    public class GstSalesRegisterRptListModel
    {
        public List<GstSalesRegisterRptModel> GstSalesList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
