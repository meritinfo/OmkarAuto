using FreightMasters.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Destination Master service interface methods
    /// </summary>
    public interface ILR_Bill_SeriesRepository
    {
        Task<ResponseModel> LR_Bill_SeriesDetailsSave(LR_Bill_SeriesModel lr_Bill_SeriesModel);
        Task<LRBillSeriesList> LRBillSeriesList(LRBillSeriesListRequest request);
    }
}
