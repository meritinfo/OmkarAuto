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
        public FleetMastersController(IVehicleTypeGroupMasterBusiness _vehicleTypeGroupMasterBusiness, IVehicleTypeMasterBusiness _vehicleTypeMasterBusiness)
        {
            vehicleTypeGroupMasterBusiness = _vehicleTypeGroupMasterBusiness;
            vehicleTypeMasterBusiness = _vehicleTypeMasterBusiness;
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
    }

}
