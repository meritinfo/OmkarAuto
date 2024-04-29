using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IDprVehiPlacedRepository
    {
        Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request);
        Task<ResponseModel> DprMasterDelete(RequestModel requestModel);
    }
}
