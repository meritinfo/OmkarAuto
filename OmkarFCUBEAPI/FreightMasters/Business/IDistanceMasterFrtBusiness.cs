using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    public interface IDistanceMasterFrtBusiness
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel);
        Task<ResponseModel> ChkdistanceFrtValidity(DistanceMasterFrtModel distanceMasterFrtModel);

        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(PageRequestDtBrVh request);
        //  Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request);
        Task<ResponseModel> DistanceMasterFrtDelete(Request requestModel);

    }
}
