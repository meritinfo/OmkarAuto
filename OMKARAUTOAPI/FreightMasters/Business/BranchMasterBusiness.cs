using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class BranchMasterBusiness : IBranchMasterBusiness
    {
        readonly IBranchMasterRepository branchMasterRepository;
        public BranchMasterBusiness(IBranchMasterRepository _branchMasterRepository)
        {
            branchMasterRepository = _branchMasterRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel branchMasterModel)
        {
            return await branchMasterRepository.BranchMasterDetailsSave(branchMasterModel);
        }
        public async Task<ResponseModel> BranchMasterDetailsDelete(RequestModel requestModel)
        {
            return await branchMasterRepository.BranchMasterDetailsDelete(requestModel);
        }


        /// <summary>
        /// Business method for get brqanch list
        /// </summary>
        public async Task<List<DropDownListModel>> GetBranchList()
        {
            return await branchMasterRepository.GetBranchList();
        }
        public async Task<BranchMasterList> GetBranchMasterList(PageRequest request)
        {
            return await branchMasterRepository.GetBranchMasterList(request);
        }

        public async Task<ResponseModel> ChkCodeExits(RequestModel req)
        {
            return await branchMasterRepository.ChkCodeExits(req);
        }
        public async Task<ResponseModel> ChkBranchNameExits(RequestModel req)
        {
            return await branchMasterRepository.ChkBranchNameExits(req);
        }


    }
}
