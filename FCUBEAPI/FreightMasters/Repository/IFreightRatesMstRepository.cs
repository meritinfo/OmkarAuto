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
        Task<ResponseModel> FreightRatesMasterDetailsDelete(RequestModel req);
        Task<FreightRatesMstModel> GetFreightRateInnerGridList(RequestModel req);
        Task<List<DropDownListModel>> GetPartyList();
    }
}