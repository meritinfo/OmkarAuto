using DocumentFormat.OpenXml.Office2016.Excel;
using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Repository;
using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
    public class CnorCneeGstBusiness: ICnorCneeGstBusiness
    {
        readonly ICnorCneeGstRepository cnorCneeGstRepository;
        public CnorCneeGstBusiness(ICnorCneeGstRepository _cnorCneeGstRepository)
        {
            cnorCneeGstRepository = _cnorCneeGstRepository;
        }
        public async Task<ResponseModel> CnorCneeGstSave(CnorCneeGstModel cnorCneeGstModel)
        {
            return await cnorCneeGstRepository.CnorCneeGstSave(cnorCneeGstModel);
        }
        public async Task<CnorCneeGstList> GetCnorCneeGstList(PageRequest request)
        {
            return await cnorCneeGstRepository.GetCnorCneeGstList(request);
        }
        public async  Task<ResponseModel> CnorCneeGstDelete(RequestModel requestModel)
         {
            return await cnorCneeGstRepository.CnorCneeGstDelete(requestModel);
         }
        public async Task<List<DropDownListModel>> GetCneeCnorList()
        {
            return await cnorCneeGstRepository.GetCneeCnorList();
        }
    }
}
