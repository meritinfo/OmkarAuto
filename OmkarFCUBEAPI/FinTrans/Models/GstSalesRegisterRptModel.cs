using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class GstSalesRegisterRptModel
    {
        public string InvoiceDate { get; set; }
        public string InvoiceNo { get; set; }
        public string GSTINofRecepient { get; set; }
        public string PartyName { get; set; }
        public string TaxableValue { get; set; }
        public string CGST { get; set; }
        public string SGST { get; set; }
        public string IGST { get; set; }
        public string TotalValue { get; set; }

    }
}
