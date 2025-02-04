using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class RatesMasterNewBusiness: IRatesMasterNewBusiness
    {
        readonly IRatesMasterNewRepository ratesMasterNewRepository;
        public RatesMasterNewBusiness(IRatesMasterNewRepository _ratesMasterNewRepository)
        {
            ratesMasterNewRepository = _ratesMasterNewRepository;
        }
        public async Task<ResponseModel> RatesMasterNewSave(RatesMasterNewModel ratesMasterNewModel)
        {
            return await ratesMasterNewRepository.RatesMasterNewSave(ratesMasterNewModel);
        }
        public async Task<RatesMasterNewList> GetRatesMasterNewList(ReportRequestModel request)
        {
            return await ratesMasterNewRepository.GetRatesMasterNewList(request);
        }
        public async Task<ResponseModel> RatesMasterNewDelete(RequestModel requestModel)

        {
            return await ratesMasterNewRepository.RatesMasterNewDelete(requestModel);

        }
        public async Task<RatesMasterNewModel> GetRatesMasterNewInnerGridList(RequestModel request)
        {
            return await ratesMasterNewRepository.GetRatesMasterNewInnerGridList(request);

        }

    }
}
