
using FleetMasters.Models;

namespace FleetMasters.Repository
{
    public interface ITyrePositionMasterRepository
    {
        Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel);
    }
}
