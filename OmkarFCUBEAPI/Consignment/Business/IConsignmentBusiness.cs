using Consignment.Models;
namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IConsignmentBusiness
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
        Task<ConsignmentList> GetConsignmentList(ConsignmentListRequest request);
        Task<List<RateListModel>> GetRateList();
        Task<List<BranchListModel>> GetLocationList();
        Task<List<BranchListModel>> GetContentList();
        Task<List<BranchListModel>> GetVehicleNoList();
        Task<ResponseModel> GetKms(KmsModel request);
        Task<ResponseModel> GetTripKms(KmsModel request);
        Task<TripKmsModel> GetTripKms2(KmsModel request);
        Task<ResponseModel> GetDslToBe(DslModel request);
        Task<ResponseModel> GetAdBlueToBe(AdBlueModel request);
        Task<ResponseModel> CheckDuplicateLr(GcModel request);
        Task<List<LrSeriesListModel>> GetLRSeries();
        Task<ResponseModel> GetGcSeries();
        Task<List<BranchListModel>> GetBillingPartyList();
    }

}
