

using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterFrtRepository
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel DistanceMasterFrtModel);
    }
}
