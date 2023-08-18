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
        Task<ResponseModel> GetVehicleNoForEwayBill(VehicleModel request);
        Task<List<LrSeriesListModel>> GetLRSeries();
        Task<List<BranchListModel>> GetBillingPartyList();
    }

}
