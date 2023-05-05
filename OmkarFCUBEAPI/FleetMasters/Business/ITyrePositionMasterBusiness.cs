using FleetMasters.Models;

namespace FleetMasters.Business
{
    public interface ITyrePositionMasterBusiness
    {
        Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel);
    }
}
