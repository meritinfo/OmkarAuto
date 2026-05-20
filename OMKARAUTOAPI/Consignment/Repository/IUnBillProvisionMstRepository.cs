using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IUnBillProvisionMstRepository
    {
        Task<ResponseModel> UnBillProvisionMstSave(UnBillProvisionMstModel unBillProvisionMstModel);
        Task<UnBillProvisionMstModel> GetUnBillProvisionMstGridList(RequestModel request);
        Task<UnBillProvisionMstList> GetUnBillProvisionMstList(ReportRequestModel request);
        Task<ResponseModel> UnBillProvisionMstDelete(RequestModel requestModel);

        Task<UnBillProvisionMstModel> GetUnBillProvisonSearchList(ReportRequestModel request);
    }
}
