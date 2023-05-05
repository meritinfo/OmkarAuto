using FreightMasters.Models;


namespace FreightMasters.Business
{
    public interface IRatetypesBusiness
    {
        Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel);
    }
}
