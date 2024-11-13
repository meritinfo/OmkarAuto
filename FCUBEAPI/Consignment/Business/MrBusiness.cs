using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;

namespace Consignment.Business
{
    public class MrBusiness : IMrBusiness
    {
        readonly IMrRepository mrRepository;
        public MrBusiness(IMrRepository _mrRepository)
        {
            mrRepository = _mrRepository;
        }
        public async Task<MrListModel> GetMrMstList(PageFromDtToDtRequest request)
        {
            return await mrRepository.GetMrMstList(request);
        }
        public async Task<List<DropDownListModel>> GetPartyGroupList()
        {
            return await mrRepository.GetPartyGroupList();
        }
        public async Task<MrModel> GetOnAcMrSearchList(DropDownListModel request)
        {
            return await mrRepository.GetOnAcMrSearchList(request);
        }
        public async Task<MrModel> GetBillLRSearchDtls(ReportRequestModel request)
        {
            return await mrRepository.GetBillLRSearchDtls(request);
        }
        public async Task<MrModel> GetMrInnerGridList(RequestModel request)
        {
            return await mrRepository.GetMrInnerGridList(request);
        }
        public async Task<ResponseModel> MrMstDelete(RequestModel request)
        {
            return await mrRepository.MrMstDelete(request);
        }
        public async Task<ResponseModel> MrMstSave(MrModel mr)
        {
            return await mrRepository.MrMstSave(mr);
        }
    }
}
