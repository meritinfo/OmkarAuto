using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FleetTrans.Models;
using FleetTrans.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;


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
        readonly IDieselStatementBusiness dieselStatementBusiness;
        readonly IBillStatementBusiness billStatementBusiness;
      //  readonly IDriverSalaryStatementBusiness driverSalaryStatementBusiness;

        public FleetTransController(IDocRenewalEntryBusiness _DocRenewalEntryBusiness, ITripPaymentsBusiness _TripPaymentsBusiness,ITripMasterBusiness _tripMasterBusiness, IDieselStatementBusiness _dieselStatementBusiness, IBillStatementBusiness _billStatementBusiness)
        {
            docRenewalEntryBusiness = _DocRenewalEntryBusiness;
            tripPaymentsBusiness = _TripPaymentsBusiness;
            tripMasterBusiness = _tripMasterBusiness;
            dieselStatementBusiness = _dieselStatementBusiness;
            billStatementBusiness = _billStatementBusiness;
           // driverSalaryStatementBusiness = _driverSalaryStatementBusiness;
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
        public async Task<IActionResult> GetDocRenewalEntryList(PageRequest request)
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

        [HttpPost("GetDieselStatementList")]
        public async Task<IActionResult> GetDieselStatementList(PageRequest request)
        {
            try
            {
                var result = await dieselStatementBusiness.GetDieselStatementList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillStatementList")]
        public async Task<IActionResult> GetBillStatementList(PageRequest request)
        {
            try
            {
                var result = await billStatementBusiness.GetBillStatementList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpPost("GetDriverSalaryStatementList")]
        //public async Task<IActionResult> GetDriverSalaryStatementList(DriverSalaryListRequest request)
        //{
        //    try
        //    {
        //        var result = await driverSalaryStatementBusiness.GetDriverSalaryStatementList(request);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
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
       
        [HttpPost("GetCreditAcList2")]
        public async Task<IActionResult> GetCreditAcList2(AcModel request)
        {
            try
            {
                var result = await tripPaymentsBusiness.GetCreditAcList2(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCreditAcList")]
        public async Task<IActionResult> GetCreditAcList()
        {
            try
            {
                var result = await tripPaymentsBusiness.GetCreditAcList();

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
        public async Task<IActionResult> GetTripPaymentsList(PageRequest request)
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
        [HttpPost("GetTripDetail")]
        public async Task<IActionResult> GetTripDetail(TripVehicleModel request)
        {
            try
            {
                var result = await tripPaymentsBusiness.GetTripDetail(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetOpeningBal")]
        public async Task<IActionResult> GetOpeningBal(OpBalModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetOpeningBal(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetIncentiveRate")]
        public async Task<IActionResult> GetIncentiveRate(IncentiveRateModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetIncentiveRate(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPenaltyRate")]
        public async Task<IActionResult> GetPenaltyRate(PenaltyRateModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetPenaltyRate(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBhattaRate")]
        public async Task<IActionResult> GetBhattaRate(BhattaRateModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetBhattaRate(request);

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
        public async Task<IActionResult> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request)
        {
            try
            {
                var result = await tripMasterBusiness.GetTripSheetInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDieselStatementSearchList")]
        public async Task<IActionResult> GetDieselStatementSearchList(DieselStatementSearchListRequest request)
        {
            try
            {
                var result = await dieselStatementBusiness.GetDieselStatementSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      

        [HttpPost("SaveDieselStatementDetails")]
        public async Task<IActionResult> SaveDieselStatementDetails(DieselStatementSaveRequest request)
        {
            try
            {
                var result = await dieselStatementBusiness.SaveDieselStatementDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillStatementSearchList")]
        public async Task<IActionResult> GetBillStatementSearchList(BillStatementSearchListRequest request)
        {
            try
            {
                var result = await billStatementBusiness.GetBillStatementSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("SaveBillStatementDetails")]
        public async Task<IActionResult> SaveBillStatementDetails(BillStatementSaveRequest request)
        {
            try
            {
                var result = await billStatementBusiness.SaveBillStatementDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOtherTripOpenList")]
        public async Task<IActionResult> GetOtherTripOpenList(TripSheetListRequest request)
        {
            try
            {
                var result = await tripMasterBusiness.GetOtherTripOpenList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("OtherTripOpenSave")]
        public async Task<IActionResult> OtherTripOpenSave(TripMasterModel tripMasterModel)
        {
            if (tripMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.OtherTripOpenSave(tripMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
         [HttpPost("OtherTripOpenDelete")]
        public async Task<IActionResult> OtherTripOpenDelete(Request request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.OtherTripOpenDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetNextTripNo")]
        public async Task<IActionResult> GetNextTripNo(OpBalModel tripNoFilter)
        {
            if (tripNoFilter == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetNextTripNo(tripNoFilter);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       




    }
}

