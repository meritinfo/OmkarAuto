using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// bankReceiptPayments service interface methods
    /// </summary>
    public interface IJournalEntryRepository
    {
        Task<ResponseModel> JournalEntrySave(JournalEntryModel journalEntryModel);
        Task<JournalEntryList> GetJournalEntryList(PageRequest request);
    }
}