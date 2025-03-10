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
    

    }
}
