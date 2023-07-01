using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class BranchMasterBusiness : IBranchMasterBusiness
    {
        readonly IBranchMasterRepository freightMastersRepository;
        public BranchMasterBusiness(IBranchMasterRepository _freightMastersRepository)
        {
            freightMastersRepository = _freightMastersRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel branchMasterModel)
        {
            return await freightMastersRepository.BranchMasterDetailsSave(branchMasterModel);
        }

        /// <summary>
        /// Business method for get brqanch list
        /// </summary>
        public async Task<List<BranchListModel>> GetBranchList()
        {
            return await freightMastersRepository.GetBranchList();
        }
        public async Task<BranchMasterList> GetBranchMasterList(BranchMasterListRequest request)
        {
            return await freightMastersRepository.GetBranchMasterList(request);
        }

    }
}
