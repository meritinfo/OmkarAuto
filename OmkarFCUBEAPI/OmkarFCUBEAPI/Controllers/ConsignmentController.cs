using Consignment.Business;
using Microsoft.AspNetCore.Authorization;
using Consignment.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Shared.Models;
using Consignment.Repository;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ConsignmentController : ControllerBase
    {
        readonly IConsignmentBusiness consignmentBusiness;
        readonly IEwayBillBusiness ewayBillBusiness;
        public ConsignmentController(IConsignmentBusiness _consignmentBusiness,
            IEwayBillBusiness _ewayBillBusiness)
        {
            consignmentBusiness = _consignmentBusiness;
            ewayBillBusiness = _ewayBillBusiness;
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
        //[HttpPost("TripSave")]
        //public async Task<IActionResult> TripSave(TripModel tripModel)
        //{
        //    if (tripModel == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await consignmentBusiness.ConsignmentSave(tripModel);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpPost("ConsignmentDelete")]
        public async Task<IActionResult> ConsignmentDelete(Request req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.ConsignmentDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetConsignmentList")]
        public async Task<IActionResult> GetConsignmentList(PageRequestDtBrVh request)
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
       
        [HttpPost("GetKms")]
        public async Task<IActionResult> GetKms(KmsModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetKms(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripKms")]
        public async Task<IActionResult> GetTripKms(KmsModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetTripKms(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripKms2")]
        public async Task<IActionResult> GetTripKms2(KmsModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetTripKms2(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDslToBe")]
        public async Task<IActionResult> GetDslToBe(DslModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetDslToBe(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetAdBlueToBe")]
        public async Task<IActionResult> GetAdBlueToBe(AdBlueModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetAdBlueToBe(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateLr")]
        public async Task<IActionResult> CheckDuplicateLr(GcModel request)
        {
            try
            {
                var result = await consignmentBusiness.CheckDuplicateLr(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetGcSeries")]
        public async Task<IActionResult> GetGcSeries(GcModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetGcSeries(request);

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
        [HttpPost("GetLRSeriesForBill")]
        public async Task<IActionResult> GetLRSeriesforBill()
        {
            try
            {
                var result = await consignmentBusiness.GetLRSeriesForBill();

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

        [HttpPost("GetEWayBillExtList")]
        public async Task<IActionResult> GetEWayBillExtList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ewayBillBusiness.GetEWayBillExtList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EWayBillExtend")]
        public async Task<IActionResult> EWayBillExtend(EwayBillExtModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ewayBillBusiness.EWayBillExtend(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

