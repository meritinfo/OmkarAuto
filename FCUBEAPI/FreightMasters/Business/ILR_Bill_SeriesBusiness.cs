using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface ILR_Bill_SeriesBusiness
    {
        Task<ResponseModel> LR_Bill_SeriesDetailsSave(LR_Bill_SeriesModel lr_Bill_SeriesModel);
        Task<LRBillSeriesList> LRBillSeriesList(PageRequest request);
    }
}

