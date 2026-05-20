using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IBillsTypeRepository
    {
        Task<ResponseModel> BillsTypeSave(BillsTypeModel billsTypeModel);
        Task<BillsTypeListModel> GetBillsTypeList(PageRequest request);
        Task<ResponseModel> BillsTypeDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetFinAcList();
        Task<ResponseModel> CheckDuplicateBillType(RequestModel requestModel);
        Task<List<DropDownListModel>> GetBillTypesList();

    }
}
