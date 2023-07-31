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
        [HttpPost("GetConsignmentList")]
        public async Task<IActionResult> GetConsignmentList(ConsignmentListRequest request)
        {
            try
            {
                var result = await consignmentBusiness.GetConsignmentList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// </summary>
        [HttpPost("GetRateList")]
        public async Task<IActionResult> GetRateList()
        {
            try
            {
                var result = await consignmentBusiness.GetRateList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLocationList")]
        public async Task<IActionResult> GetLocationList()
        {
            try
            {
                var result = await consignmentBusiness.GetLocationList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

