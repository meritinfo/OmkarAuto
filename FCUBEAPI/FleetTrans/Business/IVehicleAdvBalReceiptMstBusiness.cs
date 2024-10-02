using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IVehicleAdvBalReceiptMstBusiness
    {
        Task<VehicleAdvBalReceiptMstList> GetVehicleAdvBalReceiptMstList(PageFromDtToDtRequest request);
        Task<ResponseModel> VehicleAdvBalReceiptMstSave(VehicleAdvBalReceiptMstModel vehicleAdvBalReceiptMstModel);
        Task<VehicleAdvBalReceiptMstModel> GetVehicleAdvBalReceiptMstInnerGridList(RequestModel request);
        Task<VehicleAdvBalReceiptMstModel> GetVehicleAdvBalTripDetails(RequestModel request);
        Task<ResponseModel> VehicleAdvBalReceiptMstDelete(RequestModel req);
    }
}
