using FleetTrans.Models;


using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class DocRenewalRptBusiness : IDocRenewalRptBusiness
    {
        readonly IDocRenewalRptRepository docRenewalRptRepository;
        public DocRenewalRptBusiness(IDocRenewalRptRepository _docRenewalRptRepository)
        {
            docRenewalRptRepository = _docRenewalRptRepository;
        }

        public async Task<DocRenewalRptListModel> GetDocRenewalRptList(ReportRequestModel request)
        {
            return await docRenewalRptRepository.GetDocRenewalRptList(request);
        }
        public async Task<ResponseModel> ExcelDocRenewalRptList(ReportRequestModel request)
        {
            return await docRenewalRptRepository.ExcelDocRenewalRptList(request);
        }
    }
}

