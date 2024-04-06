using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IConsignmentRepository
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
        Task<ConsignmentList> GetConsignmentList(PageRequestDtBrVh request);
        Task<ResponseModel> CheckEwaybillExits(RequestModel req);
        Task<ResponseModel> ConsignmentDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetRateList();
        Task<List<DropDownListModel>> GetLocationList();
        Task<List<DropDownListModel>> GetContentList();
        Task<List<DropDownListModel>> GetVehicleNoList();
          Task<ResponseModel> GetKms(KmsModel request);
        Task<ResponseModel> GetTripKms(KmsModel request);
        Task<TripKmsModel> GetTripKms2(KmsModel request);
        Task<ResponseModel> GetDslToBe(DslModel request);
        Task<ResponseModel> GetAdBlueToBe(AdBlueModel request);
        Task<ResponseModel> CheckDuplicateLr(RequestModel request);
        Task<List<DropDownListModel>> GetBillingPartyList();
        Task<List<DropDownListModel>> GetLRSeries(RequestModel req);
        Task<List<DropDownListModel>> GetLRSeriesForBill();
        Task<ResponseModel> GetGcSeries(RequestModel request);
        Task<ResponseModel> GetBillSeries(RequestModel request);
    }
}
