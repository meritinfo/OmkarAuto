using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IConsignmentBusiness
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
        Task<ConsignmentList> GetConsignmentList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetRateList();
        Task<List<DropDownListModel>> GetLocationList();
        Task<List<DropDownListModel>> GetContentList();
        Task<List<DropDownListModel>> GetVehicleNoList();
        Task<ResponseModel> CheckEwaybillExits(RequestModel req);
        Task<ResponseModel> ConsignmentDelete(RequestModel requestModel);
        Task<ResponseModel> GetKms(KmsModel request);
        Task<ResponseModel> GetTripKms(KmsModel request);
        Task<TripKmsModel> GetTripKms2(KmsModel request);
        Task<ResponseModel> GetDslToBe(DslModel request);
        Task<ResponseModel> GetAdBlueToBe(AdBlueModel request);
        Task<ResponseModel> CheckDuplicateLr(RequestModel request);
        Task<List<DropDownListModel>> GetLRSeries(RequestModel req);
        Task<List<DropDownListModel>> GetLRSeriesForBill();
        Task<ResponseModel> GetGcSeries(RequestModel request);
        Task<ResponseModel> GetBillSeries(RequestModel request);
        Task<List<DropDownListModel>> GetBillingPartyList();
    }

}
