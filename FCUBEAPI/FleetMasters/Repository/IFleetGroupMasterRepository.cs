using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface IFleetGroupMasterRepository
    {
        Task<ResponseModel> FleetGroupMasterSave(FleetGroupMasterModel fleetGroupMasterModel);
        Task<FleetGroupMasterList> GetFleetGroupMasterList(PageRequest request);
        Task<ResponseModel> chkDesGroup(RequestModel req);
        Task<ResponseModel> FleetGroupMasterDelete(RequestModel req);

    }
}

