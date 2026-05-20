
using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Repository
{
    public interface ITyrePositionMasterRepository
    {
        Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel);
        Task<TyrePositionMasterList> GetTyrePositionMasterList(PageRequest request);
        Task<ResponseModel> CheckDuplicatePos(RequestModel requestModel);
        Task<ResponseModel> TyrePositionMasterDelete(RequestModel requestModel);

    }
}
