using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IChCostTypesRepository
    {
        Task<ResponseModel> ChCostTypesSave(ChCostTypesModel chCostTypesModel);
        Task<ChCostTypesList> GetChCostTypesList(ReportRequestModel request);
        Task<ResponseModel> ChCostTypesDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateCostDesc(RequestModel requestModel);
    }
}
