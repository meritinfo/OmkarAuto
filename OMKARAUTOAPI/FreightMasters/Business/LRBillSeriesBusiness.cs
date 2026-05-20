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
    public class LRBillSeriesBusiness: ILRBillSeriesBusiness
    {
        readonly ILRBillSeriesRepository lrBillSeriesRepository;
        public LRBillSeriesBusiness(ILRBillSeriesRepository _lrBillSeriesRepository)
        {
            lrBillSeriesRepository = _lrBillSeriesRepository;
        }
        public async Task<ResponseModel> LRBillSeriesSave(LRBillSeriesModel lRBillSeriesModel)
        {
            return await lrBillSeriesRepository.LRBillSeriesSave(lRBillSeriesModel);
        }
        public async Task<ResponseModel> LRBillSeriesMasterDelete(RequestModel requestModel)
        {
            return await lrBillSeriesRepository.LRBillSeriesMasterDelete(requestModel);
        }
        public async Task<LRBillSeriesMstList> GetLRBillSeriesMasterList(ReportRequestModel request)
        {
            return await lrBillSeriesRepository.GetLRBillSeriesMasterList(request);
        }
        public async Task<ResponseModel> CheckDuplicateSeriesCode(RequestModel requestModel)
        {
            return await lrBillSeriesRepository.CheckDuplicateSeriesCode(requestModel);
        }
    }
}
