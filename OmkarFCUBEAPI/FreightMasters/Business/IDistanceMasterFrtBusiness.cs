using FreightMasters.Models;

namespace FreightMasters.Business
{
    public interface IDistanceMasterFrtBusiness
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel);
    }
}
