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
    }

}
