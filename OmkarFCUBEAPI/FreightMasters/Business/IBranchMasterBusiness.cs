using FreightMasters.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IBranchMasterBusiness
    {
        Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel branchMasterModel);
        Task<List<BranchListModel>> GetBranchList();
       
    }
}

