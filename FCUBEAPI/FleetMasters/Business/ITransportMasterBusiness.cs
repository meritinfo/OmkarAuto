using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public interface ITransportMasterBusiness
    {
        Task<ResponseModel> TransportMasterSave(TransportMasterModel transportMasterModel);
        Task<TransportMasterList> GetTransportMasterList(PageRequest request);



    }
}
