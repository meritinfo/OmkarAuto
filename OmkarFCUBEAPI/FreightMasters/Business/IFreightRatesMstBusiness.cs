using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IFreightRatesMstBusiness
    {
        Task<ResponseModel> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel);
        Task<FreightRatesMstList> GetFreightRatesList(PageRequest request);
        Task<ResponseModel> FreightRatesMasterDetailsDelete(Request req);
        Task<FreightRatesMstModel> GetFreightRateInnerGridList(Request req);
    }
}
