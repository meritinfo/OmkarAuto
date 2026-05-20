using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class BranchCustomerTargetBusiness : IBranchCustomerTargetBusiness
    {
        readonly IBranchCustomerTargetRepository branchCustomerTargetRepository;
        public BranchCustomerTargetBusiness(IBranchCustomerTargetRepository _branchCustomerTargetRepository)
        {
            branchCustomerTargetRepository = _branchCustomerTargetRepository;
        }
        public async Task<ResponseModel> BranchCustomerTargetSave(BranchCustomerTargetMstModel branchCustomerTargetMstModel)
        {
            return await branchCustomerTargetRepository.BranchCustomerTargetSave(branchCustomerTargetMstModel);
        }
        public async Task<ResponseModel> BranchCustomerTargetDelete(RequestModel requestModel)
        {
            return await branchCustomerTargetRepository.BranchCustomerTargetDelete(requestModel);
        }
        public async Task<BranchCustomerTargetMstList> GetBranchCustomerTargetMstList(ReportRequestModel request)
        {
            return await branchCustomerTargetRepository.GetBranchCustomerTargetMstList(request);
        }
        public async Task<BranchCustomerTargetMstModel> BranchCustomerTargetDtlInnerGridList(RequestModel request)
        {
            return await branchCustomerTargetRepository.BranchCustomerTargetDtlInnerGridList(request);
        }
    }
}
