using FinTrans.Models;
using FinTrans.Repository;

namespace FinTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class JournalEntryBusiness : IJournalEntryBusiness
    {
        readonly IJournalEntryRepository JournalEntryRepository;
        public JournalEntryBusiness(IJournalEntryRepository _journalEntryRepository)
        {
            JournalEntryRepository = _journalEntryRepository;
        }

        /// <summary>
        /// Business method for save  details
        /// </summary>
        /// <param name="FinTransModel"></param>
        public async Task<ResponseModel> JournalEntrySave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            return await JournalEntryRepository.JournalEntrySave(cashReceiptPaymentsModel);
        }
    }
}