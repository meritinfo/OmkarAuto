using FinTrans.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// CashReceiptPayments service interface methods
    /// </summary>
    public interface ICashReceiptPaymentsRepository
    {
        Task<ResponseModel> CashReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsSave);
    }
}