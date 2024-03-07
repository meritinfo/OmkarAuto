using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

using FleetTrans.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;

using FleetTrans.Models;
using FleetMasters.Business;
using FinTrans.Models;
using Newtonsoft.Json;
using System.Data.Common;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Consignment.Business;
using System.Xml.Linq;
using FreightMasters.Business;
using FreightMasters.Models;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FleetTransController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IDocRenewalEntryBusiness docRenewalEntryBusiness;
        readonly ITripPaymentsBusiness tripPaymentsBusiness;
        readonly ITripMasterBusiness tripMasterBusiness;
        readonly IDieselStatementBusiness dieselStatementBusiness;
        readonly IBillStatementBusiness billStatementBusiness;
        //  readonly IDriverSalaryStatementBusiness driverSalaryStatementBusiness;
        readonly IDriverSalaryStmtBusiness driverSalaryStmtBusiness;
        readonly IExpTruckArrRptBusiness expTruckArrRptBusiness;
        readonly IDocRenewalRptBusiness docRenewalRptBusiness;
        readonly IDieselStatementRptBusiness dieselStatementRptBusiness;
        readonly ITripPaymentsRptBusiness tripPaymentsRptBusiness;
        readonly ITripStatusRptBusiness tripStatusRptBusiness;

        public FleetTransController(IDocRenewalEntryBusiness _DocRenewalEntryBusiness, 
            ITripPaymentsBusiness _TripPaymentsBusiness,ITripMasterBusiness _tripMasterBusiness, 
            IDieselStatementBusiness _dieselStatementBusiness, 
            IBillStatementBusiness _billStatementBusiness, 
            IDriverSalaryStmtBusiness  _driverSalaryStmtBusiness,
            IExpTruckArrRptBusiness _expTruckArrRptBusiness,
             IDocRenewalRptBusiness _docRenewalRptBusiness,
              IDieselStatementRptBusiness _dieselStatementRptBusiness,
                ITripPaymentsRptBusiness _tripPaymentsRptBusiness,
                 ITripStatusRptBusiness _tripStatusRptBusiness)
        {
            docRenewalEntryBusiness = _DocRenewalEntryBusiness;
            tripPaymentsBusiness = _TripPaymentsBusiness;
            tripMasterBusiness = _tripMasterBusiness;
            dieselStatementBusiness = _dieselStatementBusiness;
            billStatementBusiness = _billStatementBusiness;
            driverSalaryStmtBusiness = _driverSalaryStmtBusiness;
            expTruckArrRptBusiness = _expTruckArrRptBusiness;
            docRenewalRptBusiness = _docRenewalRptBusiness;
            dieselStatementRptBusiness = _dieselStatementRptBusiness;
            tripPaymentsRptBusiness = _tripPaymentsRptBusiness;
            tripStatusRptBusiness = _tripStatusRptBusiness;
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
        [HttpPost("GetDriverSalaryStmtList")]
        public async Task<IActionResult> GetDriverSalaryStatementList(PageRequest request)
        {
            try
            {
                var result = await driverSalaryStmtBusiness.GetDriverSalaryStatementList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripSheetList")]
        public async Task<IActionResult> GetTripSheetList(PageRequestDtBrVh request)
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
        [HttpPost("TripPaymentsDelete")]
        public async Task<IActionResult> TripPaymentsDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsBusiness.TripPaymentsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsStatementDelete")]
        public async Task<IActionResult> BillsStatementDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billStatementBusiness.BillsStatementDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DriverSalaryDelete")]
        public async Task<IActionResult> DriverSalaryDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverSalaryStmtBusiness.DriverSalaryDelete(req);

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
        [HttpPost("TripPaymentsSaveNew")]
        public async Task<IActionResult> TripPaymentsSaveNew(TripPaymentsModel tripPaymentsModel)
        {
            if (tripPaymentsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsBusiness.TripPaymentsSaveNew(tripPaymentsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TripPaymentsEdit")]
        public async Task<IActionResult> TripPaymentsEdit(TripPaymentsModel tripPaymentsModel)
        {
            if (tripPaymentsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsBusiness.TripPaymentsEdit(tripPaymentsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripPaymentsList")]
        public async Task<IActionResult> GetTripPaymentsList(PageRequestDtBrVh request)
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
        [HttpPost("GetTripDslDetail")]
        public async Task<IActionResult> GetTripDslDetail(TripVehicleModel request)
        {
            try
            {
                var result = await tripPaymentsBusiness.GetTripDslDetail(request);

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
        [HttpPost("GetDslOpeningBal")]
        public async Task<IActionResult> GetDslOpeningBal(OpBalModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetDslOpeningBal(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetAdblueOpeningBal")]
        public async Task<IActionResult> GetAdblueOpeningBal(OpBalModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetAdblueOpeningBal(request);

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
        [HttpPost("GetPenaltyRateNew")]
        public async Task<IActionResult> GetPenaltyRateNew(PenaltyRateModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetPenaltyRateNew(request);

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
        [HttpPost("GetDriverDetail")]
        public async Task<IActionResult> GetDriverDetail(DriverRequestModel request)
        {
            try
            {
                var result = await tripMasterBusiness.GetDriverDetail(request);

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

        [HttpPost("GetDieselStatementList")]
        public async Task<IActionResult> GetDieselStatementList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetDieselStatementSearchList")]
        public async Task<IActionResult> GetDieselStatementSearchList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        public async Task<IActionResult> SaveDieselStatementDetails(DieselStatementModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("DieselStatementDetailsDelete")]
        public async Task<IActionResult> DieselStatementDetailsDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.DieselStatementDetailsDelete(request);

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
        [HttpPost("GetDriverSalarySearchList")]
        public async Task<IActionResult> GetDriverSalarySearchList(DriverSalarySearchListRequest request)
        {
            try
            {
                var result = await driverSalaryStmtBusiness.GetDriverSalarySearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("SaveBillStatementDetails")]
        public async Task<IActionResult> SaveBillStatementDetails(BillStatementModel request)
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
        public async Task<IActionResult> GetOtherTripOpenList(PageFromDtToDtRequest request)
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
        public async Task<IActionResult> OtherTripOpenDelete(RequestModel request)
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
        [HttpPost("SaveDriverSalaryStatementDetails")]
        public async Task<IActionResult> SaveDriverSalaryStatementDetails(DriverSalaryStatementModel request)
        {
            try
            {
                var result = await driverSalaryStmtBusiness.SaveDriverSalaryStatementDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillStatementInnerGridList")]
        public async Task<IActionResult> GetBillStatementInnerGridList(BillStatementInnerGridRequest request)
        {
            try
            {
                var result = await billStatementBusiness.GetBillStatementInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDriverSalaryInnerGridList")]
        public async Task<IActionResult> GetDriverSalaryInnerGridList(DriverSalaryInnerGridRequest request)
        {
            try
            {
                var result = await driverSalaryStmtBusiness.GetDriverSalaryInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDieselStatementInnerGridList")]
        public async Task<IActionResult> GetDieselStatementInnerGridList(DriverSalaryInnerGridRequest request)
        {
            try
            {
                var result = await dieselStatementBusiness.GetDieselStatementInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DocRenewalEntryDetailsSave")]
        public async Task<IActionResult> DocRenewalEntryDetailsSave()
        {
            try
            {
                var attach1 = HttpContext.Request.Form.Files["attach1"];
                var attach2 = HttpContext.Request.Form.Files["attach2"];

                DocRenewalEntryModel docRenewalEntryModel = JsonConvert.DeserializeObject<DocRenewalEntryModel>(HttpContext.Request.Form["datadetails"]);
                docRenewalEntryModel.Attach1 = "";
                docRenewalEntryModel.Attach2 = "";

                if (attach1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attach1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attach1.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/docrenewal/attach1/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attach1.CopyToAsync(fileStream);
                        docRenewalEntryModel.Attach1 = imageName;
                    }
                }
                if (attach2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attach2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attach2.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/docrenewal/attach2/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attach2.CopyToAsync(fileStream);
                        docRenewalEntryModel.Attach2 = imageName;
                    }
                }


                var result = await docRenewalEntryBusiness.DocRenewalEntryDetailsSave(docRenewalEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DocRenewalEntryDetailsDelete")]
        public async Task<IActionResult> DocRenewalEntryDetailsDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalEntryBusiness.DocRenewalEntryDetailsDelete(request);

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

        [HttpPost("GetDocRenewalList")]
        public async Task<IActionResult> GetDocRenewalList()
        {
            try
            {
                var result = await docRenewalEntryBusiness.GetDocRenewalList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetPaymentCreditAcList")]
        public async Task<IActionResult> GetPaymentCreditAcList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalEntryBusiness.GetPaymentCreditAcList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChkDocrenewalValidity")]
        public async Task<IActionResult> ChkDocrenewalValidity(DocRenewalEntryModel docRenewalEntryModel)
        {
            if (docRenewalEntryModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalEntryBusiness.ChkDocrenewalValidity(docRenewalEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetExpTruckArrRPTList")]
        public async Task<IActionResult> GetExpTruckArrRPTList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await expTruckArrRptBusiness.GetExpTruckArrRPTList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ExcelExpTruckArrRPTList")]
        public async Task<IActionResult> ExcelExpTruckArrRPTList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await expTruckArrRptBusiness.ExcelExpTruckArrRPTList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripStatusRPTList")]
        public async Task<IActionResult> GetTripStatusRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripStatusRptBusiness.GetTripStatusRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelTripStatusRptList")]
        public async Task<IActionResult> GetTripStatusRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripStatusRptBusiness.GetTripStatusRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDieselStatementRPTList")]
        public async Task<IActionResult> GetDieselStatementRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementRptBusiness.GetDieselStatementRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDocRenewalRPTList")]
        public async Task<IActionResult> GetDocRenewalRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalRptBusiness.GetDocRenewalRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelDieselStatementRptList")]
        public async Task<IActionResult> GetDieselStatementRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementRptBusiness.GetDieselStatementRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelDocRenewalRptList")]
        public async Task<IActionResult> ExcelDocRenewalRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalRptBusiness.ExcelDocRenewalRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripPaymentsRPTList")]
        public async Task<IActionResult> GetTripPaymentsRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsRptBusiness.GetTripPaymentsRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelTripPaymentsRptList")]
        public async Task<IActionResult> ExcelTripPaymentsRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsRptBusiness.ExcelTripPaymentsRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

