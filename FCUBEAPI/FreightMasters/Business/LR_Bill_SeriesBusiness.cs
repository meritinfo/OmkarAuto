using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class LR_Bill_SeriesBusiness : ILR_Bill_SeriesBusiness
    {
        readonly ILR_Bill_SeriesRepository freightMastersRepository;
        public LR_Bill_SeriesBusiness(ILR_Bill_SeriesRepository _freightMastersRepository)
        {
            freightMastersRepository = _freightMastersRepository;
        }

        /// <summary>
        /// Business method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        public async Task<ResponseModel> LR_Bill_SeriesDetailsSave(LR_Bill_SeriesModel lr_Bill_SeriesModel)
        {
            return await freightMastersRepository.LR_Bill_SeriesDetailsSave(lr_Bill_SeriesModel);
        }
        public async Task<LRBillSeriesList> LRBillSeriesList(PageRequest request)
        {
            return await freightMastersRepository.LRBillSeriesList(request);
        }
    }
}

