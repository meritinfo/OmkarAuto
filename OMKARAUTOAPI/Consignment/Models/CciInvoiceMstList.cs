using Shared.Models;

namespace Consignment.Models
{
    public class CciInvoiceMstList
    {
        public List<CciInvoiceMstModel> InvoiceList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
