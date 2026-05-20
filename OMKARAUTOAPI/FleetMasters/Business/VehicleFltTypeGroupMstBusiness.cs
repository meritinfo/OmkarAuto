using DocumentFormat.OpenXml.Office2016.Excel;
using FleetMasters.Models;
using FleetMasters.Repository;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class VehicleFltTypeGroupMstBusiness: IVehicleFltTypeGroupMstBusiness
    {
        readonly IVehicleFltTypeGroupMstRepository vehicleFltTypeGroupMstRepository;
        public VehicleFltTypeGroupMstBusiness(IVehicleFltTypeGroupMstRepository _vehicleFltTypeGroupMstRepository)
        {
            vehicleFltTypeGroupMstRepository = _vehicleFltTypeGroupMstRepository;
        }
        public async Task<ResponseModel> VehicleFltTypeMstSave(VehicleFltTypeGroupMstModel vehicleFltTypeGroupMstModel)
        {
            return await vehicleFltTypeGroupMstRepository.VehicleFltTypeMstSave(vehicleFltTypeGroupMstModel);
        }
        public async Task<VehicleFltTypeGroupMstList> GetVehicleFltGroupMstList(ReportRequestModel request)
        {
            return await vehicleFltTypeGroupMstRepository.GetVehicleFltGroupMstList(request);
        }
        public async Task<ResponseModel> VehicleFltTypeGroupDelete(RequestModel requestModel)
        {
            return await vehicleFltTypeGroupMstRepository.VehicleFltTypeGroupDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateVehTypeName(RequestModel requestModel)
        {
            return await vehicleFltTypeGroupMstRepository.CheckDuplicateVehTypeName(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateVehTypeCode(RequestModel requestModel)
        {
            return await vehicleFltTypeGroupMstRepository.CheckDuplicateVehTypeCode(requestModel);
        }


    }
}
