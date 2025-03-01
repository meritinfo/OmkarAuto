using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface ILRBillSeriesRepository
    {
        Task<LRBillSeriesMstList> GetLRBillSeriesMasterList(ReportRequestModel request);
        Task<ResponseModel> LRBillSeriesSave(LRBillSeriesModel lRBillSeriesModel);
        Task<ResponseModel> LRBillSeriesMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateSeriesCode(RequestModel requestModel);
    }
}
