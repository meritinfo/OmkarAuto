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
    public interface IBankBookRptRepository
    {
        Task<LedgerRptListModel> GetBankBookRptList(ReportRequestModel request);
        Task<DataSet> bankBookReport(ReportRequestModel request);
        Task<ResponseModel> GetBankBookRptExcel(ReportRequestModel request);
    }
}
