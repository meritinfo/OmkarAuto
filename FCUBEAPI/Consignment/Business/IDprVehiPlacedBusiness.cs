using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IDprVehiPlacedBusiness
    {
        Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request);
        Task<ResponseModel> DprMasterDelete(RequestModel requestModel);
    }

}
