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
    public class TruckMasterBusiness: ITruckMasterBusiness
    {
        readonly ITruckMasterRepository truckMasterRepository;
        public TruckMasterBusiness(ITruckMasterRepository _truckMasterRepository)
        {
            truckMasterRepository = _truckMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeGroupMasterModel"></param>
        /// 
        public async Task<ResponseModel> TruckMasterSave(TruckMasterModel truckMasterModel)
        {
            return await truckMasterRepository.TruckMasterSave(truckMasterModel);
        }
        public async Task<TruckMasterList> GetTruckMasterList(PageRequest request)
        {
            return await truckMasterRepository.GetTruckMasterList(request);
        }
        public async Task<ResponseModel> TruckMasterDelete(RequestModel request)
        {
            return await truckMasterRepository.TruckMasterDelete(request);
        }

        public async Task<TruckMasterModel> GetTruckMasterDetails(RequestModel request)
        {
            return await truckMasterRepository.GetTruckMasterDetails(request);
        }
    }
}
