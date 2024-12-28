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
    public class PanWiseTdsRateBusiness: IPanWiseTdsRateBusiness
    {
        readonly IPanWiseTdsRateRepository panWiseTdsRateRepository;
        public PanWiseTdsRateBusiness(IPanWiseTdsRateRepository _panWiseTdsRateRepository)
        {
            panWiseTdsRateRepository = _panWiseTdsRateRepository;
        }
        public async Task<ResponseModel> PanWiseTdsRateSave(PanWiseTdsRateModel panWiseTdsRateModel)
        {
            return await panWiseTdsRateRepository.PanWiseTdsRateSave(panWiseTdsRateModel);
        }
        public async Task<PanWiseTdsRateList> GetPanWiseTdsRateList(ReportRequestModel request)
        {
            return await panWiseTdsRateRepository.GetPanWiseTdsRateList(request);
        }
        public async Task<ResponseModel> PanWiseTdsRateDelete(RequestModel req)
        {
            return await panWiseTdsRateRepository.PanWiseTdsRateDelete(req);
        }
        public async Task<ResponseModel> ChkPanDuplicate(RequestModel req)
        {
            return await panWiseTdsRateRepository.ChkPanDuplicate(req);
        }
    }
}
