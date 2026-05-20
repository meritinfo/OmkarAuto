using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface IDriverMasterBusiness
    {
        Task<ResponseModel> DriverMasterSave(DriverMasterModel DriverMasterModel);
        Task<ResponseModel> DriverMasterDetailsDelete(RequestModel requestModel);
        Task<DriverMasterList> GetDriverMasterList(DriverMasterListRequest request);
        Task<ResponseModel> ChkDriverDuplicate(RequestModel req);
    }
}
