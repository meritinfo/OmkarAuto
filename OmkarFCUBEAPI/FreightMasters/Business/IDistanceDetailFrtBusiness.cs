

using FreightMasters.Models;

namespace FreightMasters.Business
{
    public interface IDistanceDetailFrtBusiness
    {
        Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel);
    }
}
