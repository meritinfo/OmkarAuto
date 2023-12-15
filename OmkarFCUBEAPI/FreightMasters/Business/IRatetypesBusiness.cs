using FreightMasters.Models;
using Shared.Models;


namespace FreightMasters.Business
{
    public interface IRatetypesBusiness
    {
        Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel);
        Task<RateTypesList> GetRateTypesList(PageRequest request);
    }
}
