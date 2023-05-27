using FreightMasters.Models;


namespace FreightMasters.Business
{
    public interface IRatetypesBusiness
    {
        Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel);
        Task<RateTypesList> GetRateTypesList(RateTypesListRequest request);
    }
}
