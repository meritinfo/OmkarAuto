using Consignment.Business;
using Microsoft.AspNetCore.Authorization;
using Consignment.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Shared.Business;
using Shared.Models;

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
       
        [HttpPost("GetVehicleNoForEwayBill")]
        public async Task<IActionResult> GetVehicleNoForEwayBill(VehicleModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetVehicleNoForEwayBill(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetContentList")]
        public async Task<IActionResult> GetContentList()
        {
            try
            {
                var result = await consignmentBusiness.GetContentList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleNoList")]
        public async Task<IActionResult> GetVehicleNoList()
        {
            try
            {
                var result = await consignmentBusiness.GetVehicleNoList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillingPartyList")]
        public async Task<IActionResult> GetBillingPartyList()
        {
            try
            {
                var result = await consignmentBusiness.GetBillingPartyList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLRSeries")]
        public async Task<IActionResult> GetLRSeries()
        {
            try
            {
                var result = await consignmentBusiness.GetLRSeries();

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

