using FinTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Business
{
    public interface ICustWizardBusiness
    {
        Task<ResponseModel> CustWizardSave(CustWizardModel custWizardModel);
        Task<CustWizardList> GetCustWizardList(PageRequest request);
        Task<CustWizardModel> GetCustWizardDetail();
    }
}
