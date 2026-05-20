using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IVehicleInstPmtRepository
    {
        Task<ResponseModel> VehicleInstPmtSave(VehicleInstPmtModel vehicleInstPmtModel);
        Task<VehicleInstPmtList> GetVehicleInstPmtMasterList(PageFromDtToDtRequest request);
        Task<ResponseModel> VehicleInstPmtMasterDelete(RequestModel requestModel);
        Task<ResponseModel> checkVehicleLoanType(RequestModel requestModel);
        Task<List<DropDownListModel>> GetVehicleNoLoan(RequestModel request);
        Task<List<DropDownListModel>> GetVehicleInstNo(RequestModel request);
        Task<RequestModel> GetVehicleInstAmount(RequestModel request);
    }
}
