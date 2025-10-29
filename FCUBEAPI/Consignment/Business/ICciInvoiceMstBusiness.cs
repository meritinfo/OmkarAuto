using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface ICciInvoiceMstBusiness
    {
        Task<CciInvoiceMstList> GetCciInvoiceMstMasterList(ReportRequestModel request);
        Task<CciInvoiceMstModel> GetCciInvoiceDtlInnerGridList(RequestModel request);
        Task<ResponseModel> CciInvoiceMstSave(CciInvoiceMstModel cciInvoiceMstModel);
        Task<ResponseModel> CciInvoiceMstDelete(RequestModel req);
        Task<List<DropDownListModel>> GetChCostList();
        Task<List<DropDownListModel>> GetCnDetail(RequestModel request);
        Task<ResponseModel> GetChCostDetail(RequestModel request);
        Task<ConsignmentModel> GetLRDetails(RequestModel request);
        Task<ResponseModel> GetCciInvoiceExcel(ReportRequestModel request);

    }
}
