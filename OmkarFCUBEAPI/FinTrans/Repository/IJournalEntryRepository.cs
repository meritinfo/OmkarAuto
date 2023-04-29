using FinTrans.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// bankReceiptPayments service interface methods
    /// </summary>
    public interface IJournalEntryRepository
    {
        Task<ResponseModel> JournalEntrySave(CashReceiptPaymentsModel cashReceiptPaymentsSave);
    }
}