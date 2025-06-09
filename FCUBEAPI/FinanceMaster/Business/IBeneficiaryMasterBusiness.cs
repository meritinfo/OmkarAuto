using FinanceMaster.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
 
    public interface IBeneficiaryMasterBusiness
    {
        Task<ResponseModel> BeneficiaryMasterSave(BeneficiaryMasterModel beneficiaryMasterModel);
        Task<ResponseModel> BeneficiaryMasterDelete(RequestModel request);
        Task<BeneficiaryMasterList> GetBeneficiaryMasterList(PageRequest request);
        Task<ResponseModel> GetBenCode(RequestModel requestModel);
        Task<ResponseModel> GetBankAccountVerify(ReportRequestModel request);
        Task<ResponseModel> GetUserBenApproveBlock(RequestModel requestModel);
        Task<List<DropDownListModel>> GetBenBankList();
        Task<List<DropDownListModel>> GetBeneficiaryList();
    }
    

}
