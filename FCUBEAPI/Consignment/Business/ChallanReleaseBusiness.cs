using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class ChallanReleaseBusiness: IChallanReleaseBusiness
    {
        readonly IChallanReleaseRepository challanReleaseRepository;
        public ChallanReleaseBusiness(IChallanReleaseRepository _challanReleaseRepository)
        {
            challanReleaseRepository = _challanReleaseRepository;
        }
        public async Task<ChallanReleaseListModel> GetChallanReleaseList(ReportRequestModel request)
        {
            return await challanReleaseRepository.GetChallanReleaseList(request);
        }
        public async Task<ResponseModel> ChallanReleaseSave(ChallanReleaseModel challanReleaseModel)
        {
            return await challanReleaseRepository.ChallanReleaseSave(challanReleaseModel);
        }
        public async Task<ResponseModel> ChallanReleaseDelete(RequestModel requestModel)
        {
            return await challanReleaseRepository.ChallanReleaseDelete(requestModel);
        }
        public async Task<ChallanMasterModel> SearchChallanDetails(ReportRequestModel req)
        {
            return await challanReleaseRepository.SearchChallanDetails(req);
        }
    }
}
