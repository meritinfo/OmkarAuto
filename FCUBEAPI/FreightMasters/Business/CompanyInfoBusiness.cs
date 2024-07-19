using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class CompanyInfoBusiness : ICompanyInfoBusiness
    {
        readonly ICompanyInfoRepository companyInfoRepository;
        public CompanyInfoBusiness(ICompanyInfoRepository _companyInfoRepository)
        {
            companyInfoRepository = _companyInfoRepository;
        }
        public async Task<ResponseModel> CompanyInfoSave(CompanyInfoModel companyInfoModel)
        {
            return await companyInfoRepository.CompanyInfoSave(companyInfoModel);
        }
        public async Task<CompanyInfoModel> GetCompanyDetail()
        {
            return await companyInfoRepository.GetCompanyDetail();
        }

    }
}
