using Consignment.Models;
using Consignment.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class DebitNoteEntryBusiness: IDebitNoteEntryBusiness
    {
        readonly IDebitNoteEntryRepository debitNoteEntryRepository;
        public DebitNoteEntryBusiness(IDebitNoteEntryRepository _debitNoteEntryRepository)
        {
            debitNoteEntryRepository = _debitNoteEntryRepository;
        }
        public async Task<ResponseModel> DebitNoteEntrySave(DebitNoteEntryModel debitNoteEntryModel)
        {
            return await debitNoteEntryRepository.DebitNoteEntrySave(debitNoteEntryModel);
        }
        public async Task<DebitNoteEntryList> GetDebitNoteList(ReportRequestModel request)
        {
            return await debitNoteEntryRepository.GetDebitNoteList(request);
        }
        public async Task<ResponseModel> DebitNoteDelete(RequestModel requestModel)
        {
            return await debitNoteEntryRepository.DebitNoteDelete(requestModel);
        }
        public async Task<ResponseModel> GetDebitSlNo(RequestModel requestModel)
        {
            return await debitNoteEntryRepository.GetDebitSlNo(requestModel);
        }
    }
}
