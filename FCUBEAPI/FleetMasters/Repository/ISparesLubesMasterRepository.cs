using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface ISparesLubesMasterRepository
    {
        Task<ResponseModel> SparesLubesMasterSave(SparesLubesMasterModel sparesLubesMasterModel);
        Task<SparesLubesMasterList> GetSparesLubesMasterList(ReportRequestModel request);
        Task<ResponseModel> SparesLubesMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateSpares(RequestModel requestModel);

    }
}
