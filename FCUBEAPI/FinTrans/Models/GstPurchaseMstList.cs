
using Shared.Models;

namespace FinTrans.Models
{
    public class GstPurchaseMstList
    {
        public List<GstPurchaseMstModel> GstpurchaseList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
