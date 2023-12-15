

using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    public interface IDistanceDetailFrtBusiness
    {
        Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel);
    }
}
