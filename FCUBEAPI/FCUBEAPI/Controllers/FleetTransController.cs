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
using FreightMasters.Business;
using Consignment.Business;

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
        readonly ITyrePurchaseMasterBusiness tyrePurchaseMasterBusiness;
        readonly ITyreActivateMasterBusiness tyreActivateMasterBusiness;
        readonly ITyreDeActivateMasterBusiness tyreDeActivateMasterBusiness;
        readonly ITyreRegroupIssueMasterBusiness tyreRegroupIssueMasterBusiness;
        readonly IDriverSalaryStmtBusiness driverSalaryStmtBusiness;
        readonly IExpTruckArrRptBusiness expTruckArrRptBusiness;
        readonly IDocRenewalRptBusiness docRenewalRptBusiness;
        readonly IDieselStatementRptBusiness dieselStatementRptBusiness;
        readonly ITripPaymentsRptBusiness tripPaymentsRptBusiness;
        readonly ITripStatusRptBusiness tripStatusRptBusiness;
        readonly IDailyLoadingRptBusiness dailyLoadingRptBusiness;
        readonly IVehiEmiBusiness vehiEmiBusiness;
        readonly ITyreRegroupRecdMasterBusiness tyreRegroupRecdMasterBusiness;
        readonly IFleetLoadEntryBusiness fleetLoadEntryBusiness;
        readonly ITyreSalesMasterBusiness tyreSalesMasterBusiness;
        readonly IVehicleRepMaintMasterBusiness vehicleRepMaintMasterBusiness;
        readonly ISparesPurchaseMasterBusiness sparesPurchaseMasterBusiness;
        readonly ITyreMgntRptBusiness tyreMgntRptBusiness;
        readonly IVehicleAdvBalReceiptMstBusiness vehicleAdvBalReceiptMstBusiness;

        public FleetTransController(IOptions<DBModel> _dbconnection,
            IDocRenewalEntryBusiness _DocRenewalEntryBusiness, 
            ITripPaymentsBusiness _TripPaymentsBusiness,ITripMasterBusiness _tripMasterBusiness, 
            IDieselStatementBusiness _dieselStatementBusiness, 
            IBillStatementBusiness _billStatementBusiness, 
            IDriverSalaryStmtBusiness  _driverSalaryStmtBusiness,
            IExpTruckArrRptBusiness _expTruckArrRptBusiness,
            IDocRenewalRptBusiness _docRenewalRptBusiness,
            ITyrePurchaseMasterBusiness _tyrePurchaseMasterBusiness,
            ITyreActivateMasterBusiness _tyreActivateMasterBusiness,
            ITyreDeActivateMasterBusiness _tyreDeActivateMasterBusiness,
            IDieselStatementRptBusiness _dieselStatementRptBusiness,
            ITripPaymentsRptBusiness _tripPaymentsRptBusiness,
            ITripStatusRptBusiness _tripStatusRptBusiness,
            IDailyLoadingRptBusiness _dailyLoadingRptBusiness,
            IVehicleInstPmtBusiness _vehicleInstPmtBusiness,
            ITyreRegroupIssueMasterBusiness _tyreRegroupIssueMasterBusiness,
            ITyreRegroupRecdMasterBusiness _tyreRegroupRecdMasterBusiness,
            ITyreSalesMasterBusiness _tyreSalesMasterBusiness,
            IVehiEmiBusiness _vehiEmiBusiness,
            IFleetLoadEntryBusiness _fleetLoadEntryBusiness,
            IVehicleRepMaintMasterBusiness _vehicleRepMaintMasterBusiness,
            ISparesPurchaseMasterBusiness _sparesPurchaseMasterBusiness,
            IVehicleAdvBalReceiptMstBusiness _vehicleAdvBalReceiptMstBusiness,
        ITyreMgntRptBusiness _tyreMgntRptBusiness)
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
            tyreActivateMasterBusiness = _tyreActivateMasterBusiness;
            tyreDeActivateMasterBusiness = _tyreDeActivateMasterBusiness;
            tripStatusRptBusiness = _tripStatusRptBusiness;
            dailyLoadingRptBusiness = _dailyLoadingRptBusiness;
            vehiEmiBusiness = _vehiEmiBusiness;
            vehicleInstPmtBusiness = _vehicleInstPmtBusiness;
            tyreRegroupIssueMasterBusiness = _tyreRegroupIssueMasterBusiness;
            tyreRegroupRecdMasterBusiness = _tyreRegroupRecdMasterBusiness;
            tyreRegroupRecdMasterBusiness = _tyreRegroupRecdMasterBusiness;
            fleetLoadEntryBusiness = _fleetLoadEntryBusiness;
            tyreSalesMasterBusiness = _tyreSalesMasterBusiness;
            vehicleRepMaintMasterBusiness =_vehicleRepMaintMasterBusiness;
            sparesPurchaseMasterBusiness = _sparesPurchaseMasterBusiness;
            tyreMgntRptBusiness = _tyreMgntRptBusiness;
            vehicleAdvBalReceiptMstBusiness = _vehicleAdvBalReceiptMstBusiness;
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

        [HttpPost("GetTripSheetInnerGridList")]
        public async Task<IActionResult> GetTripSheetInnerGridList(RequestModel request)
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

        [HttpPost("GetTripSheetInnerSearchList")]
        public async Task<IActionResult> GetTripSheetInnerSearchList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tripMasterBusiness.GetTripSheetInnerSearchList(request);

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

        [HttpPost("DieselStatementSave")]
        public async Task<IActionResult> DieselStatementSave(DieselStmtModel dieselStmtModel)
        {
            if (dieselStmtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.DieselStatementSave(dieselStmtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetDieselStmtList")]
        public async Task<IActionResult> GetDieselStmtList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.GetDieselStmtList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetDieselStmtInnerGridList")]
        public async Task<IActionResult> GetDieselStmtInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dieselStatementBusiness.GetDieselStmtInnerGridList(request);

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
        [HttpPost("GetRegroupRecdMasterInnerGridList")]
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
        [HttpPost("FleetLoadEntryList")]
        public async Task<IActionResult> GetFleetLoadEntryList(PageRequest request)
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
        [HttpPost("GetTyrePurchaseRptExcel")]
        public async Task<IActionResult> GetTyrePurchaseRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreMgntRptBusiness.GetTyrePurchaseRptExcel(request);

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
                var result = await tyreMgntRptBusiness.GetTyrePurchaseRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTyreStockRptList")]
        public async Task<IActionResult> GetTyreStockRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tyreMgntRptBusiness.GetTyreStockRptList(request);

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
                var result = await tyreMgntRptBusiness.GetTyreStockRptExcel(request);

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
                var result = await tyreMgntRptBusiness.GetTyreHistoryRptList(request);

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
                var result = await tyreMgntRptBusiness.GetTyreHistoryRptExcel(request);

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
                var result = await tyreMgntRptBusiness.GetActiveTyreRptList(request);

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
                var result = await tyreMgntRptBusiness.GetActiveTyreRptExcel(request);

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
                var result = await tyreMgntRptBusiness.GetTyreActivatedRptList(request);

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
                var result = await tyreMgntRptBusiness.GetTyreActivatedRptExcel(request);

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
                var result = await tyreMgntRptBusiness.GetTyreDeActivatedRptList(request);

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
                var result = await tyreMgntRptBusiness.GetTyreDeActivatedRptExcel(request);

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
                var result = await tyreMgntRptBusiness.GetTyreReGroupIssRptList(request);

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
                var result = await tyreMgntRptBusiness.GetTyreReGroupIssRptExcel(request);

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
                var result = await tyreMgntRptBusiness.GetTyreReGroupRcvdRptList(request);

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
                var result = await tyreMgntRptBusiness.GetTyreReGroupRcvdRptExcel(request);

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
        [HttpPost("GetVehicleAdvBalReceiptMstInnerGridList")]
        public async Task<IActionResult> GetVehicleAdvBalReceiptMstInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await vehicleAdvBalReceiptMstBusiness.GetVehicleAdvBalReceiptMstInnerGridList(request);

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
    }
}

