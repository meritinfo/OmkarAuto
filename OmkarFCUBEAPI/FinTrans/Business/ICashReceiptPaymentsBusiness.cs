using FinTrans.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface ICashReceiptPaymentsBusiness
    {
        Task<ResponseModel> CashReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel);
        Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(CashReceiptPaymentsListRequest request);
    }
}