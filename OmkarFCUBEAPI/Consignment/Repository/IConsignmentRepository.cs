using Consignment.Models;

namespace Consignment.Repository
{
    public interface IConsignmentRepository
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
        Task<ConsignmentList> GetConsignmentList(ConsignmentListRequest request);
        Task<List<RateListModel>> GetRateList();
        Task<List<BranchListModel>> GetLocationList();
        Task<List<BranchListModel>> GetVehicleNoList();
        Task<List<BranchListModel>> GetBillingPartyList();
        Task<List<LrSeriesListModel>> GetLRSeries();
    }
}
