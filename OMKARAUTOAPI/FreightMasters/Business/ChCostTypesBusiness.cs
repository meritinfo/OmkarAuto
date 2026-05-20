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
    public class ChCostTypesBusiness: IChCostTypesBusiness
    {
        readonly IChCostTypesRepository  chCostTypesRepository;
        public ChCostTypesBusiness(IChCostTypesRepository _chCostTypesRepository)
        {
            chCostTypesRepository = _chCostTypesRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> ChCostTypesSave(ChCostTypesModel chCostTypesModel)
        {
            return await chCostTypesRepository.ChCostTypesSave(chCostTypesModel);
        }
        public async Task<ChCostTypesList> GetChCostTypesList(ReportRequestModel request)
        {
            return await chCostTypesRepository.GetChCostTypesList(request);
        }
        public async Task<ResponseModel> ChCostTypesDelete(RequestModel requestModel)
        {
            return await chCostTypesRepository.ChCostTypesDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateCostDesc(RequestModel requestModel)
        {
            return await chCostTypesRepository.CheckDuplicateCostDesc(requestModel);
        }
    }
}
