using FinTrans.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IJournalEntryBusiness
    {
        Task<ResponseModel> JournalEntrySave(JournalEntryModel journalEntryModel);
        Task<JournalEntryList> GetJournalEntryList(JournalEntryListRequest request);
    }
}