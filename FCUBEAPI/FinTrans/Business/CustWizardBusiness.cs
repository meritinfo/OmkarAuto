using FinTrans.Models;
using FinTrans.Repository;
using Org.BouncyCastle.Asn1.Ocsp;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Business
{
    public class CustWizardBusiness : ICustWizardBusiness
    {
        readonly ICustWizardRepository custWizardRepository;
        public CustWizardBusiness(ICustWizardRepository _custWizardRepository)
        {
            custWizardRepository = _custWizardRepository;
        }
        public async Task<ResponseModel> CustWizardSave(CustWizardModel custWizardModel)
        {
            return await custWizardRepository.CustWizardSave(custWizardModel);
        }

        public async Task<CustWizardList> GetCustWizardList(PageRequest request)
        {
            return await custWizardRepository.GetCustWizardList(request);
        }
        public async Task<CustWizardModel> GetCustWizardDetail()
        {
            return await custWizardRepository.GetCustWizardDetail();


        }
    }
}