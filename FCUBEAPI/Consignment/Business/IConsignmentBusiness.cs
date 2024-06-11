using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IConsignmentBusiness
    {
        Task<ConsignmentList> GetConsignmentList(ReportRequestModel request);
        Task<ConsignmentModel> GetLrInnerGridList(RequestModel request);
        Task<ResponseModel> ConsignmentDelete(RequestModel requestModel);
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
        Task<ResponseModel> GetLrNo(RequestModel req);
        Task<ResponseModel> CheckEwaybillExits(RequestModel req);
        Task<ResponseModel> CheckDuplicateLr(RequestModel request);
        Task<ResponseModel> CheckVehicleNo(RequestModel request);
        Task<ResponseModel> GetKms(KmsModel request);
        Task<List<DropDownListModel>> GetRateList();
        Task<List<DropDownListModel>> GetLocationList();
        Task<List<DropDownListModel>> GetContentList();
        Task<List<DropDownListModel>> GetVehicleNoList();
        Task<List<DropDownListModel>> GetClassList();
        // Task<List<DropDownListModel>> GetVehicleTypeGroupList();
        Task<ResponseModel> GetBillSeries(RequestModel request);
    }

}
