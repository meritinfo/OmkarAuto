using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface IDebitNoteEntryRepository
    {
        Task<ResponseModel> DebitNoteEntrySave(DebitNoteEntryModel debitNoteEntryModel);
        Task<ResponseModel> GetDebitSlNo(RequestModel requestModel);
      
        Task<DebitNoteEntryList> GetDebitNoteList(ReportRequestModel request);
        Task<ResponseModel> DebitNoteDelete(RequestModel requestModel);

    }
}
