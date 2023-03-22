using FreightMasters.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Freight Master service interface methods
    /// </summary>
    public interface IFreightMastersRepository
    {
        Task<ResponseModel> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel);
    }
}
