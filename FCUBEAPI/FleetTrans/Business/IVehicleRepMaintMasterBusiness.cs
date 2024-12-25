using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IVehicleRepMaintMasterBusiness
    {
        Task<VehicleRepMaintMasterList> GetVehicleRepMaintMasterList(PageFromDtToDtRequest request);
        
            Task<VehicleRepMaintMasterModel> GetVehicleRepMaintMasterInnerGridList(RequestModel request);
        Task<ResponseModel> VehicleRepMaintMasterSave(VehicleRepMaintMasterModel vehicleRepMaintMasterModel);
        Task<ResponseModel> VehicleRepMaintMasterDelete(RequestModel req);
        Task<List<DropDownListModel>> GetMaintanenceList();
        Task<ResponseModel> GetSpareStockAvailable(RequestModel req);
    }
}
