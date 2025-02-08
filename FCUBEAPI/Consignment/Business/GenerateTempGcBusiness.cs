using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class GenerateTempGcBusiness : IGenerateTempGcBusiness
    {
        readonly IGenerateTempGcRepository tempGcRepository;
        public GenerateTempGcBusiness(IGenerateTempGcRepository _tempGcRepository)
        {
            tempGcRepository = _tempGcRepository;
        }

        public async Task<TempGcListModel> GetTempgcList(RepReqModel request)
        {
            return await tempGcRepository.GetTempgcList(request);
        }
        public async Task<TempGcModel> GetTempgcInnerGridList(RequestModel request)
        {
            return await tempGcRepository.GetTempgcInnerGridList(request);
        }
        public async Task<ResponseModel> TempgcSave(TempGcModel tempGc)
        {
            return await tempGcRepository.TempgcSave(tempGc);
        }
        public async Task<ResponseModel> TempGcDelete(RequestModel request)
        {
            return await tempGcRepository.TempGcDelete(request);
        }
        public async Task<ResponseModel> SendLRMail(ReportRequestModel request)
        {
            return await tempGcRepository.SendLRMail(request);
        }
        public async Task<ResponseModel> GetLRPdf(ReportRequestModel request)
        {
            return await tempGcRepository.GetLRPdf(request);
        }
        public async Task<ConsignmentModel> GetCnorCneeDetails(RequestModel request)
        {
            return await tempGcRepository.GetCnorCneeDetails(request);
        }
    }
}
