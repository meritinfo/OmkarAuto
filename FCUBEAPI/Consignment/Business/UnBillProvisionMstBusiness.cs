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
    public class UnBillProvisionMstBusiness : IUnBillProvisionMstBusiness
    {
        readonly IUnBillProvisionMstRepository unBillProvisionMstRepository;
        public UnBillProvisionMstBusiness(IUnBillProvisionMstRepository _unBillProvisionMstRepository)
        {
            unBillProvisionMstRepository = _unBillProvisionMstRepository;
        }
        public async Task<ResponseModel> UnBillProvisionMstSave(UnBillProvisionMstModel unBillProvisionMstModel)
        {
            return await unBillProvisionMstRepository.UnBillProvisionMstSave(unBillProvisionMstModel);
        }
        public async Task<UnBillProvisionMstList> GetUnBillProvisionMstList(ReportRequestModel request)
        {
            return await unBillProvisionMstRepository.GetUnBillProvisionMstList(request);
    }
        public async Task<UnBillProvisionMstModel> GetUnBillProvisionMstGridList(RequestModel request)
        {
            return await unBillProvisionMstRepository.GetUnBillProvisionMstGridList(request);
        }
        public async Task<ResponseModel> UnBillProvisionMstDelete(RequestModel requestModel)
        {
            return await unBillProvisionMstRepository.UnBillProvisionMstDelete(requestModel);
        }
        public async Task<UnBillProvisionMstModel> GetUnBillProvisonSearchList(ReportRequestModel request)
        {
            return await unBillProvisionMstRepository.GetUnBillProvisonSearchList(request);
        }
    }
}
