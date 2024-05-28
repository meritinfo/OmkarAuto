using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface ITransportMasterRepository
    {
        Task<ResponseModel> TransportMasterSave(TransportMasterModel truckMasterModel);
        Task<TransportMasterList> GetTransportMasterList(PageRequest request);
        Task<ResponseModel> TransportMasterDelete(RequestModel requestModel);
        Task<TransportMasterInnerGridListModel> GetTransportMasterInnerGridList(RequestModel request);

    }
}
