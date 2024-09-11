using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;

namespace Consignment.Business
{
    public class LorryHireBusiness : ILorryHireBusiness
    {
        readonly ILorryHireRepository lorryHireRepository;
        public LorryHireBusiness(ILorryHireRepository _lorryHireRepository)
        {
            lorryHireRepository = _lorryHireRepository;
        }

        public async Task<LorryHireListModel> GetLorryHirePaymentList(ReportRequestModel request)
        {
            return await lorryHireRepository.GetLorryHirePaymentList(request);
        }
        public async Task<LorryHireMasterModel> GetLorryHireInnerGrid(RequestModel request)
        {
            return await lorryHireRepository.GetLorryHireInnerGrid(request);
        }
        public async Task<ResponseModel> LorryHireMasterSave(LorryHireMasterModel lorryHire)
        {
            return await lorryHireRepository.LorryHireMasterSave(lorryHire);
        }
        public async Task<ResponseModel> LorryHireMasterDelete(RequestModel request)
        {
            return await lorryHireRepository.LorryHireMasterDelete(request);
        }
        public async Task<LorryHireMasterModel> GetChallanLorryhireDetails(ReportRequestModel request)
        {
            return await lorryHireRepository.GetChallanLorryhireDetails(request);
        }
        public async Task<ResponseModel> GetLorryHirePmtNo(RequestModel requestModel)
        {
            return await lorryHireRepository.GetLorryHirePmtNo(requestModel);
        }
        public async Task<ResponseModel> CheckChallanNoExists(RequestModel requestModel)
        {
            return await lorryHireRepository.CheckChallanNoExists(requestModel);
        }
    }
}
