

using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterFrtRepository
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel DistanceMasterFrtModel);
        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(PageRequest request);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request);
    }
}
