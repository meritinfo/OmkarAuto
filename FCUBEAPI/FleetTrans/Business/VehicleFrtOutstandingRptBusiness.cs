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
    public class VehicleFrtOutstandingRptBusiness: IVehicleFrtOutstandingRptBusiness
    {
        readonly IVehicleFrtOutstandingRptRepository vehicleFrtOutstandingRptRepository;
        public VehicleFrtOutstandingRptBusiness(IVehicleFrtOutstandingRptRepository _vehicleFrtOutstandingRptRepository)
        {
            vehicleFrtOutstandingRptRepository = _vehicleFrtOutstandingRptRepository;
        }

        public async Task<VehicleFrtOutstandingRptListModel> GetVehicleFrtOutstandingRptList(ReportRequestModel request)
        {
            return await vehicleFrtOutstandingRptRepository.GetVehicleFrtOutstandingRptList(request);
        }
        public async Task<ResponseModel> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request)
        {
            return await vehicleFrtOutstandingRptRepository.GetVehicleFrtOutstandingRptExcel(request);
        }
    }
}
