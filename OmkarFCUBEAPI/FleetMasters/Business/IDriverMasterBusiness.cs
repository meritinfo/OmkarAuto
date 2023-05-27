

using FleetMasters.Models;

namespace FleetMasters.Business
{
    public interface IDriverMasterBusiness
    {
        Task<ResponseModel> DriverMasterSave(DriverMasterModel DriverMasterModel);
    }
}
