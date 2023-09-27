using FinTrans.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IBankReceiptPaymentsBusiness
    {
        Task<ResponseModel> BankReceiptPaymentsSave(BankReceiptPaymentsModel bankReceiptPaymentsModel);
        Task<BankReceiptpaymentsList> GetBankReceiptpaymentsList(BankReceiptpaymentsListRequest request);
    }
}