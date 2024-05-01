using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface ITruckMasterRepository
    {
        Task<ResponseModel> TruckMasterSave(TruckMasterModel truckMasterModel);
        Task<TruckMasterList> GetTruckMasterList(PageRequest request);

    }
}
