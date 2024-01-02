using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// CashReceiptPayments service interface methods
    /// </summary>
    public interface ICashReceiptPaymentsRepository
    {
        Task<ResponseModel> CashReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsSave);
        Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(BankCashListFilterModel request);
        Task<ResponseModel> GetNextDocNo(DocNoFilterModel docNoFilter);
        Task<ResponseModel> CashReceiptPaymentsDelete(Request req);
        Task<CashReceiptPaymentsModel> GetCashReceiptPaymentInnerGridList(Request req);
        Task<List<DropDownListModel>> GetCashBankAccountList(Request request);

    }
}