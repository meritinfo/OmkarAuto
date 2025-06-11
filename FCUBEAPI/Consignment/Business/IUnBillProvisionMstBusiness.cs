using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IUnBillProvisionMstBusiness
    {
        Task<ResponseModel> UnBillProvisionMstSave(UnBillProvisionMstModel unBillProvisionMstModel);
        Task<UnBillProvisionMstModel> GetUnBillProvisionMstGridList(RequestModel request);
        Task<UnBillProvisionMstList> GetUnBillProvisionMstList(ReportRequestModel request);
        Task<ResponseModel> UnBillProvisionMstDelete(RequestModel requestModel);
        Task<UnBillProvisionMstModel> GetUnBillProvisonSearchList(ReportRequestModel request);
    }
}
