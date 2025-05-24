using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class ChallanSuppliBusiness : IChallanSuppliBusiness
    {
        readonly IChallanSuppliRepository challanRepository;
        public ChallanSuppliBusiness(IChallanSuppliRepository _challanRepository)
        {
            challanRepository = _challanRepository;
        }
        public async Task<ChallanListModel> GetChallanSuppliList(ReportRequestModel request)
        {
            return await challanRepository.GetChallanSuppliList(request);
        }
        public async Task<ResponseModel> ChallanSuppliSave(ChallanMasterModel challanModel)
        {
            return await challanRepository.ChallanSuppliSave(challanModel);
        }
        public async Task<ResponseModel> ChallanSuppliDelete(RequestModel request)
        {
            return await challanRepository.ChallanSuppliDelete(request);
        }
        public async Task<ResponseModel> CheckDuplicateChallanSuppli(RequestModel request)
        {
            return await challanRepository.CheckDuplicateChallanSuppli(request);
        }

    }

}
