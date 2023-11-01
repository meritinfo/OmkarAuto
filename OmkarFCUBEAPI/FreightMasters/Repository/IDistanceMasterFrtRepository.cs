

using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterFrtRepository
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel DistanceMasterFrtModel);
        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request);
    }
}
