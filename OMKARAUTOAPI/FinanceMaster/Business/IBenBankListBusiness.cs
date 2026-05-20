using FinanceMaster.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
    public interface IBenBankListBusiness
    {
        Task<ResponseModel> BenBankListSave(BenBankListModel benBankListModel);
        Task<BenBankList> GetBenBankList(ReportRequestModel request);
        Task<ResponseModel> BenBankListDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateBank(RequestModel request);
    }
}
