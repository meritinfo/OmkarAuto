using DocumentFormat.OpenXml.Office2016.Excel;
using FinanceMaster.Models;
using FinanceMaster.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
    public class BenBankListBusiness : IBenBankListBusiness
    {
        readonly IBenBankListRepository benBankListRepository;
        public BenBankListBusiness(IBenBankListRepository _benBankListRepository)
        {
            benBankListRepository = _benBankListRepository;
        }
        public async Task<ResponseModel> BenBankListSave(BenBankListModel benBankListModel)
        {
            return await benBankListRepository.BenBankListSave(benBankListModel);

        }
        public async Task<BenBankList> GetBenBankList(ReportRequestModel request)
        {
            return await benBankListRepository.GetBenBankList(request);
        }
        public async Task<ResponseModel> BenBankListDelete(RequestModel requestModel)
        {
            return await benBankListRepository.BenBankListDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateBank(RequestModel request)
        {
            return await benBankListRepository.CheckDuplicateBank(request);
        }

    }
}
