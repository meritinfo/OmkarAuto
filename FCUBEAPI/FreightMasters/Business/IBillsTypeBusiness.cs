using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBillsTypeBusiness
    {
        Task<ResponseModel> BillsTypeSave(BillsTypeModel billsTypeModel);
        Task<BillsTypeListModel> GetBillsTypeList(PageRequest request);
        Task<ResponseModel> BillsTypeDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetFinAcList();
    }
}
