using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITyreSalesMasterBusiness
    {
        Task<TyreSalesMasterList> GetTyreSalesMasterList(PageFromDtToDtRequest request);
        Task<TyreSalesMasterModel> GetTyreSalesMasterInnerGridList(RequestModel request);
        Task<ResponseModel> TyreSalesMasterSave(TyreSalesMasterModel tyreSalesMasterModel);
        Task<ResponseModel> TyreSalesMasterDelete(RequestModel req);
        Task<List<DropDownListModel>> GetCustomerList();
        Task<TyreSalesMasterModel> GetCustomerDetailList(RequestModel req);
    }
}
