using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IBranchCustomerTargetRepository
    {
        Task<ResponseModel> BranchCustomerTargetSave(BranchCustomerTargetMstModel branchCustomerTargetMstModel);
        Task<ResponseModel> BranchCustomerTargetDelete(RequestModel requestModel);
        Task<BranchCustomerTargetMstList> GetBranchCustomerTargetMstList(ReportRequestModel request);
        Task<BranchCustomerTargetMstModel> BranchCustomerTargetDtlInnerGridList(RequestModel request);


    }
}
