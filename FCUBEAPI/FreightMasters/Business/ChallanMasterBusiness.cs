using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class ChallanMasterBusiness:IChallanMasterBusiness
    {
        readonly IChallanMasterRepository challanRepository;
        public ChallanMasterBusiness(IChallanMasterRepository _challanRepository)
        {
            challanRepository = _challanRepository;
        }
        public async Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request)
        {
            return await challanRepository.GetChallanMasterList(request);
        }
        public async Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request)
        {
            return await challanRepository.GetChallanInnerGridList(request);
        }
        public async Task<ResponseModel> ChallanMasterSave(ChallanMasterModel challanModel)
        {
            return await challanRepository.ChallanMasterSave(challanModel);
        }
        public async Task<ResponseModel> ChallanMasterDelete(RequestModel request)
        {
            return await challanRepository.ChallanMasterDelete(request);
        }

    }
}
