using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class CreditNoteEntryBusiness: ICreditNoteEntryBusiness
    {
        readonly ICreditNoteEntryRepository creditNoteEntryRepository;
        public CreditNoteEntryBusiness(ICreditNoteEntryRepository _creditNoteEntryRepository)
        {
            creditNoteEntryRepository = _creditNoteEntryRepository;
        }
        public async Task<ResponseModel> CreditNoteEntrySave(CreditNoteEntryModel creditNoteEntryModel)
        {
            return await creditNoteEntryRepository.CreditNoteEntrySave(creditNoteEntryModel);
        }
        public async Task<CreditNoteEntryModel> GetCreditBillDetails(ReportRequestModel request)
        {
            return await creditNoteEntryRepository.GetCreditBillDetails(request);
        }
        public async Task<CreditNoteList> GetCreditNoteList(ReportRequestModel request)
        {
            return await creditNoteEntryRepository.GetCreditNoteList(request);
        }
        public async Task<ResponseModel> CreditNoteDelete(RequestModel requestModel)
        {
            return await creditNoteEntryRepository.CreditNoteDelete(requestModel);
        }
        public async Task<ResponseModel> GetCreditSlNo(RequestModel requestModel)
        {
            return await creditNoteEntryRepository.GetCreditSlNo(requestModel);
        }

    }
}
