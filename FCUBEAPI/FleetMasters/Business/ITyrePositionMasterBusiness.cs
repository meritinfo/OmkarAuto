using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface ITyrePositionMasterBusiness
    {
        Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel);
        Task<TyrePositionMasterList> GetTyrePositionMasterList(PageRequest request);
    }
}
