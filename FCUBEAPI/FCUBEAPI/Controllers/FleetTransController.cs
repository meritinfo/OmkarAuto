using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FleetTrans.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using FleetTrans.Models;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using FleetMasters.Business;
using FleetMasters.Models;
using Org.BouncyCastle.Ocsp;

namespace FCUBEAPI.Controllers
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
        readonly IVehicleInstPmtBusiness vehicleInstPmtBusiness;
        //  readonly IDriverSalaryStatementBusiness driverSalaryStatementBusiness;
        readonly ITyrePurchaseMasterBusiness tyrePurchaseMasterBusiness;
        readonly IDriverSalaryStmtBusiness driverSalaryStmtBusiness;
        readonly IExpTruckArrRptBusiness expTruckArrRptBusiness;
        readonly IDocRenewalRptBusiness docRenewalRptBusiness;
        readonly IDieselStatementRptBusiness dieselStatementRptBusiness;
        readonly ITripPaymentsRptBusiness tripPaymentsRptBusiness;
        readonly ITripStatusRptBusiness tripStatusRptBusiness;
        readonly IDailyLoadingRptBusiness dailyLoadingRptBusiness;
        readonly IVehiEmiBusiness vehiEmiBusiness;

        public FleetTransController(IOptions<DBModel> _dbconnection,
            IDocRenewalEntryBusiness _DocRenewalEntryBusiness, 
            ITripPaymentsBusiness _TripPaymentsBusiness,ITripMasterBusiness _tripMasterBusiness, 
            IDieselStatementBusiness _dieselStatementBusiness, 
            IBillStatementBusiness _billStatementBusiness, 
            IDriverSalaryStmtBusiness  _driverSalaryStmtBusiness,
            IExpTruckArrRptBusiness _expTruckArrRptBusiness,
            IDocRenewalRptBusiness _docRenewalRptBusiness,
            ITyrePurchaseMasterBusiness _tyrePurchaseMasterBusiness,
            IDieselStatementRptBusiness _dieselStatementRptBusiness,
            ITripPaymentsRptBusiness _tripPaymentsRptBusiness,
            ITripStatusRptBusiness _tripStatusRptBusiness,
            IDailyLoadingRptBusiness _dailyLoadingRptBusiness,
            IVehicleInstPmtBusiness _vehicleInstPmtBusiness,
            IVehiEmiBusiness _vehiEmiBusiness)
        {
            dbconnection = _dbconnection;
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
            tyrePurchaseMasterBusiness = _tyrePurchaseMasterBusiness;
            tripStatusRptBusiness = _tripStatusRptBusiness;
            dailyLoadingRptBusiness = _dailyLoadingRptBusiness;

            vehiEmiBusiness = _vehiEmiBusiness;
            vehicleInstPmtBusiness = _vehicleInstPmtBusiness;
        }

       
        [HttpPost("GetCreditAcList2")]
        public async Task<IActionResult> GetCreditAcList2(AcModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("GetCrAcListForCustWizard")]
        public async Task<IActionResult> GetCrAcListForCustWizard()
        {
            try
            {
                var result = await tripPaymentsBusiness.GetCrAcListForCustWizard();

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
        public async Task<IActionResult> GetTripPaymentsList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("GetTripFromAndToDetail")]
        public async Task<IActionResult> GetTripFromAndToDetail(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsBusiness.GetTripFromAndToDetail(request);

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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


        [HttpPost("GetTripSheetList")]
        public async Task<IActionResult> GetTripSheetList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetOpeningBal")]
        public async Task<IActionResult> GetOpeningBal(OpBalModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("GetLastTripDriver")]
        public async Task<IActionResult> GetLastTripDriver(OpBalModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetLastTripDriver(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDslOpeningBalforPmt")]
        public async Task<IActionResult> GetDslOpeningBalforPmt(OpBalModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetDslOpeningBalforPmt(request);

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        public async Task<IActionResult> GetDriverDetail(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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


        [HttpPost("GetDieselStatementInnerGridList")]
        public async Task<IActionResult> GetDieselStatementInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetDieselStatementList")]
        public async Task<IActionResult> GetDieselStatementList(ReportRequestModel request)
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
        public async Task<IActionResult> GetDieselStatementSearchList(ReportRequestModel request)
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

        [HttpPost("GetHappayDieselSearchList")]
        public async Task<IActionResult> GetHappayDieselSearchList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.GetHappayDieselSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetHappayDieselList")]
        public async Task<IActionResult> GetHappayDieselList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.GetHappayDieselList(request);

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetBillStatementList")]
        public async Task<IActionResult> GetBillStatementList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("SaveBillStatementDetails")]
        public async Task<IActionResult> SaveBillStatementDetails(BillStatementModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetBillStatementInnerGridList")]
        public async Task<IActionResult> GetBillStatementInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetBillStmtCreditAcList")]
        public async Task<IActionResult> GetBillStmtCreditAcList()
        {
            try
            {
                var result = await billStatementBusiness.GetBillStmtCreditAcList();

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetDriverSalaryInnerGridList")]
        public async Task<IActionResult> GetDriverSalaryInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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


        [HttpPost("GetDriverSalarySearchList")]
        public async Task<IActionResult> GetDriverSalarySearchList(DriverSalarySearchListRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
       

        [HttpPost("GetDriverSalaryStmtList")]
        public async Task<IActionResult> GetDriverSalaryStatementList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("GetUserDetails")]
        public async Task<IActionResult> GetUserDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetUserDetails(request);

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

        [HttpPost("GetOtherTripOpenList")]
        public async Task<IActionResult> GetOtherTripOpenList(ReportRequestModel request)
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
       
        [HttpPost("GetTripPaymentsCreditList")]
        public async Task<IActionResult> GetTripPaymentsRptList()
        {
            try
            {
                var result = await tripPaymentsRptBusiness.GetTripPaymentsCreditList();
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
        [HttpPost("TyrePurchaseMasterSave")]
        public async Task<IActionResult> TyrePurchaseMasterSave()
        {
            try
            {

                var refDocAttachedImage = HttpContext.Request.Form.Files["refDocAttachedImage"];

                TyrePurchaseMasterModel tyrePurchaseMasterModel = JsonConvert.DeserializeObject<TyrePurchaseMasterModel>(HttpContext.Request.Form["datadetails"]);
                tyrePurchaseMasterModel.RefDocAttachedImage = "";

                if (refDocAttachedImage != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(refDocAttachedImage.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(refDocAttachedImage.FileName);
                   
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tyrePurchase/refDocAttachedImage/");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await refDocAttachedImage.CopyToAsync(fileStream);
                        tyrePurchaseMasterModel.RefDocAttachedImage = imageName;
                    }
                }
                var result = await tyrePurchaseMasterBusiness.TyrePurchaseMasterSave(tyrePurchaseMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyrePurchaseMasterList")]
        public async Task<IActionResult> GetTyrePurchaseMasterList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePurchaseMasterBusiness.GetTyrePurchaseMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TyrePurchaseMasterDelete")]
        public async Task<IActionResult> TyrePurchaseMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePurchaseMasterBusiness.TyrePurchaseMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkTyreNoDuplicate")]
        public async Task<IActionResult> ChkTyreNoDuplicate(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePurchaseMasterBusiness.ChkTyreNoDuplicate(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyrePurchaseMasterInnerGridList")]
        public async Task<IActionResult> GetTyrePurchaseMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePurchaseMasterBusiness.GetTyrePurchaseMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBrandList")]
        public async Task<IActionResult> GetBrandList()
        {
            try
            {
                var result = await tyrePurchaseMasterBusiness.GetBrandList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetModelList")]
        public async Task<IActionResult> GetModelList()
        {
            try
            {
                var result = await tyrePurchaseMasterBusiness.GetModelList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetVendorList")]
        public async Task<IActionResult> GetVendorList()
        {
            try
            {
                var result = await tyrePurchaseMasterBusiness.GetVendorList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("GetDailyLoadingRptList")]
        public async Task<IActionResult> GetDailyLoadingRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dailyLoadingRptBusiness.GetDailyLoadingRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDailyLoadingRptExcel")]
        public async Task<IActionResult> GetDailyLoadingRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dailyLoadingRptBusiness.GetDailyLoadingRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleInstScheduleList")]
        public async Task<IActionResult> GetVehicleInstScheduleList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehiEmiBusiness.GetVehicleInstScheduleList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleInstScheduleInnerGridList")]
        public async Task<IActionResult> GetVehicleInstScheduleInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehiEmiBusiness.GetVehicleInstScheduleInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleInstScheduleMstSave")]
        public async Task<IActionResult> VehicleInstScheduleMstSave(VehicleInstScheduleModel vehicleInst)
        {
            if (vehicleInst == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehiEmiBusiness.VehicleInstScheduleMstSave(vehicleInst);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleInstScheduleDelete")]
        public async Task<IActionResult> VehicleInstScheduleDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehiEmiBusiness.VehicleInstScheduleDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("VehicleInstPmtSave")]
        public async Task<IActionResult> VehicleInstPmtSave(VehicleInstPmtModel vehicleInstPmtModel)
        {
            if (vehicleInstPmtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleInstPmtBusiness.VehicleInstPmtSave(vehicleInstPmtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleInstPmtMasterList")]
        public async Task<IActionResult> GetVehicleInstPmtMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleInstPmtBusiness.GetVehicleInstPmtMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("VehicleInstPmtMasterDelete")]
        public async Task<IActionResult> VehicleInstPmtMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleInstPmtBusiness.VehicleInstPmtMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

