using FleetMasters.Models;
using FleetMasters.Repository;

namespace FleetMasters.Business
{
    public class TyrePositionMasterBusiness : ITyrePositionMasterBusiness
    {
        readonly ITyrePositionMasterRepository tyrePositionMasterRepository;
        public TyrePositionMasterBusiness(ITyrePositionMasterRepository _tyrePositionMasterRepository)
        {
            tyrePositionMasterRepository = _tyrePositionMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="tyrePositionMasterModel"></param>
        public async Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel)
        {
            return await tyrePositionMasterRepository.TyrePositionMasterSave(tyrePositionMasterModel);
        }
    }
}
