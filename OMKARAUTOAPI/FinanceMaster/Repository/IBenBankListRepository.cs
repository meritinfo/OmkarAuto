using FinanceMaster.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public interface IBenBankListRepository
    {
        Task<ResponseModel> BenBankListSave(BenBankListModel benBankListModel);
        Task<BenBankList> GetBenBankList(ReportRequestModel request);
        Task<ResponseModel> BenBankListDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateBank(RequestModel request);
    }
}
