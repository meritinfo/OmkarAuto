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
        Task<ResponseModel> DistanceMasterFrtDelete(RequestModel requestModel);
        Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel);
        Task<List<DropDownListModel>> GetDistancefrtFromLocationList();
        Task<DistanceFrtEditModel> GetDistanceFrtDtls(RequestModel request);
        Task<DistanceFrtEditModel> GetDistanceFrtEditDetails(DistanceFrtEditModel distanceFrtEdit);
        Task<ResponseModel> DistanceFrtEditDetailsSave(DistanceFrtEditModel distanceFrtEdit);

    }
}
