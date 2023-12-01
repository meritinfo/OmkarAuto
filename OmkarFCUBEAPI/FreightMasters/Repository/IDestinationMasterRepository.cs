using FreightMasters.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Destination Master service interface methods
    /// </summary>
    public interface IDestinationMasterRepository
    {
        Task<ResponseModel> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel);
        Task<ResponseModel> DestinationDetailsDelete(Request requestModel);
        Task<List<StateListModel>> GetStateList();
        Task<DestinationMasterList> GetDestinationMasterList(DestinationMasterListRequest request);
    }
}
