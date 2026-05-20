using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface ICompanyInfoBusiness
    {
        Task<ResponseModel> CompanyInfoSave(CompanyInfoModel companyInfoModel);
        Task<CompanyInfoModel> GetCompanyDetail();
    }
}
