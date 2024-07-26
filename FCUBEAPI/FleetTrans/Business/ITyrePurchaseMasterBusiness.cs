using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITyrePurchaseMasterBusiness
    {
        Task<ResponseModel> TyrePurchaseMasterSave(TyrePurchaseMasterModel tyrePurchaseMasterModel);
        Task<ResponseModel> TyrePurchaseMasterDelete(RequestModel req);
        Task<ResponseModel> ChkTyreNoDuplicate(RequestModel req);
        Task<TyrePurchaseMasterList> GetTyrePurchaseMasterList(PageFromDtToDtRequest request);
        Task<TyrePurchaseMasterModel> GetTyrePurchaseMasterInnerGridList(RequestModel request);
        Task<List<DropDownListModel>> GetBrandList();
        Task<List<DropDownListModel>> GetModelList();
        Task<List<DropDownListModel>> GetVendorList();
    }
}
