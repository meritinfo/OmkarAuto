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
    public interface IBankBookRptBusiness
    {
        Task<LedgerRptListModel> GetBankBookRptList(ReportRequestModel request);
        Task<ResponseModel> GetBankBookRptPdf(ReportRequestModel request);
    }
}
