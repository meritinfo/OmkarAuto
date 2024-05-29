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
    public class ChallanMasterBusiness:IChallanMasterBusiness
    {
        readonly IChallanMasterRepository challanRepository;
        public ChallanMasterBusiness(IChallanMasterRepository _challanRepository)
        {
            challanRepository = _challanRepository;
        }
        public async Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request)
        {
            return await challanRepository.GetChallanMasterList(request);
        }
        public async Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request)
        {
            return await challanRepository.GetChallanInnerGridList(request);
        }
        public async Task<ResponseModel> ChallanMasterSave(ChallanMasterModel challanModel)
        {
            return await challanRepository.ChallanMasterSave(challanModel);
        }
        public async Task<ResponseModel> ChallanMasterDelete(RequestModel request)
        {
            return await challanRepository.ChallanMasterDelete(request);
        }
        public async Task<ResponseModel> GetChallanNo(RequestModel request)
        {
            return await challanRepository.GetChallanNo(request);
        }
        public async Task<ResponseModel> CheckDuplicateChallan(RequestModel request)
        {
            return await challanRepository.CheckDuplicateChallan(request);
        }
        public async Task<ResponseModel> GetConsignmentId(RequestModel request)
        {
            return await challanRepository.GetConsignmentId(request);
        }
    }
}
