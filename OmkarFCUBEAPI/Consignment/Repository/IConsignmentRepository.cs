using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IConsignmentRepository
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
        Task<ConsignmentList> GetConsignmentList(PageRequest request);
        Task<List<DropDownListModel>> GetRateList();
        Task<List<DropDownListModel>> GetLocationList();
        Task<List<DropDownListModel>> GetContentList();
        Task<List<DropDownListModel>> GetVehicleNoList();
          Task<ResponseModel> GetKms(KmsModel request);
        Task<ResponseModel> GetTripKms(KmsModel request);
        Task<TripKmsModel> GetTripKms2(KmsModel request);
        Task<ResponseModel> GetDslToBe(DslModel request);
        Task<ResponseModel> GetAdBlueToBe(AdBlueModel request);
        Task<ResponseModel> CheckDuplicateLr(GcModel request);
        Task<List<DropDownListModel>> GetBillingPartyList();
        Task<List<DropDownListModel>> GetLRSeries();
        Task<ResponseModel> GetGcSeries(GcModel request);
    }
}
