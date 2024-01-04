using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinTrans.Models;
using FinTrans.Repository;
using Shared.Models;

namespace FinTrans.Business
{
    public class OpBrsEntryBusiness : IOpBrsEntryBusiness
    {
        readonly IOpBrsEntryRepository opBrsEntryRepository;
        public OpBrsEntryBusiness(IOpBrsEntryRepository _opBrsEntryRepository)
        {
            opBrsEntryRepository = _opBrsEntryRepository;
        }
        public async Task<ResponseModel> OpBrsEntrySave(BrsEntryModel opBrsEntryModel)
        {
            return await opBrsEntryRepository.OpBrsEntrySave(opBrsEntryModel);
        }

        public async Task<OpBrsEntryList> GetOpBrsEntryList(PageRequest request)
        {
            return await opBrsEntryRepository.GetOpBrsEntryList(request);
        }
        public async Task<List<DropDownListModel>> GetBankAcList()
        {
            return await opBrsEntryRepository.GetBankAcList();
        }
        public async Task<ResponseModel> OpBrsEntryDelete(Request requestModel)
        {
            return await opBrsEntryRepository.OpBrsEntryDelete(requestModel);
        }
        public async Task<List<DropDownListModel>> GetBankDebitAcList()
        {
            return await opBrsEntryRepository.GetBankDebitAcList();
        }

    }
}
