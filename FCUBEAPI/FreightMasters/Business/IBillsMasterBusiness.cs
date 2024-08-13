using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBillsMasterBusiness
    {
        Task<BillsListModel> GetBillsMasterList(PageFromDtToDtRequest request);
        Task<BillsMasterSearchListModel> GetBillsInnerGridList(RequestModel request);
        Task<ResponseModel> BillsMasterSave(BillsMasterModel challanModel);
        Task<ResponseModel> BillsMasterDelete(RequestModel requestModel);
        Task<BillsMasterSearchListModel> GetBillsMasterSearchList(BillsMasterSearchListRequest request);
        Task<ResponseModel> LrBillUpdate(RequestModel reqmodel);


    }
}
