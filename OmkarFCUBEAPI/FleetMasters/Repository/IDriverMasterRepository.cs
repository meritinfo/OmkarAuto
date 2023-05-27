using FleetMasters.Models;


namespace FleetMasters.Repository
{
    public interface IDriverMasterRepository
    {
        Task<ResponseModel> DriverMasterSave(DriverMasterModel driverMasterModel);
    }
}
