using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class VehicleAdvBalReceiptMstLLPBusiness: IVehicleAdvBalReceiptMstLLPBusiness
    {
        readonly IVehicleAdvBalReceiptMstLLPRepository vehicleAdvBalReceiptMstLLPRepository;
        public VehicleAdvBalReceiptMstLLPBusiness(IVehicleAdvBalReceiptMstLLPRepository _vehicleAdvBalReceiptMstRepository)
        {
            vehicleAdvBalReceiptMstLLPRepository = _vehicleAdvBalReceiptMstRepository;
        }
        public async Task<ResponseModel> VehicleAdvBalReceiptMstSaveLLP(VehicleAdvBalReceiptMstLLPModel vehicleAdvBalReceiptMstModel)
        {
            return await vehicleAdvBalReceiptMstLLPRepository.VehicleAdvBalReceiptMstSaveLLP(vehicleAdvBalReceiptMstModel);
        }
        public async Task<VehicleAdvBalReceiptMstLLPList> GetVehicleAdvBalReceiptMstListLLP(PageFromDtToDtRequest request)
        {

            return await vehicleAdvBalReceiptMstLLPRepository.GetVehicleAdvBalReceiptMstListLLP(request);
        }
        public async Task<VehicleAdvBalReceiptMstLLPModel> GetVehicleAdvBalReceiptMstInnerGridListLLP(RequestModel request)
        {

            return await vehicleAdvBalReceiptMstLLPRepository.GetVehicleAdvBalReceiptMstInnerGridListLLP(request);
        }
        public async Task<VehicleAdvBalReceiptMstLLPModel> GetVehicleAdvBalTripDetailsLLP(RequestModel request)
        {
            return await vehicleAdvBalReceiptMstLLPRepository.GetVehicleAdvBalTripDetailsLLP(request);
        }
        public async Task<ResponseModel> VehicleAdvBalReceiptMstDeleteLLP(RequestModel req)
        {

            return await vehicleAdvBalReceiptMstLLPRepository.VehicleAdvBalReceiptMstDeleteLLP(req);
        }

    }
}
