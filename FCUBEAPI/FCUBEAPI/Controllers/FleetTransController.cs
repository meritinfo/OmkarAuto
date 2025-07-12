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
        readonly ITripSheetBusiness tripSheetBusiness;
        readonly IDieselStatementBusiness dieselStatementBusiness;
        readonly IBillStatementBusiness billStatementBusiness;
        readonly IVehicleInstPmtBusiness vehicleInstPmtBusiness;
        readonly ITyrePurchaseMasterBusiness tyrePurchaseMasterBusiness;
        readonly ITyreActivateMasterBusiness tyreActivateMasterBusiness;
        readonly ITyreDeActivateMasterBusiness tyreDeActivateMasterBusiness;
        readonly ITyreRegroupIssueMasterBusiness tyreRegroupIssueMasterBusiness;
        readonly IDriverSalaryStmtBusiness driverSalaryStmtBusiness;  
        readonly IVehiEmiBusiness vehiEmiBusiness;
        readonly ITyreRegroupRecdMasterBusiness tyreRegroupRecdMasterBusiness;
        readonly IFleetLoadEntryBusiness fleetLoadEntryBusiness;
        readonly ITyreSalesMasterBusiness tyreSalesMasterBusiness;
        readonly IVehicleRepMaintMasterBusiness vehicleRepMaintMasterBusiness;
        readonly ISparesPurchaseMasterBusiness sparesPurchaseMasterBusiness;   
        readonly IVehicleAdvBalReceiptMstBusiness vehicleAdvBalReceiptMstBusiness;
        readonly IVehicleAdvBalReceiptMstLLPBusiness vehicleAdvBalReceiptMstLLPBusiness;
        readonly IFastTagBusiness fastTagBusiness;
        readonly ITripEnrouteExpByCompanyBusiness tripEnrouteExpByCompanyBusiness;
        readonly IFastagDslRechargeEntryBusiness fastagDslRechargeEntryBusiness;
        readonly IDriverSalaryPaymentBusiness driverSalaryPaymentBusiness;
        readonly IFleetRptBusiness fleetRptBusiness;
        readonly IVendorPmtBusiness vendorPmtBusiness;

        public FleetTransController(IOptions<DBModel> _dbconnection,
            IDocRenewalEntryBusiness _DocRenewalEntryBusiness, 
            ITripPaymentsBusiness _TripPaymentsBusiness,
            ITripMasterBusiness _tripMasterBusiness,
            ITripSheetBusiness _tripSheetBusiness,
            IDieselStatementBusiness _dieselStatementBusiness, 
            IBillStatementBusiness _billStatementBusiness, 
            IDriverSalaryStmtBusiness  _driverSalaryStmtBusiness,
            ITyrePurchaseMasterBusiness _tyrePurchaseMasterBusiness,
            ITyreActivateMasterBusiness _tyreActivateMasterBusiness,
            ITyreDeActivateMasterBusiness _tyreDeActivateMasterBusiness,        
            IVehicleInstPmtBusiness _vehicleInstPmtBusiness,
            ITyreRegroupIssueMasterBusiness _tyreRegroupIssueMasterBusiness,
            ITyreRegroupRecdMasterBusiness _tyreRegroupRecdMasterBusiness,
            ITyreSalesMasterBusiness _tyreSalesMasterBusiness,
            IVehiEmiBusiness _vehiEmiBusiness,
            IFleetLoadEntryBusiness _fleetLoadEntryBusiness,
            IVehicleRepMaintMasterBusiness _vehicleRepMaintMasterBusiness,
            ISparesPurchaseMasterBusiness _sparesPurchaseMasterBusiness,
            IVehicleAdvBalReceiptMstBusiness _vehicleAdvBalReceiptMstBusiness,
            IVehicleAdvBalReceiptMstLLPBusiness _vehicleAdvBalReceiptMstLLPBusiness,
            IFastTagBusiness _fastTagBusiness,
            ITripEnrouteExpByCompanyBusiness _tripEnrouteExpByCompanyBusiness,
            IFastagDslRechargeEntryBusiness _fastagDslRechargeEntryBusiness,
            IDriverSalaryPaymentBusiness _driverSalaryPaymentBusiness,
            IFleetRptBusiness _fleetRptBusiness,
            IVendorPmtBusiness _vendorPmtBusiness)
        {
            dbconnection = _dbconnection;
            docRenewalEntryBusiness = _DocRenewalEntryBusiness;
            tripPaymentsBusiness = _TripPaymentsBusiness;
            tripMasterBusiness = _tripMasterBusiness;
            tripSheetBusiness = _tripSheetBusiness;
            dieselStatementBusiness = _dieselStatementBusiness;
            billStatementBusiness = _billStatementBusiness;
            driverSalaryStmtBusiness = _driverSalaryStmtBusiness;   
            tyrePurchaseMasterBusiness = _tyrePurchaseMasterBusiness;
            tyreActivateMasterBusiness = _tyreActivateMasterBusiness;
            tyreDeActivateMasterBusiness = _tyreDeActivateMasterBusiness;
            vehiEmiBusiness = _vehiEmiBusiness;
            vehicleInstPmtBusiness = _vehicleInstPmtBusiness;
            tyreRegroupIssueMasterBusiness = _tyreRegroupIssueMasterBusiness;
            tyreRegroupRecdMasterBusiness = _tyreRegroupRecdMasterBusiness;
            tyreRegroupRecdMasterBusiness = _tyreRegroupRecdMasterBusiness;
            fleetLoadEntryBusiness = _fleetLoadEntryBusiness;
            tyreSalesMasterBusiness = _tyreSalesMasterBusiness;
            vehicleRepMaintMasterBusiness =_vehicleRepMaintMasterBusiness;
            sparesPurchaseMasterBusiness = _sparesPurchaseMasterBusiness;
            vehicleAdvBalReceiptMstBusiness = _vehicleAdvBalReceiptMstBusiness;
            vehicleAdvBalReceiptMstLLPBusiness = _vehicleAdvBalReceiptMstLLPBusiness;
            fastTagBusiness = _fastTagBusiness;
            tripEnrouteExpByCompanyBusiness= _tripEnrouteExpByCompanyBusiness;
            fastagDslRechargeEntryBusiness = _fastagDslRechargeEntryBusiness;
            driverSalaryPaymentBusiness = _driverSalaryPaymentBusiness;
            fleetRptBusiness = _fleetRptBusiness;
            vendorPmtBusiness = _vendorPmtBusiness;
        }


        [HttpPost("GetCreditAcList2")]
        public async Task<IActionResult> GetCreditAcList2(RequestModel request)
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

        [HttpPost("GetLrDtlsForTripPmts")]
        public async Task<IActionResult> GetLrDtlsForTripPmts(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsBusiness.GetLrDtlsForTripPmts(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVoucherPrint")]
        public async Task<IActionResult> GetVoucherPrint(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripPaymentsBusiness.GetVoucherPrint(request);

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
        public async Task<IActionResult> TripPaymentsSave()
        {
            try
            {
                var attachment1 = HttpContext.Request.Form.Files["attachment1"];
                var attachment2 = HttpContext.Request.Form.Files["attachment2"];

                TripPaymentsModel tripPaymentsModel = JsonConvert.DeserializeObject<TripPaymentsModel>(HttpContext.Request.Form["datadetails"]);
                tripPaymentsModel.Attachment1 = "";
                tripPaymentsModel.Attachment2 = "";

                if (attachment1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachment1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachment1.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/trippayments/attachment1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachment1.CopyToAsync(fileStream);
                        tripPaymentsModel.Attachment1 = imageName;
                    }
                }
                if (attachment2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachment2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachment2.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/trippayments/attachment2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachment2.CopyToAsync(fileStream);
                        tripPaymentsModel.Attachment2 = imageName;
                    }
                }

                var result = await tripPaymentsBusiness.TripPaymentsSave(tripPaymentsModel);

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


        [HttpPost("GetTripMasterList")]
        public async Task<IActionResult> GetTripMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetTripMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("GetTripMasterInnerGridList")]
        public async Task<IActionResult> GetTripMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetTripMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTripMasterInnerSearchList")]
        public async Task<IActionResult> GetTripMasterInnerSearchList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetTripMasterInnerSearchList(request);

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


        [HttpPost("TripMasterDelete")]
        public async Task<IActionResult> TripMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.TripMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetNextTripNo")]
        public async Task<IActionResult> GetNextTripNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetNextTripNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetNextTripSalDate")]
        public async Task<IActionResult> GetNextTripSalDate(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripSheetBusiness.GetNextTripSalDate(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripJetPrintPdf")]
        public async Task<IActionResult> GetTripJetPrintPdf(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripSheetBusiness.GetTripJetPrintPdf(request);

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
        [HttpPost("GetExpList")]
        public async Task<IActionResult> GetExpList()
        {
            try
            {
                var result = await tripMasterBusiness.GetExpList();

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
                var result = await tripSheetBusiness.GetTripSheetList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTripSheetInnerGridList")]
        public async Task<IActionResult> GetTripSheetInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripSheetBusiness.GetTripSheetInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTripSheetInnerSearchList")]
        public async Task<IActionResult> GetTripSheetInnerSearchList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripSheetBusiness.GetTripSheetInnerSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("TripSheetDelete")]
        public async Task<IActionResult> TripSheetDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripSheetBusiness.TripSheetDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("TripSheetSave")]
        public async Task<IActionResult> TripSheetSave(TripSheetModel tripMasterModel)
        {
            if (tripMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripSheetBusiness.TripSheetSave(tripMasterModel);

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

        [HttpPost("DieselImportSave")]
        public async Task<IActionResult> DieselImportSave(DieselStatementModel dieselStmtModel)
        {
            if (dieselStmtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.DieselImportSave(dieselStmtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetDieselImportList")]
        public async Task<IActionResult> GetDieselImportList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.GetDieselImportList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetDieselImportInnerGridList")]
        public async Task<IActionResult> GetDieselImportInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.GetDieselImportInnerGridList(request);

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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/docrenewal/attach1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/docrenewal/attach2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
        public async Task<IActionResult> GetDocRenewalEntryList(ReportRequestModel request)
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

        //[HttpPost("GetExpTruckArrRPTList")]
        //public async Task<IActionResult> GetExpTruckArrRPTList(ReportRequestModel request)
        //{
        //    if (request == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await fleetRptBusiness.GetExpTruckArrRPTList(request);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpPost("ExcelExpTruckArrRPTList")]
        //public async Task<IActionResult> ExcelExpTruckArrRPTList(ReportRequestModel request)
        //{
        //    if (request == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await fleetRptBusiness.ExcelExpTruckArrRPTList(request);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpPost("GetTripStatusRPTList")]
        public async Task<IActionResult> GetTripStatusRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTripStatusRptList(request);

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
                var result = await fleetRptBusiness.GetTripStatusRptExcel(request);

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
                var result = await fleetRptBusiness.GetDocRenewalRptList(request);

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
                var result = await fleetRptBusiness.ExcelDocRenewalRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTripPaymentsCreditList")]
        public async Task<IActionResult> GetTripPaymentsCreditList()
        {
            try
            {
                var result = await fleetRptBusiness.GetTripPaymentsCreditList();
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
                var result = await fleetRptBusiness.GetTripPaymentsRptList(request);

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
                var result = await fleetRptBusiness.ExcelTripPaymentsRptList(request);

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
        [HttpPost("GetTyreBrandList")]
        public async Task<IActionResult> GetTyreBrandList()
        {
            try
            {
                var result = await tyrePurchaseMasterBusiness.GetTyreBrandList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSparesBrandList")]
        public async Task<IActionResult> GetSparesBrandList()
        {
            try
            {
                var result = await sparesPurchaseMasterBusiness.GetSparesBrandList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSparesList")]
        public async Task<IActionResult> GetSparesList()
        {
            try
            {
                var result = await sparesPurchaseMasterBusiness.GetSparesList();

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

        [HttpPost("GetVendorDetails")]
        public async Task<IActionResult> GetVendorDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyrePurchaseMasterBusiness.GetVendorDetails(request);

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
                var result = await fleetRptBusiness.GetDailyLoadingRptList(request);

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
                var result = await fleetRptBusiness.GetDailyLoadingRptExcel(request);

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
        public async Task<IActionResult> GetVehicleInstPmtMasterList(PageFromDtToDtRequest request)
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

        [HttpPost("checkVehicleLoanType")]
        public async Task<IActionResult> checkVehicleLoanType(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleInstPmtBusiness.checkVehicleLoanType(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleNoLoan")]
        public async Task<IActionResult> GetVehicleNoLoan(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleInstPmtBusiness.GetVehicleNoLoan(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("TyreActivateMasterSave")]
        public async Task<IActionResult> TyreActivateMasterSave(TyreActivateMasterModel tyreActivateMasterModel)
        {
            if (tyreActivateMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.TyreActivateMasterSave(tyreActivateMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreActivateMasterList")]
        public async Task<IActionResult> GetTyreActivateMasterList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.GetTyreActivateMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TyreActivateMasterDelete")]
        public async Task<IActionResult> TyreActivateMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.TyreActivateMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreActivateMasterInnerGridList")]
        public async Task<IActionResult> GetTyreActivateMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.GetTyreActivateMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyrePositionList")]
        public async Task<IActionResult> GetTyrePositionList()
        {
            try
            {
                var result = await tyreActivateMasterBusiness.GetTyrePositionList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleTyrePositionList")]
        public async Task<IActionResult> GetVehicleTyrePositionList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.GetVehicleTyrePositionList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleNoOfTyres")]
        public async Task<IActionResult> GetVehicleNoOfTyres(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.GetVehicleNoOfTyres(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBrandTyreNoList")]
        public async Task<IActionResult> GetBrandTyreNoList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.GetBrandTyreNoList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreNoCostAmt")]
        public async Task<IActionResult> GetTyreNoCostAmt(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreActivateMasterBusiness.GetTyreNoCostAmt(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TyreDeActivateMasterSave")]
        public async Task<IActionResult> TyreDeActivateMasterSave(TyreDeActivateMasterModel tyreDeActivateMasterModel)
        {
            if (tyreDeActivateMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreDeActivateMasterBusiness.TyreDeActivateMasterSave(tyreDeActivateMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreDeActivateMasterList")]
        public async Task<IActionResult> GetTyreDeActivateMasterList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreDeActivateMasterBusiness.GetTyreDeActivateMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TyreDeActivateMasterDelete")]
        public async Task<IActionResult> TyreDeActivateMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreDeActivateMasterBusiness.TyreDeActivateMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyredeactivateVehicleTyreList")]
        public async Task<IActionResult> GetTyredeactivateVehicleTyreList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreDeActivateMasterBusiness.GetTyredeactivateVehicleTyreList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreDeActivateMasterInnerGridList")]
        public async Task<IActionResult> GetTyreDeActivateMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreDeActivateMasterBusiness.GetTyreDeActivateMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TyreRegroupIssueMasterSave")]
        public async Task<IActionResult> TyreRegroupIssueMasterSave(TyreRegroupIssueMasterModel tyreRegroupIssueMasterModel)
        {
            if (tyreRegroupIssueMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreRegroupIssueMasterBusiness.TyreRegroupIssueMasterSave(tyreRegroupIssueMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreRegroupIssueMasterList")]
        public async Task<IActionResult> GetTyreRegroupIssueMasterList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreRegroupIssueMasterBusiness.GetTyreRegroupIssueMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TyreRegroupIssueMasterDelete")]
        public async Task<IActionResult> TyreRegroupIssueMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreRegroupIssueMasterBusiness.TyreRegroupIssueMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetRegroupIssueMasterInnerGridList")]
        public async Task<IActionResult> GetTyreRegroupIssueMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreRegroupIssueMasterBusiness.GetTyreRegroupIssueMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        ///////////////
        [HttpPost("TyreRegroupRecdMasterSave")]
        public async Task<IActionResult> TyreRegroupRecdMasterSave()
        {
            try
            {
                var attachConfirmDoc = HttpContext.Request.Form.Files["attach"];

                TyreRegroupRecdMasterModel tyreRegroupRecdMasterModel = JsonConvert.DeserializeObject<TyreRegroupRecdMasterModel>(HttpContext.Request.Form["datadetails"]);

                if (attachConfirmDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachConfirmDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachConfirmDoc.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/loadmemo");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachConfirmDoc.CopyToAsync(fileStream);
                        tyreRegroupRecdMasterModel.AttatchFile = imageName;
                    }
                }
                var result = await tyreRegroupRecdMasterBusiness.TyreRegroupRecdMasterSave(tyreRegroupRecdMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreRegroupRecdMasterList")]
        public async Task<IActionResult> GetTyreRegroupRecdMasterList(PageFromDtToDtRequest request)
        {
            try
            {
                var result = await tyreRegroupRecdMasterBusiness.GetTyreRegroupRecdMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        [HttpPost("TyreRegroupRecdMasterDelete")]
        public async Task<IActionResult> TyreRegroupRecdMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreRegroupRecdMasterBusiness.TyreRegroupRecdMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreRegroupRecdMasterInnerGridList")]
        
        public async Task<IActionResult> GetTyreRegroupRecdMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreRegroupRecdMasterBusiness.GetTyreRegroupRecdMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreRegroupRecdMasterSearchList")]
        public async Task<IActionResult> GetTyreRegroupRecdMasterSearchList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreRegroupRecdMasterBusiness.GetTyreRegroupRecdMasterSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FleetLoadEntrySave")]
        public async Task<IActionResult> FleetLoadEntrySave()
        {
            //if (fleetLoadEntryModel == null)
            //{
            //    return BadRequest("Invalid request data");
            //}
            try
            {
                var attachConfirmDoc = HttpContext.Request.Form.Files["attach"];

                FleetLoadEntryModel fleetLoadEntryModel = JsonConvert.DeserializeObject<FleetLoadEntryModel>(HttpContext.Request.Form["datadetails"]);

                if (attachConfirmDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachConfirmDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachConfirmDoc.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/loadmemo");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachConfirmDoc.CopyToAsync(fileStream);
                        fleetLoadEntryModel.AttachMemocopy = imageName;
                    }
                }
                var result = await fleetLoadEntryBusiness.FleetLoadEntrySave(fleetLoadEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFleetLoadEntryList")]
        public async Task<IActionResult> GetFleetLoadEntryList(ReportRequestModel request)
        {
            try
            {
                var result = await fleetLoadEntryBusiness.GetFleetLoadEntryList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        [HttpPost("FleetLoadEntryDelete")]
        public async Task<IActionResult> FleetLoadEntryDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetLoadEntryBusiness.FleetLoadEntryDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TyreSalesMasterSave")]
        public async Task<IActionResult> TyreSalesMasterSave(TyreSalesMasterModel tyreSalesMasterModel)
        {
            if (tyreSalesMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreSalesMasterBusiness.TyreSalesMasterSave(tyreSalesMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreSalesMasterList")]
        public async Task<IActionResult> GetTyreSalesMasterList(PageFromDtToDtRequest request)
        {
            try
            {
                var result = await tyreSalesMasterBusiness.GetTyreSalesMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        [HttpPost("GetTyreSalesMasterInnerGridList")]
        public async Task<IActionResult> GetTyreSalesMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreSalesMasterBusiness.GetTyreSalesMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TyreSalesMasterDelete")]
        public async Task<IActionResult> TyreSalesMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreSalesMasterBusiness.TyreSalesMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCustomerList")]
        public async Task<IActionResult> GetCustomerList()
        {
            try
            {
                var result = await tyreSalesMasterBusiness.GetCustomerList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCustomerDetailList")]
        public async Task<IActionResult> GetCustomerDetailList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreSalesMasterBusiness.GetCustomerDetailList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleRepMaintMasterSave")]
        public async Task<IActionResult> VehicleRepMaintMasterSave()
        {
            try
            {
                var refDocAttachedImage = HttpContext.Request.Form.Files["refDocAttachedImage"];

                VehicleRepMaintMasterModel vehicleRepMaintMasterModel = JsonConvert.DeserializeObject<VehicleRepMaintMasterModel>(HttpContext.Request.Form["datadetails"]);
                vehicleRepMaintMasterModel.RefDocAttachedImage = "";

                if (refDocAttachedImage != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(refDocAttachedImage.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(refDocAttachedImage.FileName);

                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, "upload/vehicleRepair/refDocAttachedImage/");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await refDocAttachedImage.CopyToAsync(fileStream);
                        vehicleRepMaintMasterModel.RefDocAttachedImage = imageName;
                    }
                }
                var result = await vehicleRepMaintMasterBusiness.VehicleRepMaintMasterSave(vehicleRepMaintMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetMaintanenceList")]
        public async Task<IActionResult> GetMaintanenceList()
        {
            try
            {
                var result = await vehicleRepMaintMasterBusiness.GetMaintanenceList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleRepMaintMasterList")]
        public async Task<IActionResult> GetVehicleRepMaintMasterList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleRepMaintMasterBusiness.GetVehicleRepMaintMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSpareStockAvailable")]
        public async Task<IActionResult> GetSpareStockAvailable(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleRepMaintMasterBusiness.GetSpareStockAvailable(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        [HttpPost("GetDslMileage")]
        public async Task<IActionResult> GetDslMileage(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetDslMileage(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBhattaRate")]
        public async Task<IActionResult> GetBhattaRate(RequestModel request)
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
        [HttpPost("GetOpeningBal")]
        public async Task<IActionResult> GetOpeningBal(ReportRequestModel request)
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

        [HttpPost("GetTripPrintPdf")]
        public async Task<IActionResult> GetTripPrintPdf(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetTripPrintPdf(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        


        [HttpPost("GetVehicleRepMaintMasterInnerGridList")]
        public async Task<IActionResult>  GetVehicleRepMaintMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleRepMaintMasterBusiness.GetVehicleRepMaintMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("VehicleRepMaintMasterDelete")]
        public async Task<IActionResult> VehicleRepMaintMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleRepMaintMasterBusiness.VehicleRepMaintMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSparesPurchaseMasterList")]
        public async Task<IActionResult> GetSparesPurchaseMasterList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesPurchaseMasterBusiness.GetSparesPurchaseMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSparesPurchaseMasterInnerGridList")]
        public async Task<IActionResult> GetSparesPurchaseMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesPurchaseMasterBusiness.GetSparesPurchaseMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SparesPurchaseMasterDelete")]
        public async Task<IActionResult> SparesPurchaseMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sparesPurchaseMasterBusiness.SparesPurchaseMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SparesPurchaseMasterSave")]
        public async Task<IActionResult> SparesPurchaseMasterSave()
        {
           
            try
            {

                var refDocAttachedImage = HttpContext.Request.Form.Files["refDocAttachedImage"];

                SparesPurchaseMasterModel sparesPurchaseMasterModel = JsonConvert.DeserializeObject<SparesPurchaseMasterModel>(HttpContext.Request.Form["datadetails"]);
                sparesPurchaseMasterModel.RefDocAttachedImage = "";

                if (refDocAttachedImage != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(refDocAttachedImage.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(refDocAttachedImage.FileName);

                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, "upload/sparesPurchase/refDocAttachedImage/");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await refDocAttachedImage.CopyToAsync(fileStream);
                        sparesPurchaseMasterModel.RefDocAttachedImage = imageName;
                    }
                }
                var result = await sparesPurchaseMasterBusiness.SparesPurchaseMasterSave(sparesPurchaseMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetSparesStockRptList")]
        public async Task<IActionResult> GetSparesStockRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetSparesStockRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSparesStockRptExcel")]
        public async Task<IActionResult> GetSparesStockRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetSparesStockRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSparesUsageHistoryRptList")]
        public async Task<IActionResult> GetSparesUsageHistoryRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetSparesUsageHistoryRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSparesUsageHistoryRptExcel")]
        public async Task<IActionResult> GetSparesUsageHistoryRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetSparesUsageHistoryRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetVehicleMonthlySummRptExcel")]
        public async Task<IActionResult> GetVehicleMonthlySummRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleMonthlySummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetVehicleMonthlyLPRptExcel")]
        public async Task<IActionResult> GetVehicleMonthlyLPRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleMonthlyLPRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleAdvBalRptList")]
        public async Task<IActionResult> GetVehicleAdvBalRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleAdvBalRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleAdvBalRptExcel")]
        public async Task<IActionResult> GetVehicleAdvBalRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleAdvBalRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleEngagementRptList")]
        public async Task<IActionResult> GetVehicleEngagementRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleEngagementRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetVehicleEngagementRptExcel")]
        public async Task<IActionResult> GetVehicleEngagementRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleEngagementRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetTyrePurchaseRptExcel")]
        public async Task<IActionResult> GetTyrePurchaseRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyrePurchaseRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyrePurchaseRptList")]
        public async Task<IActionResult> GetTyrePurchaseRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyrePurchaseRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetTyreStockRptExcel")]
        public async Task<IActionResult> GetTyreStockRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreStockRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetTyreHistoryRptList")]
        public async Task<IActionResult> GetTyreHistoryRptList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreHistoryRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreHistoryRptExcel")]
        public async Task<IActionResult> GetTyreHistoryRptExcel(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreHistoryRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetActiveTyreRptList")]
        public async Task<IActionResult> GetActiveTyreRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetActiveTyreRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetActiveTyreRptExcel")]
        public async Task<IActionResult> GetActiveTyreRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetActiveTyreRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreActivatedRptList")]
        public async Task<IActionResult> GetTyreActivatedRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreActivatedRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreActivatedRptExcel")]
        public async Task<IActionResult> GetTyreActivatedRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreActivatedRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreDeActivatedRptList")]
        public async Task<IActionResult> GetTyreDeActivatedRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreDeActivatedRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreDeActivatedRptExcel")]
        public async Task<IActionResult> GetTyreDeActivatedRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreDeActivatedRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreReGroupIssRptList")]
        public async Task<IActionResult> GetTyreReGroupIssRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreReGroupIssRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreReGroupIssRptExcel")]
        public async Task<IActionResult> GetTyreReGroupIssRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreReGroupIssRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTyreReGroupRcvdRptList")]
        public async Task<IActionResult> GetTyreReGroupRcvdRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreReGroupRcvdRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreReGroupRcvdRptExcel")]
        public async Task<IActionResult> GetTyreReGroupRcvdRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTyreReGroupRcvdRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleAdvBalReceiptMstList")]
        public async Task<IActionResult> GetVehicleAdvBalReceiptMstList(PageFromDtToDtRequest request)
        {
            try
            {
                var result = await vehicleAdvBalReceiptMstBusiness.GetVehicleAdvBalReceiptMstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        [HttpPost("GetVehicleAdvBalReceiptMstListLLP")]
        public async Task<IActionResult> GetVehicleAdvBalReceiptMstListLLP(PageFromDtToDtRequest request)
        {
            try
            {
                var result = await vehicleAdvBalReceiptMstLLPBusiness.GetVehicleAdvBalReceiptMstListLLP(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        [HttpPost("VehicleAdvBalReceiptMstDelete")]
        public async Task<IActionResult> VehicleAdvBalReceiptMstDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstBusiness.VehicleAdvBalReceiptMstDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("VehicleAdvBalReceiptMstDeleteLLP")]
        public async Task<IActionResult> VehicleAdvBalReceiptMstDeleteLLP(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstLLPBusiness.VehicleAdvBalReceiptMstDeleteLLP(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleAdvBalReceiptMstInnerGridListLLP")]
        public async Task<IActionResult> GetVehicleAdvBalReceiptMstInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstLLPBusiness.GetVehicleAdvBalReceiptMstInnerGridListLLP(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleAdvBalTripDetails")]
        public async Task<IActionResult> GetVehicleAdvBalTripDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstBusiness.GetVehicleAdvBalTripDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetVehicleAdvBalTripDetailsLLP")]
        public async Task<IActionResult> GetVehicleAdvBalTripDetailsLLP(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstLLPBusiness.GetVehicleAdvBalTripDetailsLLP(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleAdvBalReceiptMstSave")]
        public async Task<IActionResult> VehicleAdvBalReceiptMstSave(VehicleAdvBalReceiptMstModel vehicleAdvBalReceiptMstModel)
        {
            if (vehicleAdvBalReceiptMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstBusiness.VehicleAdvBalReceiptMstSave(vehicleAdvBalReceiptMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VehicleAdvBalReceiptMstSaveLLP")]
        public async Task<IActionResult> VehicleAdvBalReceiptMstSaveLLP(VehicleAdvBalReceiptMstLLPModel vehicleAdvBalReceiptMstModel)
        {
            if (vehicleAdvBalReceiptMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstLLPBusiness.VehicleAdvBalReceiptMstSaveLLP(vehicleAdvBalReceiptMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSparesPurchaseRptList")]
        public async Task<IActionResult> GetSparesPurchaseRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetSparesPurchaseRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSparesPurchaseRptExcel")]
        public async Task<IActionResult> GetSparesPurchaseRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetSparesPurchaseRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetVehicleRepairsRptList")]
        public async Task<IActionResult> GetVehicleRepairsRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleRepairsRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleRepairsRptExcel")]
        public async Task<IActionResult> GetVehicleRepairsRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleRepairsRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetDieselStmtRptList")]
        public async Task<IActionResult> GetDieselStmtRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetDieselStmtRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDieselStmtRptExcel")]
        public async Task<IActionResult> GetDieselStmtRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetDieselStmtRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleFrtOutstandingRptList")]
        public async Task<IActionResult> GetVehicleFrtOutstandingRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleFrtOutstandingRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleFrtOutstandingRptExcel")]
        public async Task<IActionResult> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVehicleFrtOutstandingRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTripOutstandingRptList")]
        public async Task<IActionResult> GetTripOutstandingRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTripOutstandingRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripOutstandingRptListBrpl")]
        public async Task<IActionResult> GetTripOutstandingRptListBrpl(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTripOutstandingRptListBrpl(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelTripOutstandingRptList")]
        public async Task<IActionResult> ExcelTripOutstandingRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.ExcelTripOutstandingRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelTripOutstandingRptListBrpl")]
        public async Task<IActionResult> ExcelTripOutstandingRptListBrpl(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.ExcelTripOutstandingRptListBrpl(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("GetTripSummaryRptList")]
        public async Task<IActionResult> GetTripSummaryRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetTripSummaryRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelTripSummaryRptList")]
        public async Task<IActionResult> ExcelTripSummaryRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.ExcelTripSummaryRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FastTagDelete")]
        public async Task<IActionResult> FastTagDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fastTagBusiness.FastTagDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FastTagSave")]
        public async Task<IActionResult> FastTagSave(FastTagModel fasttag)
        {
            if (fasttag == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fastTagBusiness.FastTagSave(fasttag);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFastTagList")]
        public async Task<IActionResult> GetFastTagList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fastTagBusiness.GetFastTagList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFastTagInnerGridList")]
        public async Task<IActionResult> GetFastTagInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fastTagBusiness.GetFastTagInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TripEnrouteExpByCompanySave")]
        public async Task<IActionResult> TripEnrouteExpByCompanySave(TripEnrouteExpByCompanyModel tripEnrouteExpByCompanyModel)
        {
            if (tripEnrouteExpByCompanyModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripEnrouteExpByCompanyBusiness.TripEnrouteExpByCompanySave(tripEnrouteExpByCompanyModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("TripEnrouteExpByCompanyDelete")]
        public async Task<IActionResult> TripEnrouteExpByCompanyDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripEnrouteExpByCompanyBusiness.TripEnrouteExpByCompanyDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTripEnrouteExpByCompanyList")]
        public async Task<IActionResult> GetTripEnrouteExpByCompanyList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripEnrouteExpByCompanyBusiness.GetTripEnrouteExpByCompanyList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetExpTypeList")]
        public async Task<IActionResult> GetExpTypeList()
        {
            try
            {
                var result = await tripEnrouteExpByCompanyBusiness.GetExpTypeList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("FastagDslRechargeEntrySave")]
        public async Task<IActionResult> FastagDslRechargeEntrySave(FastagDslRechargeEntryModel fastagDslRechargeEntryModel)
        {
            if (fastagDslRechargeEntryModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fastagDslRechargeEntryBusiness.FastagDslRechargeEntrySave(fastagDslRechargeEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FastagDslRechargeEntryList")]
        public async Task<IActionResult> FastagDslRechargeEntryList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fastagDslRechargeEntryBusiness.FastagDslRechargeEntryList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FastagDslRechargeEntryDelete")]
        public async Task<IActionResult> FastagDslRechargeEntryDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fastagDslRechargeEntryBusiness.FastagDslRechargeEntryDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetRechargeTypeList")]
        public async Task<IActionResult> GetRechargeTypeList()
        {
            try
            {
                var result = await fastagDslRechargeEntryBusiness.GetRechargeTypeList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDriverSalaryPaymentList")]
        public async Task<IActionResult> GetDriverSalaryPaymentList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverSalaryPaymentBusiness.GetDriverSalaryPaymentList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DriverSalaryPaymentDelete")]
        public async Task<IActionResult> DriverSalaryPaymentDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverSalaryPaymentBusiness.DriverSalaryPaymentDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DriverSalaryPaymentSave")]
        public async Task<IActionResult> DriverSalaryPaymentSave(DriverSalaryPaymentModel driverSalaryPaymentModel)
        {
            if (driverSalaryPaymentModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverSalaryPaymentBusiness.DriverSalaryPaymentSave(driverSalaryPaymentModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVendorPmtList")]
        public async Task<IActionResult> GetVendorPmtList(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vendorPmtBusiness.GetVendorPmtList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVendorPmtSearchList")]
        public async Task<IActionResult> GetVendorPmtSearchList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vendorPmtBusiness.GetVendorPmtSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVendorPmtInnerGridList")]
        public async Task<IActionResult> GetVendorPmtInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vendorPmtBusiness.GetVendorPmtInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VendorPmtDetailsSave")]
        public async Task<IActionResult> VendorPmtDetailsSave(VendorPmtModel vendorPmt)
        {
            if (vendorPmt == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vendorPmtBusiness.VendorPmtDetailsSave(vendorPmt);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VendorPmtDetailsDelete")]
        public async Task<IActionResult> VendorPmtDetailsDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vendorPmtBusiness.VendorPmtDetailsDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetVendorPmtRptList")]
        public async Task<IActionResult> GetVendorPmtRptList(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVendorPmtRptList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVendorPmtRptExcel")]
        public async Task<IActionResult> GetVendorPmtRptExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetRptBusiness.GetVendorPmtRptExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

