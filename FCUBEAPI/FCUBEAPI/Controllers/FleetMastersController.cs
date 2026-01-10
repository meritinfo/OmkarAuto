using Consignment.Business;
using FleetMasters.Business;
using FleetMasters.Models;
using FleetTrans;
using FleetTrans.Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace FCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FleetMastersController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IVehicleTypeMasterBusiness vehicleTypeMasterBusiness;
        readonly IVehicleFltMasterBusiness vehicleFltMasterBusiness;
        readonly IDocRenewalMasterBusiness docRenewalMasterBusiness;
        readonly IBrandMasterBusiness brandMasterBusiness;
        readonly ISparesLubesMasterBusiness sparesLubesMasterBusiness;
        readonly IMaintanenceMasterBusiness maintanenceMasterBusiness;
        readonly ITyreModelBusiness tyreModelBusiness;
        readonly IVehicleMfrMasterBusiness vehicleMfrMasterBusiness;



        readonly IFleetCardMasterBusiness fleetCardMasterBusiness;
        readonly ITyrePositionMasterBusiness tyrePositionMasterBusiness;
        readonly IDriverMasterBusiness driverMasterBusiness;
        readonly IExpensesTypeMasterBusiness expensestypeMasterBusiness;
        readonly ITruckMasterBusiness truckMasterBusiness;
        readonly ITransportMasterBusiness transportMasterBusiness;
        readonly ITripExpTypeBusiness tripExpTypeBusiness;
        readonly IFleetGroupMasterBusiness fleetGroupMasterBusiness;
        readonly IVehicleFinCompMasterBusiness vehicleFinCompMasterBusiness;
        readonly IVehicleFltTypeGroupMstBusiness vehicleFltTypeGroupMstBusiness;

        readonly IRechargeRequestBusiness rechargeRequestBusiness;
        readonly IFleetGodownMasterBusiness fleetGodownMasterBusiness;
        readonly IGodownStockBusiness godownStockBusiness;


        public FleetMastersController(IOptions<DBModel> _dbconnection,
            IVehicleFltMasterBusiness _vehicleFltMasterBusiness,
            IVehicleTypeMasterBusiness _vehicleTypeMasterBusiness,
            IDocRenewalMasterBusiness _docRenewalMasterBusiness,
            IBrandMasterBusiness _brandMasterBusiness,
            ITyreModelBusiness _tyreModelBusiness,
            ITripExpTypeBusiness _tripExpTypeBusiness,
            IFleetGroupMasterBusiness _fleetGroupMasterBusiness,
            IMaintanenceMasterBusiness _maintanenceMasterBusiness,
            ISparesLubesMasterBusiness _sparesLubesMasterBusiness,
            ITyrePositionMasterBusiness _tyrePositionMasterBusiness, 
            IDriverMasterBusiness _driverMasterBusiness, 
            IExpensesTypeMasterBusiness _expensesTypeMasterBusiness,
            IFleetCardMasterBusiness _fleetCardMasterBusiness,
            ITruckMasterBusiness _truckMasterBusiness,
            ITransportMasterBusiness _transportMasterBusiness,
            IVehicleMfrMasterBusiness _vehicleMfrMasterBusiness,
            IVehicleFinCompMasterBusiness _vehicleFinCompMasterBusiness,
            IVehicleFltTypeGroupMstBusiness _vehicleFltTypeGroupMstBusiness,
            IRechargeRequestBusiness         _rechargeRequestBusiness,
            IFleetGodownMasterBusiness       _fleetGodownMasterBusiness,
             IGodownStockBusiness _godownStockBusiness)

          
        {
            dbconnection = _dbconnection;
            vehicleTypeMasterBusiness = _vehicleTypeMasterBusiness;
            vehicleFltMasterBusiness = _vehicleFltMasterBusiness;
            docRenewalMasterBusiness = _docRenewalMasterBusiness;
            brandMasterBusiness = _brandMasterBusiness;
            tyrePositionMasterBusiness = _tyrePositionMasterBusiness;
            driverMasterBusiness = _driverMasterBusiness;
            expensestypeMasterBusiness = _expensesTypeMasterBusiness;
            truckMasterBusiness = _truckMasterBusiness;
          
            sparesLubesMasterBusiness = _sparesLubesMasterBusiness;
            maintanenceMasterBusiness = _maintanenceMasterBusiness;
            fleetCardMasterBusiness = _fleetCardMasterBusiness;
            transportMasterBusiness= _transportMasterBusiness;
            tyreModelBusiness = _tyreModelBusiness;
            tripExpTypeBusiness = _tripExpTypeBusiness;
            fleetGroupMasterBusiness = _fleetGroupMasterBusiness;
            vehicleMfrMasterBusiness = _vehicleMfrMasterBusiness;
            vehicleFinCompMasterBusiness = _vehicleFinCompMasterBusiness;
            vehicleFltTypeGroupMstBusiness = _vehicleFltTypeGroupMstBusiness;
            rechargeRequestBusiness = _rechargeRequestBusiness;
            fleetGodownMasterBusiness=_fleetGodownMasterBusiness;
            godownStockBusiness = _godownStockBusiness;
        }


        /// <summary>
        /// Controller method for Driver master
        /// </summary>
        [HttpPost("DriverMasterSave")]
        public async Task<IActionResult> DriverMasterSave()
        {
            try
            {
                var driverPhoto = HttpContext.Request.Form.Files["driverPhoto"];
                var drivingLicense = HttpContext.Request.Form.Files["drivingLicense"];
                var hazdrivingLicense = HttpContext.Request.Form.Files["hazdrivingLicense"];
                var tempAddressProve = HttpContext.Request.Form.Files["tempAddressProve"];
                var perAddressProve = HttpContext.Request.Form.Files["perAddressProve"];
                var aadharCard = HttpContext.Request.Form.Files["aadharCard"];
                var bankPassbook = HttpContext.Request.Form.Files["bankPassbook"];

                DriverMasterModel driverMasterModel = JsonConvert.DeserializeObject<DriverMasterModel>(HttpContext.Request.Form["datadetails"]);
                
                if (driverPhoto != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(driverPhoto.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(driverPhoto.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/driverphoto");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await driverPhoto.CopyToAsync(fileStream);
                        driverMasterModel.DrPhoto = imageName;
                    }
                }
                if (drivingLicense != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(drivingLicense.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(drivingLicense.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/drivinglicense");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await drivingLicense.CopyToAsync(fileStream);
                        driverMasterModel.AttachDrLic = imageName;
                    }
                }
                if (hazdrivingLicense != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(hazdrivingLicense.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(hazdrivingLicense.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/hazdrivinglicense");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await hazdrivingLicense.CopyToAsync(fileStream);
                        driverMasterModel.AttachDrHazLic = imageName;
                    }
                }
                if (tempAddressProve != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(tempAddressProve.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(tempAddressProve.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/tempaddressprove");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await tempAddressProve.CopyToAsync(fileStream);
                        driverMasterModel.AttachDrTempAddProof = imageName;
                    }
                }
                if (perAddressProve != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(perAddressProve.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(perAddressProve.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/peraddressprove");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await perAddressProve.CopyToAsync(fileStream);
                        driverMasterModel.AttachDrPermAddProof = imageName;
                    }
                }
                if (aadharCard != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(aadharCard.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(aadharCard.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/aadharcard");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await aadharCard.CopyToAsync(fileStream);
                        driverMasterModel.AttachDrAadhar = imageName;
                    }
                }
                if (bankPassbook != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(bankPassbook.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(bankPassbook.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/bankpassbook");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await bankPassbook.CopyToAsync(fileStream);
                        driverMasterModel.AttachDrBankPassBook = imageName;
                    }
                }

                var result = await driverMasterBusiness.DriverMasterSave(driverMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDriverMasterList")]
        public async Task<IActionResult> GetDriverMasterList(DriverMasterListRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverMasterBusiness.GetDriverMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DriverMasterDetailsDelete")]
        public async Task<IActionResult> DriverMasterDetailsDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverMasterBusiness.DriverMasterDetailsDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkDriverDuplicate")]
        public async Task<IActionResult> ChkDriverDuplicate(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverMasterBusiness.ChkDriverDuplicate(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       


        /// <summary>
        /// Controller method for vehicle type master
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        [HttpPost("VehicleTypeMasterSave")]
        public async Task<IActionResult> VehicleTypeMasterSave(VehicleTypeMasterModel vehicleTypeMasterModel)
        {
            if (vehicleTypeMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleTypeMasterBusiness.VehicleTypeMasterSave(vehicleTypeMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateVehicleDesc")]
        public async Task<IActionResult> CheckDuplicateVehicleDesc(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleTypeMasterBusiness.CheckDuplicateVehicleDesc(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehiCapacity")]
        public async Task<IActionResult> GetVehiCapacity(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleTypeMasterBusiness.GetVehiCapacity(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("TruckMasterSave")]
        public async Task<IActionResult> TruckMasterSave()
        {
           
            try
            {
                var attachConfirmDoc = HttpContext.Request.Form.Files["attach"];

                TruckMasterModel truckMasterModel = JsonConvert.DeserializeObject<TruckMasterModel>(HttpContext.Request.Form["datadetails"]);

                if (attachConfirmDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachConfirmDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachConfirmDoc.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/truck");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachConfirmDoc.CopyToAsync(fileStream);
                        truckMasterModel.RcUpload = imageName;
                    }
                }
                var result = await truckMasterBusiness.TruckMasterSave(truckMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTruckMasterList")]
        public async Task<IActionResult> GetTruckMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await truckMasterBusiness.GetTruckMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTransportMasterList")]
        public async Task<IActionResult> GetTransportMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await transportMasterBusiness.GetTransportMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTransportMasterInnerGridList")]
        public async Task<IActionResult> GetTransportMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await transportMasterBusiness.GetTransportMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("TransportMasterSave")]
        public async Task<IActionResult> TransportMasterSave()
        {

            try
            {
                var cancelChq = HttpContext.Request.Form.Files["cancelChq"];
                var addrProof = HttpContext.Request.Form.Files["addrProof"];

                TransportMasterModel transportMasterModel = JsonConvert.DeserializeObject<TransportMasterModel>(HttpContext.Request.Form["datadetails"]);

                if (cancelChq != null)
                {

                    string imageName = new String(Path.GetFileNameWithoutExtension(cancelChq.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(cancelChq.FileName);
                   
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/transport/cancelChq/");
                    var fullPath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await cancelChq.CopyToAsync(fileStream);
                        transportMasterModel.CancelChq = imageName;
                    }
                }
                if (addrProof != null)
                {

                    string imageName = new String(Path.GetFileNameWithoutExtension(addrProof.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(addrProof.FileName);

                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/transport/addrProof/");
                    var fullPath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await addrProof.CopyToAsync(fileStream);
                        transportMasterModel.AddrProof = imageName;
                    }
                }
                var result = await transportMasterBusiness.TransportMasterSave(transportMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TransportMasterDelete")]
        public async Task<IActionResult> TransportMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await transportMasterBusiness.TransportMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TruckMasterDelete")]
        public async Task<IActionResult> TruckMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await truckMasterBusiness.TruckMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <param name="expensesTypeMasterModel"></param>
        [HttpPost("ExpensesTypeMasterSave")]
        public async Task<IActionResult> ExpenseTypeMasterSave(ExpensesTypeMasterModel expensesTypeMasterModel)
        {
            if (expensesTypeMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await expensestypeMasterBusiness.ExpensesTypeMasterSave(expensesTypeMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleTypeMasterDelete")]
        public async Task<IActionResult> VehicleTypeMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleTypeMasterBusiness.VehicleTypeMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleTypeInnerGridList")]
        public async Task<IActionResult> GetVehicleTypeInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleTypeMasterBusiness.GetVehicleTypeInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateAlias")]
        public async Task<IActionResult> CheckDuplicateAlias(RequestModel request)
        {
            try
            {
                var result = await vehicleTypeMasterBusiness.CheckDuplicateAlias(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleFltMasterSave")]
        public async Task<IActionResult> VehicleFltMasterSave()
        {
            try
            {
                var attach1Link = HttpContext.Request.Form.Files["attach1Link"];
                var attach2Link = HttpContext.Request.Form.Files["attach2Link"];
                var attach3Link = HttpContext.Request.Form.Files["attach3Link"];

                VehicleFltMasterModel vehicleFltMaster = JsonConvert.DeserializeObject<VehicleFltMasterModel>(HttpContext.Request.Form["datadetails"]);
                vehicleFltMaster.Attach1Link = "";
                vehicleFltMaster.Attach2Link = "";
                vehicleFltMaster.Attach3Link = "";

                if (attach1Link != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attach1Link.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attach1Link.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/vehical/attachment1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attach1Link.CopyToAsync(fileStream);
                        vehicleFltMaster.Attach1Link = imageName;
                    }
                }
                if (attach2Link != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attach2Link.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attach2Link.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/vehical/attachment2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attach2Link.CopyToAsync(fileStream);
                        vehicleFltMaster.Attach2Link = imageName;
                    }
                }
                if (attach3Link != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attach3Link.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attach3Link.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/vehical/attachment3");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attach3Link.CopyToAsync(fileStream);
                        vehicleFltMaster.Attach3Link = imageName;
                    }
                }

                var result = await vehicleFltMasterBusiness.VehicleFltMasterSave(vehicleFltMaster);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

        [HttpPost("GetVehicleFltInnerGridList")]
        public async Task<IActionResult> GetVehicleFltInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicleFltInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicalMasterDetailsDelete")]
        public async Task<IActionResult> VehicalMasterDetailsDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltMasterBusiness.VehicalMasterDetailsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicalTypeList")]
        public async Task<IActionResult> GetVehicalTypeList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicalTypeList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicalTypeGroupList")]
        public async Task<IActionResult> GetVehicalTypeGroupList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicalTypeGroupList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicalTypeFltGroupList")]
        public async Task<IActionResult> GetVehicalTypeFltGroupList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicalTypeFltGroupList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLoanLedgerAccountList")]
        public async Task<IActionResult> GetLoanLedgerAccountList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetLoanLedgerAccountList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFltGroupList")]
        public async Task<IActionResult> GetFltGroupList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetFltGroupList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFinCompName")]
        public async Task<IActionResult> GetFinCompName()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetFinCompName();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicalLedgerAccountList")]
        public async Task<IActionResult> GetVehicalLedgerAccountList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicalLedgerAccountList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetVehicalAssetAccountList")]
        public async Task<IActionResult> GetVehicalAssetAccountList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicalAssetAccountList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicalMfrList")]
        public async Task<IActionResult> GetVehicalMfrList()
        {
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicalMfrList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChkVehicalNoExist")]
        public async Task<IActionResult> ChkVehicalNoExist(RequestModel req)
        {
            try
            {
                var result = await vehicleFltMasterBusiness.ChkVehicalNoExist(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDocRenewalMasterList")]
        public async Task<IActionResult> GetDocRenewalMasterList(PageRequest request)
        {
            try
            {
                var result = await docRenewalMasterBusiness.GetDocRenewalMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DocRenewalMasterSave")]
        public async Task<IActionResult> DocRenewalMasterSave(DocRenewalMasterModel docRenewalMasterModel)
        {
            if (docRenewalMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalMasterBusiness.DocRenewalMasterSave(docRenewalMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetDebitAcList")]
        public async Task<IActionResult> GetDebitAcList()
        {
            try
            {
                var result = await docRenewalMasterBusiness.GetDebitAcList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("DocRenewalMasterDetailsDelete")]
        public async Task<IActionResult> DocRenewalMasterDetailsDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalMasterBusiness.DocRenewalMasterDetailsDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChkDocrenewalCode")]
        public async Task<IActionResult> ChkDocrenewalCode(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalMasterBusiness.ChkDocrenewalCode(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("BrandMasterSave")]
        public async Task<IActionResult> BrandMasterSave(BrandMasterModel brandMasterModel)
        {
            if (brandMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await brandMasterBusiness.BrandMasterSave(brandMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FleetCardMasterDelete")]
        public async Task<IActionResult> FleetCardMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetCardMasterBusiness.FleetCardMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateCardNo")]
        public async Task<IActionResult> CheckDuplicateCardNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetCardMasterBusiness.CheckDuplicateCardNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateCardCode")]
        public async Task<IActionResult> CheckDuplicateCardCode(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetCardMasterBusiness.CheckDuplicateCardCode(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckVehicleCardLinked")]
        public async Task<IActionResult> CheckVehicleCardLinked(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetCardMasterBusiness.CheckVehicleCardLinked(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetBrandMasterList")]
        public async Task<IActionResult> GetBrandMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await brandMasterBusiness.GetBrandMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BrandMasterDelete")]
        public async Task<IActionResult> BrandMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await brandMasterBusiness.BrandMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateBrand")]
        public async Task<IActionResult> CheckDuplicateBrand(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await brandMasterBusiness.CheckDuplicateBrand(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FleetCardMasterSave")]
        public async Task<IActionResult> FleetCardMasterSave(FleetCardMasterModel fleetCardMasterModel)
        {
            if (fleetCardMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetCardMasterBusiness.FleetCardMasterSave(fleetCardMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        

        [HttpPost("GetFleetCardMasterList")]
        public async Task<IActionResult> GetFleetCardMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetCardMasterBusiness.GetFleetCardMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCardledgerAcList")]
        public async Task<IActionResult> GetCardledgerAcList()
        {
            try
            {
                var result = await fleetCardMasterBusiness.GetCardledgerAcList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetTyrePositionMasterList")]
        public async Task<IActionResult> GetTyrePositionMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePositionMasterBusiness.GetTyrePositionMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleTypeMasterList")]
        public async Task<IActionResult> GetVehicleTypeMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleTypeMasterBusiness.GetVehicleTypeMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleFltMasterList")]
        public async Task<IActionResult> GetVehicleFltMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicleFltMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleMasterExcel")]
        public async Task<IActionResult> GetVehicleMasterExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltMasterBusiness.GetVehicleMasterExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("TyrePositionMasterSave")]
        public async Task<IActionResult> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel)
        {
            if (tyrePositionMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await  tyrePositionMasterBusiness.TyrePositionMasterSave(tyrePositionMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicatePos")]
        public async Task<IActionResult> CheckDuplicatePos(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePositionMasterBusiness.CheckDuplicatePos(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TyrePositionMasterDelete")]
        public async Task<IActionResult> TyrePositionMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePositionMasterBusiness.TyrePositionMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SparesLubesMasterSave")]
        public async Task<IActionResult> SparesLubesMasterSave(SparesLubesMasterModel sparesLubesMasterModel)
        {
            if (sparesLubesMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesLubesMasterBusiness.SparesLubesMasterSave(sparesLubesMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetBrandList")]
        public async Task<IActionResult> GetBrandList()
        {
            try
            {
                var result = await sparesLubesMasterBusiness.GetBrandList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSparesLubesMasterList")]
        public async Task<IActionResult> GetSparesLubesMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesLubesMasterBusiness.GetSparesLubesMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateSpares")]
        public async Task<IActionResult> CheckDuplicateSpares(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesLubesMasterBusiness.CheckDuplicateSpares(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSparesLubesInnerGridList")]
        public async Task<IActionResult> GetSparesLubesInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesLubesMasterBusiness.GetSparesLubesInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("SparesLubesMasterDelete")]
        public async Task<IActionResult> SparesLubesMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesLubesMasterBusiness.SparesLubesMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TyreModelSave")]
        public async Task<IActionResult> TyreModelSave(TyreModelMasterModel tyreModelMasterModel)
        {
            if (tyreModelMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreModelBusiness.TyreModelSave(tyreModelMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreModelMasterList")]
        public async Task<IActionResult> GetTyreModelMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreModelBusiness.GetTyreModelMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateTyre")]
        public async Task<IActionResult> CheckDuplicateTyre(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreModelBusiness.CheckDuplicateTyre(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TyreModelMasterDelete")]
        public async Task<IActionResult> TyreModelMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreModelBusiness.TyreModelMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("MaintanenceMasterSave")]
        public async Task<IActionResult> MaintanenceMasterSave(MaintanenceMasterModel maintanenceMasterModel)
        {
            if (maintanenceMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await maintanenceMasterBusiness.MaintanenceMasterSave(maintanenceMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetMaintanenceMasterList")]
        public async Task<IActionResult> GetMaintanenceMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await maintanenceMasterBusiness.GetMaintanenceMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateMaintanence")]
        public async Task<IActionResult> CheckDuplicateMaintanence(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await maintanenceMasterBusiness.CheckDuplicateMaintanence(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("MaintanenceMasterDelete")]
        public async Task<IActionResult> MaintanenceMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await maintanenceMasterBusiness.MaintanenceMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripExpTypeMasterList")]
        public async Task<IActionResult> GetTripExpTypeMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripExpTypeBusiness.GetTripExpTypeMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TripExpTypeMasterSave")]
        public async Task<IActionResult> TripExpTypeMasterSave(TripExpTypeMasterModel tripExpTypeMasterModel)
        {
            if (tripExpTypeMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripExpTypeBusiness.TripExpTypeMasterSave(tripExpTypeMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateTripExpType")]
        public async Task<IActionResult> CheckDuplicateTripExpType(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripExpTypeBusiness.CheckDuplicateTripExpType(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TripExpTypeMasterDelete")]
        public async Task<IActionResult> TripExpTypeMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripExpTypeBusiness.TripExpTypeMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FleetGroupMasterSave")]
        public async Task<IActionResult> FleetGroupMasterSave(FleetGroupMasterModel fleetGroupMasterModel)
        {
            if (fleetGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGroupMasterBusiness.FleetGroupMasterSave(fleetGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFleetGroupMasterList")]
        public async Task<IActionResult> GetFleetGroupMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGroupMasterBusiness.GetFleetGroupMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("chkDesGroup")]
        public async Task<IActionResult> chkDesGroup(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGroupMasterBusiness.chkDesGroup(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FleetGroupMasterDelete")]
        public async Task<IActionResult> FleetGroupMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGroupMasterBusiness.FleetGroupMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleMfrMasterSave")]
        public async Task<IActionResult> VehicleMfrMasterSave(VehicleMfrMasterModel vehicleMfrMasterModel)
        {
            if (vehicleMfrMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleMfrMasterBusiness.VehicleMfrMasterSave(vehicleMfrMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleMfrMasterList")]
        public async Task<IActionResult> GetVehicleMfrMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleMfrMasterBusiness.GetVehicleMfrMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleMfrMasterChkActName")]
        public async Task<IActionResult> VehicleMfrMasterChkActName(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleMfrMasterBusiness.VehicleMfrMasterChkActName(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleMfrMasterDelete")]
        public async Task<IActionResult> VehicleMfrMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleMfrMasterBusiness.VehicleMfrMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("VehicleFinCompMasterSave")]
        public async Task<IActionResult> VehicleFinCompMasterSave(VehicleFinCompModel vehicleFinCompModel)
        {
            if (vehicleFinCompModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFinCompMasterBusiness.VehicleFinCompMasterSave(vehicleFinCompModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleFinCompMasterList")]
        public async Task<IActionResult> GetVehicleFinCompMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFinCompMasterBusiness.GetVehicleFinCompMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleFinCompMasterChkActName")]
        public async Task<IActionResult> VehicleFinCompMasterChkActName(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFinCompMasterBusiness.VehicleFinCompMasterChkActName(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleFinCompMasterDelete")]
        public async Task<IActionResult> VehicleFinCompMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFinCompMasterBusiness.VehicleFinCompMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("VehicleFltTypeMstSave")]
        public async Task<IActionResult> VehicleFltTypeMstSave(VehicleFltTypeGroupMstModel vehicleFltTypeGroupMstModel)
        {
            if (vehicleFltTypeGroupMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltTypeGroupMstBusiness.VehicleFltTypeMstSave(vehicleFltTypeGroupMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleFltGroupMstList")]
        public async Task<IActionResult> GetVehicleFltGroupMstList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltTypeGroupMstBusiness.GetVehicleFltGroupMstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("VehicleFltTypeGroupDelete")]
        public async Task<IActionResult> VehicleFltTypeGroupDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltTypeGroupMstBusiness.VehicleFltTypeGroupDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateVehTypeName")]
        public async Task<IActionResult> CheckDuplicateVehTypeName(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltTypeGroupMstBusiness.CheckDuplicateVehTypeName(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateVehTypeCode")]
        public async Task<IActionResult> CheckDuplicateVehTypeCode(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltTypeGroupMstBusiness.CheckDuplicateVehTypeCode(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFleetGodownMaserList")]
        public async Task<IActionResult> GetFleetGodownMaserList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGodownMasterBusiness.GetFleetGodownMaserList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FleetGodownMaserSave")]
        public async Task<IActionResult> FleetGodownMaserSave(FleetGodownMasterModel fleetGodown)
        {
            if (fleetGodown == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGodownMasterBusiness.FleetGodownMaserSave(fleetGodown);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FleetGodownMasterDelete")]
        public async Task<IActionResult> FleetGodownMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGodownMasterBusiness.FleetGodownMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateGodownShortCode")]
        public async Task<IActionResult> CheckDuplicateGodownShortCode(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGodownMasterBusiness.CheckDuplicateGodownShortCode(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateGodownDesc")]
        public async Task<IActionResult> CheckDuplicateGodownDesc(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetGodownMasterBusiness.CheckDuplicateGodownDesc(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GodownStockSave")]
        public async Task<IActionResult> GodownStockSave(GodownStockModel godownStockModel)
        {
            if (godownStockModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await godownStockBusiness.GodownStockSave(godownStockModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFltGodownList")]
        public async Task<IActionResult> GetFltGodownList()
        {
            try
            {
                var result = await godownStockBusiness.GetFltGodownList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSparesLubesStockInnergrid")]
        public async Task<IActionResult> GetSparesLubesStockInnergrid(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await godownStockBusiness.GetSparesLubesStockInnergrid(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
