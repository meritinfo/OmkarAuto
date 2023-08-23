using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

using FleetTrans.Business;
using Microsoft.AspNetCore.Authorization;

using FleetTrans.Models;
using FleetMasters.Business;
using Consignment.Business;


namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FleetTransController : ControllerBase
    {
        readonly IDocRenewalEntryBusiness docRenewalEntryBusiness;
        readonly ITripPaymentsBusiness tripPaymentsBusiness;
        readonly ITripMasterBusiness tripMasterBusiness;


        public FleetTransController(IDocRenewalEntryBusiness _DocRenewalEntryBusiness, ITripPaymentsBusiness _TripPaymentsBusiness,ITripMasterBusiness _tripMasterBusiness)
        {
            docRenewalEntryBusiness = _DocRenewalEntryBusiness;
            tripPaymentsBusiness = _TripPaymentsBusiness;
            tripMasterBusiness = _tripMasterBusiness;

        }
        /// <summary>

        /// </summary>
        /// <param name="FinAccountsMasterModel"></param>
        [HttpPost("DocRenewalEntryDetailsSave")]
        public async Task<IActionResult> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel)
        {
            if (docRenewalEntryModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalEntryBusiness.DocRenewalEntryDetailsSave(docRenewalEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDocRenewalEntryList")]
        public async Task<IActionResult> GetDocRenewalEntryList(DocRenewalEntryListRequest request)
        {
            try
            {
                var result = await docRenewalEntryBusiness.GetDocRenewalEntryList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripSheetList")]
        public async Task<IActionResult> GetTripSheetList(TripSheetListRequest request)
        {
            try
            {
                var result = await tripMasterBusiness.GetTripSheetList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDriverList")]
        public async Task<IActionResult> GetDriverList()
        {
            try
            {
                var result = await tripMasterBusiness.GetDriverList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TripPaymentsSave")]
        public async Task<IActionResult> TripPaymentsSave(TripPaymentsModel tripPaymentsModel)
        {
            if (tripPaymentsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsBusiness.TripPaymentsSave(tripPaymentsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripPaymentsList")]
        public async Task<IActionResult> GetTripPaymentsList(TripPaymentsListRequest request)
        {
            try
            {
                var result = await tripPaymentsBusiness.GetTripPaymentsList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TripMasterSave")]
        public async Task<IActionResult> TripMasterSave(TripMasterModel tripMasterModel)
        {
            if (tripMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.TripMasterSave(tripMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTripSheetInnerGridList")]
        public async Task<IActionResult> GetTripSheetInnerGridList()
        {
            try
            {
                var result = await tripMasterBusiness.GetTripSheetInnerGridList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

