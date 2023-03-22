using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Business;
using Shared.Models;
using System.Threading.Tasks;
using System;
using FreightMasters.Models;
using FreightMasters.Business;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreightMastersController : ControllerBase
    {
        readonly IFreightMastersBusiness freightMastersBusiness;
        public FreightMastersController(IFreightMastersBusiness _freightMastersBusiness)
        {
            freightMastersBusiness = _freightMastersBusiness;
        }

        /// <summary>
        /// Controller method for login to the application
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        [HttpPost("DestinationMasterDetailsSave")]
        public async Task<IActionResult> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel)
        {
            if (destinationMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightMastersBusiness.DestinationMasterDetailsSave(destinationMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
