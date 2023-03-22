using FreightMasters.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Freight Master service interface methods
    /// </summary>
    public interface IDestinationMasterRepository
    {
        Task<ResponseModel> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel);
    }
}
