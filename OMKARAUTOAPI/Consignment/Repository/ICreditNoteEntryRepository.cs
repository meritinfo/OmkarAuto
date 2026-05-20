using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface ICreditNoteEntryRepository
    {
        Task<ResponseModel> CreditNoteEntrySave(CreditNoteEntryModel creditNoteEntryModel);
        Task<ResponseModel> GetCreditNoteSlNo(RequestModel requestModel);
        Task<CreditNoteEntryModel> GetCreditNoteBillDetails(ReportRequestModel request);
        Task<CreditNoteList> GetCreditNoteList(ReportRequestModel request);
        Task<ResponseModel> CreditNoteDelete(RequestModel requestModel);
    }
}
