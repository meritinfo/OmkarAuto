using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBranchCustomerTargetBusiness
    {
        Task<ResponseModel> BranchCustomerTargetSave(BranchCustomerTargetMstModel branchCustomerTargetMstModel);
        Task<ResponseModel> BranchCustomerTargetDelete(RequestModel requestModel);
        Task<BranchCustomerTargetMstList> GetBranchCustomerTargetMstList(ReportRequestModel request);
        Task<BranchCustomerTargetMstModel> BranchCustomerTargetDtlInnerGridList(RequestModel request);
    }
}
