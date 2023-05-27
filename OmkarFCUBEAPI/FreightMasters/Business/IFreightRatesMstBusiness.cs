using FreightMasters.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IFreightRatesMstBusiness
    {
        Task<ResponseModel> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel);
    }
}
