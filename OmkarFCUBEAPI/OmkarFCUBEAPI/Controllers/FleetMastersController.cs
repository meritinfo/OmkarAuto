using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FleetMasters.Models;
using FleetMasters.Business;
using Microsoft.AspNetCore.Authorization;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FleetMastersController : ControllerBase
    {
        readonly IVehicleTypeGroupMasterBusiness vehicleTypeGroupMasterBusiness;
        readonly IVehicleTypeMasterBusiness vehicleTypeMasterBusiness;
        readonly IVehicleFltMasterBusiness vehicleFltMasterBusiness;
        readonly IDocRenewalMasterBusiness docRenewalMasterBusiness;
        readonly IBrandMasterBusiness brandMasterBusiness;
        readonly ITyrePositionMasterBusiness tyrePositionMasterBusiness;
        public FleetMastersController(IVehicleTypeGroupMasterBusiness _vehicleTypeGroupMasterBusiness, IVehicleFltMasterBusiness _vehicleFltMasterBusiness, IVehicleTypeMasterBusiness _vehicleTypeMasterBusiness, IDocRenewalMasterBusiness _docRenewalMasterBusiness, IBrandMasterBusiness _brandMasterBusiness, ITyrePositionMasterBusiness _tyrePositionMasterBusiness)
        {
            vehicleTypeGroupMasterBusiness = _vehicleTypeGroupMasterBusiness;
            vehicleTypeMasterBusiness = _vehicleTypeMasterBusiness;
            vehicleFltMasterBusiness = _vehicleFltMasterBusiness;
            docRenewalMasterBusiness = _docRenewalMasterBusiness;
            brandMasterBusiness = _brandMasterBusiness;
            tyrePositionMasterBusiness = _tyrePositionMasterBusiness;
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
