using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface ICreditNoteEntryBusiness
    {
        Task<ResponseModel> CreditNoteEntrySave(CreditNoteEntryModel creditNoteEntryModel);
        Task<CreditNoteEntryModel> GetCreditNoteBillDetails(ReportRequestModel request);
        Task<CreditNoteList> GetCreditNoteList(ReportRequestModel request);
        Task<ResponseModel> CreditNoteDelete(RequestModel requestModel);
        Task<ResponseModel> GetCreditNoteSlNo(RequestModel requestModel);

    }
}
