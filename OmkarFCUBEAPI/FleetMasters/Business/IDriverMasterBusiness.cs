

using FleetMasters.Models;

namespace FleetMasters.Business
{
    public interface IDriverMasterBusiness
    {
        Task<ResponseModel> DriverMasterSave(DriverMasterModel DriverMasterModel);
        Task<DriverMasterList> GetDriverMasterList(DriverMasterListRequest request);
    }
}
