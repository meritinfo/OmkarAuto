using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class RatetypesBusiness : IRatetypesBusiness
    {
        readonly IRatetypesRepository  freightMastersRepository;
        public RatetypesBusiness(IRatetypesRepository _freightMastersRepository)
        {
            freightMastersRepository = _freightMastersRepository;
        }

        /// <summary>
        /// Business method for save destination master details
        /// </summary>
        /// <param name="ratetypesModel"></param>
        public async Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel)
        {
            return await freightMastersRepository.RatetypesDetailsSave(ratetypesModel);
        }
        public async Task<RateTypesList> GetRateTypesList(RateTypesListRequest request)
        {
            return await freightMastersRepository.GetRateTypesList(request);
        }
    }
}
