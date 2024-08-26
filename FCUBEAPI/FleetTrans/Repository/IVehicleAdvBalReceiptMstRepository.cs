using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IVehicleAdvBalReceiptMstRepository
    {
        Task<VehicleAdvBalReceiptMstList> GetVehicleAdvBalReceiptMstList(PageFromDtToDtRequest request);
        Task<ResponseModel> VehicleAdvBalReceiptMstSave(VehicleAdvBalReceiptMstModel vehicleAdvBalReceiptMstModel);
        Task<VehicleAdvBalReceiptMstModel> GetVehicleAdvBalReceiptMstInnerGridList(RequestModel request);
        Task<ResponseModel> VehicleAdvBalReceiptMstDelete(RequestModel req);

    }
       
}
