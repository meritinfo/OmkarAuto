
namespace FinTrans.Models
{
    public class BankCashListFilterModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public string Search { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Branch { get; set; }
        public string ReceiptOrPayment { get; set; }
    }
}
