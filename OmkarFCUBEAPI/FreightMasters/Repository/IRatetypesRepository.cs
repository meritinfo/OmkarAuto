using FreightMasters.Models;
  

namespace FreightMasters.Repository
{
    public interface IRatetypesRepository
    {
        Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel);
    }
}
