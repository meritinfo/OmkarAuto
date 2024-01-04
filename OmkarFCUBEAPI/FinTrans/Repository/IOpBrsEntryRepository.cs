using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinTrans.Models;

namespace FinTrans.Repository
{
    public interface IOpBrsEntryRepository
    {
        Task<ResponseModel> OpBrsEntrySave(BrsEntryModel fleetCardMasterModel);
        Task<OpBrsEntryList> GetOpBrsEntryList(PageRequest request);
        Task<List<DropDownListModel>> GetBankAcList();
        Task<List<DropDownListModel>> GetBankDebitAcList();

    }
}
