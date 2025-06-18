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
    public class VehicleInstPmtBusiness: IVehicleInstPmtBusiness
    {
        readonly IVehicleInstPmtRepository vehicleInstPmtRepository;
        public VehicleInstPmtBusiness(IVehicleInstPmtRepository _vehicleInstPmtRepository)
        {
            vehicleInstPmtRepository = _vehicleInstPmtRepository;
        }
        public async Task<ResponseModel> VehicleInstPmtSave(VehicleInstPmtModel vehicleInstPmtModel)
        {
            return await vehicleInstPmtRepository.VehicleInstPmtSave(vehicleInstPmtModel);
        }
        public async Task<VehicleInstPmtList> GetVehicleInstPmtMasterList(ReportRequestModel request)
        {
            return await vehicleInstPmtRepository.GetVehicleInstPmtMasterList(request);
        }
        public async Task<ResponseModel> VehicleInstPmtMasterDelete(RequestModel requestModel)
        {
            return await vehicleInstPmtRepository.VehicleInstPmtMasterDelete(requestModel);
        }
        public async Task<ResponseModel> checkVehicleLoanType(RequestModel requestModel)
        {
            return await vehicleInstPmtRepository.checkVehicleLoanType(requestModel);
        }
        public async Task<List<DropDownListModel>> GetVehicleNoLoan(RequestModel request)
        {
            return await vehicleInstPmtRepository.GetVehicleNoLoan(request);
        }

    }
}
