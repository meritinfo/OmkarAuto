using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface IDriverMasterBusiness
    {
        Task<ResponseModel> DriverMasterSave(DriverMasterModel DriverMasterModel);
        Task<ResponseModel> DriverMasterDetailsDelete(Request requestModel);
        Task<DriverMasterList> GetDriverMasterList(DriverMasterListRequest request);
    }
}
