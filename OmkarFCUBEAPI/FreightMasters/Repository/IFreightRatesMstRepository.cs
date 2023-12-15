using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Product Master service interface methods
    /// </summary>
    public interface IFreightRatesMstRepository
    {
        Task<ResponseModel> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel);
        Task<FreightRatesMstList> GetFreightRatesList(PageRequest request);
        Task<ResponseModel> FreightRatesMasterDetailsDelete(Request req);
        Task<FreightRatesMstModel> GetFreightRateInnerGridList(Request req);
    }
}