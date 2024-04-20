using FreightMasters.Models;
using Shared.Models;


namespace FreightMasters.Repository
{
    public interface IRatetypesRepository
    {
        Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel);
        Task<RateTypesList> GetRateTypesList(PageRequest request);
    }
}
