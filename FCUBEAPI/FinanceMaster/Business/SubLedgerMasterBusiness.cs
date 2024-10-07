using DocumentFormat.OpenXml.Office2016.Excel;
using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Models;
using FinanceMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
    public class SubLedgerMasterBusiness: ISubLedgerMasterBusiness
    {
        readonly ISubLedgerMasterRepository subLedgerMasterRepository;
        public SubLedgerMasterBusiness(ISubLedgerMasterRepository _subLedgerMasterRepository)
        {
            subLedgerMasterRepository = _subLedgerMasterRepository;
        }
        public async Task<ResponseModel> SubLedgerMasterSave(SubLedgerMasterModel subLedgerMasterModel)
        {
            return await subLedgerMasterRepository.SubLedgerMasterSave(subLedgerMasterModel);
        }
        public async Task<SubLedgerMasterList> GetSubLedgerMasterList(PageFromDtToDtRequest request)
        {
            return await subLedgerMasterRepository.GetSubLedgerMasterList(request);
        }
        public async Task<SubLedgerMasterModel> GetSubLedgerMasterInnerGridList(RequestModel request)
        {
            return await subLedgerMasterRepository.GetSubLedgerMasterInnerGridList(request);
        }
        public async Task<ResponseModel> SubLedgerMasterDelete(RequestModel req)
         {
            return await subLedgerMasterRepository.SubLedgerMasterDelete(req);
    }


}
}
