using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class VehicleRepMaintMasterBusiness : IVehicleRepMaintMasterBusiness
    {
        readonly IVehicleRepMaintMasterRepository vehicleRepMaintRepository;
        public VehicleRepMaintMasterBusiness(IVehicleRepMaintMasterRepository _vehicleRepMaintRepository)
        {
            vehicleRepMaintRepository = _vehicleRepMaintRepository;
        }
        public async Task<ResponseModel> VehicleRepMaintMasterSave(VehicleRepMaintMasterModel vehicleRepMaintMasterModel)
        {
            return await vehicleRepMaintRepository.VehicleRepMaintMasterSave(vehicleRepMaintMasterModel);
        }
        public async Task<ResponseModel> VehicleRepMaintMasterDelete(RequestModel req)
        {
            return await vehicleRepMaintRepository.VehicleRepMaintMasterDelete(req);
        }
        public async Task<VehicleRepMaintMasterModel> GetVehicleRepMaintMasterInnerGridList(RequestModel request)
        {
            return await vehicleRepMaintRepository.GetVehicleRepMaintMasterInnerGridList(request);
        }
        public async Task<VehicleRepMaintMasterList> GetVehicleRepMaintMasterList(PageFromDtToDtRequest request)
        {
            return await vehicleRepMaintRepository.GetVehicleRepMaintMasterList(request);
        }
        public async Task<List<DropDownListModel>> GetMaintanenceList()
        {
            return await vehicleRepMaintRepository.GetMaintanenceList();
        }
        public async Task<ResponseModel> GetSpareStockAvailable(RequestModel req)
        {
            return await vehicleRepMaintRepository.GetSpareStockAvailable(req);
        }
        public async Task<ResponseModel> GetVehicleRepairPrintPdf(RequestModel request)
        {
            return await vehicleRepMaintRepository.GetVehicleRepairPrintPdf(request);
        }
    }
}
