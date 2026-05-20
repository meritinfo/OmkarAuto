using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface ILRBillSeriesBusiness
    {
        Task<LRBillSeriesMstList> GetLRBillSeriesMasterList(ReportRequestModel request);
        Task<ResponseModel> LRBillSeriesSave(LRBillSeriesModel lRBillSeriesModel);
        Task<ResponseModel> LRBillSeriesMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateSeriesCode(RequestModel requestModel);
    }
}
