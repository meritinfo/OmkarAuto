
namespace FleetTrans.Models
{
    public class BrplTransferModel
    {
        public string cardWalletBalance { get; set; }
        public string cmsbalance { get; set; }
        public string message { get; set; }
        public List<TransactionDetails> transactionDetails { get; set; }
        public string transactionId { get; set; }
        public string transferTime { get; set; }
    }
    public class TransactionDetails
    {
        public string amount { get; set; }
        public string transfer { get; set; } 
    }
}
