using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDocRenewalRptBusiness
    {
        Task<DocRenewalRptListModel> GetDocRenewalRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelDocRenewalRptList(ReportRequestModel request);

    }
}
