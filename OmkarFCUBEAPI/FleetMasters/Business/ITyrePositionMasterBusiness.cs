using FleetMasters.Models;

namespace FleetMasters.Business
{
    public interface ITyrePositionMasterBusiness
    {
        Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel);
        Task<TyrePositionMasterList> GetTyrePositionMasterList(TyrePositionMasterListRequest request);
    }
}
