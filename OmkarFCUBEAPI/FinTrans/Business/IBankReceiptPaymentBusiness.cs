using FinTrans.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IBankReceiptPaymentsBusiness
    {
        Task<ResponseModel> BankReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel);
        Task<BankReceiptpaymentsList> GetBankReceiptpaymentsList(BankReceiptpaymentsListRequest request);
    }
}