using Consignment.Business;
using Microsoft.AspNetCore.Authorization;
using Consignment.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ConsignmentController : ControllerBase
    {
        readonly IConsignmentBusiness consignmentBusiness;
  
        public ConsignmentController(IConsignmentBusiness _consignmentBusiness)
        {
            consignmentBusiness = _consignmentBusiness;
        }
        /// <summary>

        /// </summary>
        /// <param name="FinAccountsMasterModel"></param>
        [HttpPost("ConsignmentSave")]
        public async Task<IActionResult> ConsignmentSave(ConsignmentModel consignmentModel)
        {
            if (consignmentModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.ConsignmentSave(consignmentModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
    }
}

