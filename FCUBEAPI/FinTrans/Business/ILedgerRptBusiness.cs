using Shared.Models;
using FinTrans.Models;

using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Business
{
    public interface ILedgerRptBusiness
    {
        Task<List<DropDownListModel>> GetLedgerList();
        Task<LedgerRptListModel> GetLedgerRptList(ReportRequestModel request);
        Task<ResponseModel> GetLedgerRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetLedgerRptPdf(ReportRequestModel request);
    }
}
