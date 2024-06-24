using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface ITyrePositionMasterBusiness
    {
        Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel);
        Task<TyrePositionMasterList> GetTyrePositionMasterList(PageRequest request);
        Task<ResponseModel> TyrePositionMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicatePos(RequestModel requestModel);
    }
}
