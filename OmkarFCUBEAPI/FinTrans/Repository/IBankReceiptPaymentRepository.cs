using FinTrans.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// bankReceiptPayments service interface methods
    /// </summary>
    public interface IBankReceiptPaymentsRepository
    {
        Task<ResponseModel> BankReceiptPaymentsSave(BankReceiptPaymentsModel bankReceiptPaymentsSave);
        Task<BankReceiptpaymentsList> GetBankReceiptpaymentsList(BankReceiptpaymentsListRequest request);
    }
}