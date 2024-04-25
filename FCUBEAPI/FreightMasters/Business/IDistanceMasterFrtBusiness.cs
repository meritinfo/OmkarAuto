using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    public interface IDistanceMasterFrtBusiness
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel);
        Task<ResponseModel> ChkdistanceFrtValidity(DistanceMasterFrtModel distanceMasterFrtModel);

        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(ReportRequestModel request);
        //  Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(RequestModel request);
        Task<ResponseModel> DistanceMasterFrtDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetDistancefrtFromLocationList();
        Task<DistanceFrtEditModel> GetDistanceFrtDtls(RequestModel request);
        Task<DistanceFrtEditModel> GetDistanceFrtEditDetails(DistanceFrtEditModel distanceFrtEdit);
        Task<ResponseModel> DistanceFrtEditDetailsSave(DistanceFrtEditModel distanceFrtEdit);

    }
}
