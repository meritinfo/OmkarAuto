using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    public interface IDistanceMasterFrtBusiness
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel);
        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(PageRequest request);
        //  Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request);

    }
}
