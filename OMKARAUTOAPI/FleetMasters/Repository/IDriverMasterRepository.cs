using FleetMasters.Models;
using Shared.Models;


namespace FleetMasters.Repository
{
    public interface IDriverMasterRepository
    {
        Task<ResponseModel> DriverMasterSave(DriverMasterModel driverMasterModel);
        Task<ResponseModel> DriverMasterDetailsDelete(RequestModel requestModel);
        Task<DriverMasterList> GetDriverMasterList(DriverMasterListRequest request);
        Task<ResponseModel> ChkDriverDuplicate(RequestModel req);
    }
}
