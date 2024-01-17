using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Destination Master service interface methods
    /// </summary>
    public interface IDestinationMasterRepository
    {
        Task<ResponseModel> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel);
        Task<ResponseModel> DestinationDetailsDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetStateList();
        Task<DestinationMasterList> GetDestinationMasterList(PageRequest request);
    }
}
