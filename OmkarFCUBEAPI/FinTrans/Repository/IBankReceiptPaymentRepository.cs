using FinTrans.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// bankReceiptPayments service interface methods
    /// </summary>
    public interface IBankReceiptPaymentsRepository
    {
        Task<ResponseModel> BankReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsSave);
        Task<BankReceiptpaymentsList> GetBankReceiptpaymentsList(BankReceiptpaymentsListRequest request);
    }
}