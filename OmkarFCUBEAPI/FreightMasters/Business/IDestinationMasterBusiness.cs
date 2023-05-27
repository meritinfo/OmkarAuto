using FreightMasters.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IDestinationMasterBusiness
    {
        Task<ResponseModel> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel);
        Task<List<StateListModel>> GetStateList();
        Task<DestinationMasterList> GetDestinationMasterList(DestinationMasterListRequest request);
    }
}

