using DocumentFormat.OpenXml.Office2016.Excel;
using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
    public class BeneficiaryMasterBusiness : IBeneficiaryMasterBusiness
    {
        readonly IBeneficiaryMasterRepository beneficiaryMasterRepository;
        public BeneficiaryMasterBusiness(IBeneficiaryMasterRepository _beneficiaryMasterRepository)
        {
            beneficiaryMasterRepository = _beneficiaryMasterRepository;
        }
        public async Task<ResponseModel> BeneficiaryMasterSave(BeneficiaryMasterModel beneficiaryMasterModel)
        {
            return await beneficiaryMasterRepository.BeneficiaryMasterSave(beneficiaryMasterModel);
        }
        public async Task<ResponseModel> BeneficiaryMasterDelete(RequestModel request)
        {
            return await beneficiaryMasterRepository.BeneficiaryMasterDelete(request);
        }
        public async Task<BeneficiaryMasterList> GetBeneficiaryMasterList(PageRequest request)
        {
            return await beneficiaryMasterRepository.GetBeneficiaryMasterList(request);
        }
        public async Task<ResponseModel> GetBenCode(RequestModel request)
        {
            return await beneficiaryMasterRepository.GetBenCode(request);
        }
        public async Task<ResponseModel> GetBankAccountVerify(ReportRequestModel request)
        {
            return await beneficiaryMasterRepository.GetBankAccountVerify(request);
        }
        public async Task<ResponseModel> GetUserBenApproveBlock(RequestModel request)
        {
            return await beneficiaryMasterRepository.GetUserBenApproveBlock(request);
        }
        public async Task<List<DropDownListModel>> GetBenBankList()
        {
            return await beneficiaryMasterRepository.GetBenBankList();
        }
    }
}
