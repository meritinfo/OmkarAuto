

using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterFrtRepository
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel DistanceMasterFrtModel);
        Task<ResponseModel> ChkdistanceFrtValidity(DistanceMasterFrtModel DistanceMasterFrtModel);
        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(PageRequest request);
        Task<ResponseModel> DistanceMasterFrtDelete(Request requestModel);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request);
    }
}
