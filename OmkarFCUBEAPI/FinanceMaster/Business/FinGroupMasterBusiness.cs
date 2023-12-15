using FinanceMaster.Models;
using FinanceMasters.Models;
using FinanceMasters.Repository;
using Shared.Models;

namespace FinanceMasters.Business
{
    public class FinGroupMasterBusiness : IFinGroupMasterBusiness
    {
        readonly IFinGroupMasterRepository finGroupMasterRepository;
        public FinGroupMasterBusiness(IFinGroupMasterRepository _finGroupMasterRepository)
        {
            finGroupMasterRepository = _finGroupMasterRepository;
        }

        /// <summary>
        /// Business method for save Fin Account Master  details
        /// </summary>
        /// <param name="finGroupMasterModel"></param>
        public async Task<ResponseModel> FinGroupMasterSave(FinGroupMasterModel finGroupMasterModel)
        {
            return await finGroupMasterRepository.FinGroupMasterSave(finGroupMasterModel);
        }
        public async Task<FinGroupMasterList> GetFinGroupMasterList(PageRequest request)
        {
            return await finGroupMasterRepository.GetFinGroupMasterList(request);
        }

        public async Task<List<DropDownListModel>> GetAccountTypeList()
        {
            return await finGroupMasterRepository.GetAccountTypeList();
        }

        public async Task<List<DropDownListModel>> GetSubAccountTypeList(Request req)
        {
            return await finGroupMasterRepository.GetSubAccountTypeList(req);
        }

        public async Task<List<DropDownListModel>> GetScheduleList()
        {
            return await finGroupMasterRepository.GetScheduleList();
        }

        public async Task<ResponseModel> chkActName(Request req)
        {
            return await finGroupMasterRepository.chkActName(req);
        }
        public async Task<ResponseModel> FinGroupDetailsDelete(Request req)
        {
            return await finGroupMasterRepository.FinGroupDetailsDelete(req);
        }
    }
}
