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
    public class TransportMasterBusiness: ITransportMasterBusiness
    {
        readonly ITransportMasterRepository transportMasterRepository;
        public TransportMasterBusiness(ITransportMasterRepository _transportMasterRepository)
        {
            transportMasterRepository = _transportMasterRepository;
        }
        public async Task<ResponseModel> TransportMasterSave(TransportMasterModel transportMasterModel)
        {
            return await transportMasterRepository.TransportMasterSave(transportMasterModel);
        }
        public async Task<TransportMasterList> GetTransportMasterList(PageRequest request)
        {
            return await transportMasterRepository.GetTransportMasterList(request);
        }
        public async Task<ResponseModel> TransportMasterDelete(RequestModel request)
        {
            return await transportMasterRepository.TransportMasterDelete(request);
        }
        public async Task<TransportMasterInnerGridListModel> GetTransportMasterInnerGridList(RequestModel request)
        {
            return await transportMasterRepository.GetTransportMasterInnerGridList(request);
        }
    }
}
