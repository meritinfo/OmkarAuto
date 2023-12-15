using FleetMasters.Models;
using Shared.Models;


namespace FleetMasters.Repository
{
    public interface IDriverMasterRepository
    {
        Task<ResponseModel> DriverMasterSave(DriverMasterModel driverMasterModel);
        Task<ResponseModel> DriverMasterDetailsDelete(Request requestModel);
        Task<DriverMasterList> GetDriverMasterList(PageRequest request);
    }
}
