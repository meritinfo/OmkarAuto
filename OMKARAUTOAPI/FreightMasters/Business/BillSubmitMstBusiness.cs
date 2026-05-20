using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class BillSubmitMstBusiness : IBillSubmitMstBusiness
    {
        readonly IBillSubmitMstRepository billSubmitMstRepository;
        public BillSubmitMstBusiness(IBillSubmitMstRepository _billSubmitMstRepository)
        {
            billSubmitMstRepository = _billSubmitMstRepository;
        }
        public async Task<ResponseModel> BillSubmitMstSave(BillSubmitMasterModel billSubmitMasterModel)
        {
            return await billSubmitMstRepository.BillSubmitMstSave(billSubmitMasterModel);
        }
        public async Task<BillSubmitMasterModel> GetBillSubmitMasterInnerGridList(RequestModel request)
        {
            return await billSubmitMstRepository.GetBillSubmitMasterInnerGridList(request);
        }
        public async Task<ResponseModel> BillSubmitMasterDelete(RequestModel req)
         {
            return await billSubmitMstRepository.BillSubmitMasterDelete(req);
        }
        public async Task<BillSubmitMasterList> GetBillSubmitMasterList(ReportRequestModel request)
        {
            return await billSubmitMstRepository.GetBillSubmitMasterList(request);
        }
        public async Task<ResponseModel> GetBillSubmitPrint(RequestModel request)
        {
            return await billSubmitMstRepository.GetBillSubmitPrint(request);
        }
        public async Task<List<DropDownListModel>> GetDeptList()
        {
            return await billSubmitMstRepository.GetDeptList();
        }
        public async Task<BillSubmitMasterModel> GetBillSubmitSearchList(ReportRequestModel request)
         {
            return await billSubmitMstRepository.GetBillSubmitSearchList(request);
    }
}
}
