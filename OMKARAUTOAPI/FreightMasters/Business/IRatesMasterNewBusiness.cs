using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IRatesMasterNewBusiness
    {
        Task<ResponseModel> RatesMasterNewDelete(RequestModel requestModel);
        Task<ResponseModel> RatesMasterNewSave(RatesMasterNewModel ratesMasterNewModel);
        Task<RatesMasterNewList> GetRatesMasterNewList(ReportRequestModel request);
        Task<RatesMasterNewModel> GetRatesMasterNewInnerGridList(RequestModel request);
    }
}
