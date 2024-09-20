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
    public class VehicleRepairsRptBusiness:IVehicleRepairsRptBusiness
    {
        readonly IVehicleRepairsRptRepository vehicleRepairsRptRepository;
        public VehicleRepairsRptBusiness(IVehicleRepairsRptRepository _vehicleRepairsRptRepository)
        {
            vehicleRepairsRptRepository = _vehicleRepairsRptRepository;
        }

        public async Task<VehicleRepairsRptListModel> GetVehicleRepairsRptList(ReportRequestModel request)
        {
            return await vehicleRepairsRptRepository.GetVehicleRepairsRptList(request);
        }
        public async Task<ResponseModel> GetVehicleRepairsRptExcel(ReportRequestModel request)
        {
            return await vehicleRepairsRptRepository.GetVehicleRepairsRptExcel(request);
        }
    }
}
