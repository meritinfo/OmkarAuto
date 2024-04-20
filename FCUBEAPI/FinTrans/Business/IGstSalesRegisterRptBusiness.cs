using FinTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Business
{
    public interface IGstSalesRegisterRptBusiness
    {
        Task<GstSalesRegisterRptListModel> GetGstSalesRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetGstSalesRegisterRptExcel(ReportRequestModel request);
    }
}
