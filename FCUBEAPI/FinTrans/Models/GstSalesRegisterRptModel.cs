using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class GstSalesRegisterRptModel
    {
        public string InvDate { get; set; }
        public string InvNo { get; set; }
        public string AccountGstNo { get; set; }
        public string PartyName { get; set; }
        public string TotSubTotal { get; set; }
        public string CgstAmt { get; set; }
        public string SgstAmt { get; set; }
        public string IgstAmt { get; set; }
        public string TotalBillAmt { get; set; }

    }
}
