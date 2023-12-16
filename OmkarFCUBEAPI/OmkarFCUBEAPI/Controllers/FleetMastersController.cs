using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using SqlHelper.Models;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FleetMastersController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IVehicleTypeGroupMasterBusiness vehicleTypeGroupMasterBusiness;
        readonly IVehicleTypeMasterBusiness vehicleTypeMasterBusiness;
        readonly IVehicleFltMasterBusiness vehicleFltMasterBusiness;
        readonly IDocRenewalMasterBusiness docRenewalMasterBusiness;
        readonly IBrandMasterBusiness brandMasterBusiness;
        readonly ITyrePositionMasterBusiness tyrePositionMasterBusiness;
        readonly IDriverMasterBusiness driverMasterBusiness;
        readonly IExpensesTypeMasterBusiness expensestypeMasterBusiness;
        public FleetMastersController(IOptions<DBModel> _dbconnection, IVehicleTypeGroupMasterBusiness _vehicleTypeGroupMasterBusiness, IVehicleFltMasterBusiness _vehicleFltMasterBusiness, IVehicleTypeMasterBusiness _vehicleTypeMasterBusiness, IDocRenewalMasterBusiness _docRenewalMasterBusiness, IBrandMasterBusiness _brandMasterBusiness, ITyrePositionMasterBusiness _tyrePositionMasterBusiness, IDriverMasterBusiness _driverMasterBusiness, IExpensesTypeMasterBusiness _expensesTypeMasterBusiness)
        {
            dbconnection = _dbconnection;
            vehicleTypeGroupMasterBusiness = _vehicleTypeGroupMasterBusiness;
            vehicleTypeMasterBusiness = _vehicleTypeMasterBusiness;
            vehicleFltMasterBusiness = _vehicleFltMasterBusiness;
            docRenewalMasterBusiness = _docRenewalMasterBusiness;
            brandMasterBusiness = _brandMasterBusiness;
            tyrePositionMasterBusiness = _tyrePositionMasterBusiness;
            driverMasterBusiness = _driverMasterBusiness;
            expensestypeMasterBusiness = _expensesTypeMasterBusiness;
        }

        /// <summary>
        /// Controller method for vehicle type group master
        /// </summary>
        /// <param name="vehicleTypeGroupMasterModel"></param>
        [HttpPost("VehicleTypeGroupMasterSave")]
        public async Task<IActionResult> VehicleTypeGroupMasterSave(VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel)
        {
            if (vehicleTypeGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleTypeGroupMasterBusiness.VehicleTypeGroupMasterSave(vehicleTypeGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }       

        [HttpPost("GetVehicleList")]
        public async Task<IActionResult> GetVehicleList()
        {
            try
            {
                var result = await vehicleTypeGroupMasterBusiness.GetVehicleList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/driver/driverphoto/" + imageName);
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
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload/driver/drivinglicense/" + imageName);
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
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload/driver/hazdrivinglicense/" + imageName);
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
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload/driver/tempaddressprove/" + imageName);
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
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload/driver/peraddressprove/" + imageName);
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
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload/driver/aadharcard/" + imageName);
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
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload/driver/bankpassbook/" + imageName);
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
        public async Task<IActionResult> GetDriverMasterList(PageRequest request)
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
        public async Task<IActionResult> DriverMasterDetailsDelete(Request request)
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

        [HttpPost("VehicleFltMasterSave")]
        public async Task<IActionResult> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel)
        {
            if (vehicleFltMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleFltMasterBusiness.VehicleFltMasterSave(vehicleFltMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleFltInnerGridList")]
        public async Task<IActionResult> GetVehicleFltInnerGridList(Request req)
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
        public async Task<IActionResult> VehicalMasterDetailsDelete(Request req)
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
        public async Task<IActionResult> ChkVehicalNoExist(Request req)
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

        [HttpPost("GetBrandMasterList")]
        public async Task<IActionResult> GetBrandMasterList(PageRequest request)
        {
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


        [HttpPost("GetTyrePositionMasterList")]
        public async Task<IActionResult> GetTyrePositionMasterList(PageRequest request)
        {
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
        [HttpPost("GetVehicleTypeGroupMasterList")]
        public async Task<IActionResult> GetVehicleTypeGroupMasterList(PageRequest request)
        {
            try
            {
                var result = await vehicleTypeGroupMasterBusiness.GetVehicleTypeGroupMasterList(request);

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
        [HttpPost("GetVehicleTypeMasterList")]
        public async Task<IActionResult> GetVehicleTypeMasterList(PageRequest request)
        {
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
    }

}
