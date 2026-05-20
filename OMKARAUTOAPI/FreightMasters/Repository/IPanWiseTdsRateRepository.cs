using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IPanWiseTdsRateRepository
    {
        Task<ResponseModel> PanWiseTdsRateSave(PanWiseTdsRateModel panWiseTdsRateModel);
        Task<PanWiseTdsRateList> GetPanWiseTdsRateList(ReportRequestModel request);
        Task<ResponseModel> PanWiseTdsRateDelete(RequestModel req);
        Task<ResponseModel> ChkPanDuplicate(RequestModel req);

    }
}
