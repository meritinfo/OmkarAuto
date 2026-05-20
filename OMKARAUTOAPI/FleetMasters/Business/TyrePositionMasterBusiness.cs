using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;

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
        public async Task<TyrePositionMasterList> GetTyrePositionMasterList(PageRequest request)
        {
            return await tyrePositionMasterRepository.GetTyrePositionMasterList(request);
        }
        public async Task<ResponseModel> TyrePositionMasterDelete(RequestModel requestModel)
        {
            return await tyrePositionMasterRepository.TyrePositionMasterDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicatePos(RequestModel requestModel)
        {
            return await tyrePositionMasterRepository.CheckDuplicatePos(requestModel);
        }
    }
}
