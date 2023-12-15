using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface ICashReceiptPaymentsBusiness
    {
        Task<ResponseModel> CashReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel);
        Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(BankCashListFilterModel request);
        Task<ResponseModel> GetNextDocNo(DocNoFilterModel docNoFilter);
        Task<ResponseModel> CashReceiptPaymentsDelete(Request req);
        Task<CashReceiptPaymentsModel> GetCashReceiptPaymentInnerGridList(Request req);

    }
}