using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class CciInvoiceMstBusiness: ICciInvoiceMstBusiness
    {
        readonly ICciInvoiceMstRepository cciInvoiceMstRepository;
        public CciInvoiceMstBusiness(ICciInvoiceMstRepository _cciInvoiceMstRepository)
        {
            cciInvoiceMstRepository = _cciInvoiceMstRepository;
        }
        public async Task<CciInvoiceMstList> GetCciInvoiceMstMasterList(ReportRequestModel request)
        {
            return await cciInvoiceMstRepository.GetCciInvoiceMstMasterList(request);
        }
        public async Task<CciInvoiceMstModel> GetCciInvoiceDtlInnerGridList(RequestModel request)
        {
            return await cciInvoiceMstRepository.GetCciInvoiceDtlInnerGridList(request);
        }
        public async Task<ResponseModel> CciInvoiceMstSave(CciInvoiceMstModel cciInvoiceMstModel)
        {
            return await cciInvoiceMstRepository.CciInvoiceMstSave(cciInvoiceMstModel);
        }
        public async Task<ResponseModel> CciInvoiceMstDelete(RequestModel req)
        {
            return await cciInvoiceMstRepository.CciInvoiceMstDelete(req);
        }
        public async Task<List<DropDownListModel>> GetChCostList()
        {
            return await cciInvoiceMstRepository.GetChCostList();
        }
        public async Task<CciInvoiceMstModel> GetCnDetail(RequestModel request)
        {
            return await cciInvoiceMstRepository.GetCnDetail(request);
        }
        public async Task<ResponseModel> GetChCostDetail(RequestModel request)
        {
            return await cciInvoiceMstRepository.GetChCostDetail(request);
        }
    }
}
