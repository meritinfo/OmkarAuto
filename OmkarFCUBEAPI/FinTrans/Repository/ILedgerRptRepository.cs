using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinTrans.Models;
using System.Data;

namespace FinTrans.Repository
{
    public interface ILedgerRptRepository
    {
        Task<List<DropDownListModel>> GetLedgerList();
        Task<LedgerRptListModel> GetLedgerRptList(ReportRequestModel request);
        Task<ResponseModel> GetLedgerRptExcel(ReportRequestModel request);
        Task<DataSet> ledgerReport(ReportRequestModel request);
        Task<ResponseModel> GetCompanyDetail();
    }
}
