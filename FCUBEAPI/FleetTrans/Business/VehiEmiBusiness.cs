using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class VehiEmiBusiness : IVehiEmiBusiness
    {
        readonly IVehiEmiRepository vehiEmiRepository;
        public VehiEmiBusiness(IVehiEmiRepository _vehiEmiRepository)
        {
            vehiEmiRepository = _vehiEmiRepository;
        }
        public async Task<VehicleInstScheduleListModel> GetVehicleInstScheduleList(ReportRequestModel request)
        {
            return await vehiEmiRepository.GetVehicleInstScheduleList(request);
        }
        public async Task<VehicleInstScheduleModel> GetVehicleInstScheduleInnerGridList(RequestModel request)
        {
            return await vehiEmiRepository.GetVehicleInstScheduleInnerGridList(request);
        }
        public async Task<ResponseModel> VehicleInstScheduleMstSave(VehicleInstScheduleModel vehicleInst)
        {
            return await vehiEmiRepository.VehicleInstScheduleMstSave(vehicleInst);
        }
        public async Task<ResponseModel> VehicleInstScheduleDelete(RequestModel req)
        {
            return await vehiEmiRepository.VehicleInstScheduleDelete(req);
        }

    }
}
