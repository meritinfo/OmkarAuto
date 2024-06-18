using DocumentFormat.OpenXml.Office2016.Excel;
using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class SparesLubesMasterBusiness: ISparesLubesMasterBusiness
    {
        readonly ISparesLubesMasterRepository sparesLubesMasterRepository;
        public SparesLubesMasterBusiness(ISparesLubesMasterRepository _sparesLubesMasterRepository)
        {
            sparesLubesMasterRepository = _sparesLubesMasterRepository;
        }
        public async Task<ResponseModel> SparesLubesMasterSave(SparesLubesMasterModel sparesLubesMaster)
        {
            return await sparesLubesMasterRepository.SparesLubesMasterSave(sparesLubesMaster);
        }
        public async Task<SparesLubesMasterList> GetSparesLubesMasterList(ReportRequestModel request)
        {
            return await sparesLubesMasterRepository.GetSparesLubesMasterList(request);
        }
        public async Task<ResponseModel> SparesLubesMasterDelete(RequestModel requestModel)
        {
            return await sparesLubesMasterRepository.SparesLubesMasterDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateSpares(RequestModel requestModel)
        {
            return await sparesLubesMasterRepository.CheckDuplicateSpares(requestModel);
        }
    }
}
