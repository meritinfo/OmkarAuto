using FreightMasters.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Product Master service interface methods
    /// </summary>
    public interface IFreightRatesDtlRepository
    {
        Task<ResponseModel> FreightRatesDtlSave(FreightRatesDtlModel freightRatesDtlModel);
       
    }
}