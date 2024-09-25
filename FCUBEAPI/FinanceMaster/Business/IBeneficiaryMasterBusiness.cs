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
        }
    

}
