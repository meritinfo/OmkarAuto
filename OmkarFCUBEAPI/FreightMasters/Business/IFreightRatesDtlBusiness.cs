using FreightMasters.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IFreightRatesDtlBusiness
    {
        Task<ResponseModel> FreightRatesDtlSave(FreightRatesDtlModel freightRatesDtlModel);
    }
}
