using FinTrans.Models;
using Org.BouncyCastle.Asn1.Ocsp;
using Shared.Models;
using System.Data;

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
        Task<ResponseModel> CashReceiptPaymentsDelete(RequestModel req);
        Task<CashReceiptPaymentsModel> GetCashReceiptPaymentInnerGridList(RequestModel req);
        Task<List<DropDownListModel>> GetCashBankAccountList(RequestModel request);
        Task<List<DropDownListModel>> GetFinRefTypes();
        Task<DataSet> CashBookReport(CashBookReportRequestModel request);
    }
}