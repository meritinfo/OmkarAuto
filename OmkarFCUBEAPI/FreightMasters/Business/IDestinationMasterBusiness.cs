using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IDestinationMasterBusiness
    {
        Task<ResponseModel> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel);
        Task<ResponseModel> DestinationDetailsDelete(Request requestModel);
        Task<List<DropDownListModel>> GetStateList();
        Task<DestinationMasterList> GetDestinationMasterList(PageRequest request);
    }
}

