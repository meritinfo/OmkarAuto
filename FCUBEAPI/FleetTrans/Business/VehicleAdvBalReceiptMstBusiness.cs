using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class VehicleAdvBalReceiptMstBusiness: IVehicleAdvBalReceiptMstBusiness
    {
        readonly IVehicleAdvBalReceiptMstRepository vehicleAdvBalReceiptMstRepository;
        public VehicleAdvBalReceiptMstBusiness(IVehicleAdvBalReceiptMstRepository _vehicleAdvBalReceiptMstRepository)
        {
            vehicleAdvBalReceiptMstRepository = _vehicleAdvBalReceiptMstRepository;
        }
        public async Task<ResponseModel> VehicleAdvBalReceiptMstSave(VehicleAdvBalReceiptMstModel vehicleAdvBalReceiptMstModel)
        {

            return await vehicleAdvBalReceiptMstRepository.VehicleAdvBalReceiptMstSave(vehicleAdvBalReceiptMstModel);
        }
        public async  Task<VehicleAdvBalReceiptMstList> GetVehicleAdvBalReceiptMstList(PageFromDtToDtRequest request)
        {

            return await vehicleAdvBalReceiptMstRepository.GetVehicleAdvBalReceiptMstList(request);
        }
        public async Task<VehicleAdvBalReceiptMstModel> GetVehicleAdvBalReceiptMstInnerGridList(RequestModel request)
        {

            return await vehicleAdvBalReceiptMstRepository.GetVehicleAdvBalReceiptMstInnerGridList(request);
        }
        public async Task<ResponseModel> VehicleAdvBalReceiptMstDelete(RequestModel req)
        {

            return await vehicleAdvBalReceiptMstRepository.VehicleAdvBalReceiptMstDelete(req);
        }
    }

}
