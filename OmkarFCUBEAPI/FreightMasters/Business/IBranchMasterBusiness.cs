using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IBranchMasterBusiness
    {
        Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel branchMasterModel);
        Task<ResponseModel> BranchMasterDetailsDelete(Request requestModel);
        Task<List<DropDownListModel>> GetBranchList();
        Task<BranchMasterList> GetBranchMasterList(PageRequest request);
        Task<ResponseModel> ChkCodeExits(Request req);

    }
}

