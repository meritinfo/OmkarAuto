using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IVehicleAdvBalReceiptMstLLPRepository
    {
        Task<VehicleAdvBalReceiptMstLLPList> GetVehicleAdvBalReceiptMstListLLP(PageFromDtToDtRequest request);
        Task<ResponseModel> VehicleAdvBalReceiptMstSaveLLP(VehicleAdvBalReceiptMstLLPModel vehicleAdvBalReceiptMstModel);
        Task<VehicleAdvBalReceiptMstLLPModel> GetVehicleAdvBalReceiptMstInnerGridListLLP(RequestModel request);
        Task<VehicleAdvBalReceiptMstLLPModel> GetVehicleAdvBalTripDetailsLLP(RequestModel request);
        Task<ResponseModel> VehicleAdvBalReceiptMstDeleteLLP(RequestModel req);
    }
}
