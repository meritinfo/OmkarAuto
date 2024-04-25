

using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterFrtRepository
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel DistanceMasterFrtModel);
        Task<ResponseModel> ChkdistanceFrtValidity(DistanceMasterFrtModel DistanceMasterFrtModel);
        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(ReportRequestModel request);
        Task<ResponseModel> DistanceMasterFrtDelete(RequestModel requestModel);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(RequestModel request);
        Task<List<DropDownListModel>> GetDistancefrtFromLocationList();
        Task<DistanceFrtEditModel> GetDistanceFrtDtls(RequestModel request);
        Task<DistanceFrtEditModel> GetDistanceFrtEditDetails(DistanceFrtEditModel distanceFrtEdit);
        Task<ResponseModel> DistanceFrtEditDetailsSave(DistanceFrtEditModel distanceFrtEdit);
    }
}
