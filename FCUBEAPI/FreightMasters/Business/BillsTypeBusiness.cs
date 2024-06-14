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
    public class BillsTypeBusiness: IBillsTypeBusiness
    {
        readonly IBillsTypeRepository billsTypeRepository;
        public BillsTypeBusiness(IBillsTypeRepository _billsTypeRepository)
        {
            billsTypeRepository = _billsTypeRepository;
        }

        public async Task<ResponseModel> BillsTypeSave(BillsTypeModel billsTypeModel)
        {
            return await billsTypeRepository.BillsTypeSave(billsTypeModel);
        }
        public async Task<BillsTypeListModel> GetBillsTypeList(PageRequest request)
        {
            return await billsTypeRepository.GetBillsTypeList(request);
        }
        public async Task<ResponseModel> BillsTypeDelete(RequestModel request)
        {
            return await billsTypeRepository.BillsTypeDelete(request);
        }
        public async Task<List<DropDownListModel>> GetFinAcList()
        {
            return await billsTypeRepository.GetFinAcList();
        }
    }
}
