using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface IFleetGodownMasterRepository
    {
        Task<FleetGodownMasterList> GetFleetGodownMaserList(PageRequest request);
        Task<ResponseModel> FleetGodownMaserSave(FleetGodownMasterModel fleetGodown);
        Task<ResponseModel> FleetGodownMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateGodownShortCode(RequestModel request);
        Task<ResponseModel> CheckDuplicateGodownDesc(RequestModel request);

    }
}
