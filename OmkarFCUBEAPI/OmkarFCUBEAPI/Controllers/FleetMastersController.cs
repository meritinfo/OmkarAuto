using FleetMasters.Business;
using FreightMasters.Business;
using FreightMasters.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FleetMasters.Models;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FleetMastersController : ControllerBase
    {
        readonly IVehicleTypeGroupMasterBusiness vehicleTypeGroupMasterBusiness;
        public FleetMastersController(IVehicleTypeGroupMasterBusiness _vehicleTypeGroupMasterBusiness)
        {
            vehicleTypeGroupMasterBusiness = _vehicleTypeGroupMasterBusiness;            
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

    }

}
