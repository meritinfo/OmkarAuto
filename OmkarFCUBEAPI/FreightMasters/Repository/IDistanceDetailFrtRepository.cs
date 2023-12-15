using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceDetailFrtRepository
    {
        Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel DistanceDetailFrtModel);

    }
}
