using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class CashReceiptPaymentsList
    {
        public List<CashReceiptPaymentsModel> CashRecPaymentsList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
