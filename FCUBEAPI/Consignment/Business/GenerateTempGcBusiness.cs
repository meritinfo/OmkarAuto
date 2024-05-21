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

        public async Task<TempGcListModel> GetTempgcList(ReportRequestModel request)
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
    }
}
