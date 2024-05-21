using Consignment.Business;
using Microsoft.AspNetCore.Authorization;
using Consignment.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Shared.Models;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;


namespace FCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ConsignmentController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IConsignmentBusiness consignmentBusiness;
        readonly IEwayBillBusiness ewayBillBusiness;
        readonly IEwayBillExpRptBusiness ewayBillExpRptBusiness;
        readonly IDprBusiness dprBusiness;
        readonly IDprVehiPlacedBusiness dprVehiPlacedBusiness;
        readonly IGenerateTempGcBusiness tempGcBusiness;
        public ConsignmentController(IConsignmentBusiness _consignmentBusiness,
            IEwayBillBusiness _ewayBillBusiness,
            IEwayBillExpRptBusiness _ewayBillExpRptBusiness,
            IDprBusiness _dprBusiness,
            IDprVehiPlacedBusiness _dprVehiPlacedBusiness,
            IGenerateTempGcBusiness _tempGcBusiness)
        {
            consignmentBusiness = _consignmentBusiness;
            ewayBillBusiness = _ewayBillBusiness;
            ewayBillExpRptBusiness = _ewayBillExpRptBusiness;
            dprBusiness = _dprBusiness;
            dprVehiPlacedBusiness = _dprVehiPlacedBusiness;
            tempGcBusiness = _tempGcBusiness;
        }
        

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

        [HttpPost("ConsignmentDelete")]
        public async Task<IActionResult> ConsignmentDelete(RequestModel req)
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
        public async Task<IActionResult> GetConsignmentList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        
        /// </summary>
        [HttpPost("GetClassList")]
        public async Task<IActionResult> GetClassList()
        {
            try
            {
                var result = await consignmentBusiness.GetClassList();

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("CheckEwaybillExits")]
        public async Task<IActionResult> CheckEwaybillExits(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.CheckEwaybillExits(req);

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
        public async Task<IActionResult> CheckDuplicateLr(RequestModel request)
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
        public async Task<IActionResult> GetGcSeries(RequestModel request)
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
        [HttpPost("GetBillSeries")]
        public async Task<IActionResult> GetBillSeries(RequestModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetBillSeries(request);

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
        public async Task<IActionResult> GetLRSeries(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.GetLRSeries(req);

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

        [HttpPost("GetEWayBillExtRptList")]
        public async Task<IActionResult> GetEWayBillExtRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ewayBillExpRptBusiness.GetEWayBillExtRptList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEWayBillExtRptExcel")]
        public async Task<IActionResult> GetEWayBillExtRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ewayBillExpRptBusiness.GetEWayBillExtRptExcel(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDprMasterList")]
        public async Task<IActionResult> GetDprMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprBusiness.GetDprMasterList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetDprInnerGridList")]
        public async Task<IActionResult> GetDprInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprBusiness.GetDprInnerGridList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DprMasterSave")]
        public async Task<IActionResult> DprMasterSave()
        {
            try
            {
                var attachConfirmDoc = HttpContext.Request.Form.Files["attach"];
               
                DprModel dprModel = JsonConvert.DeserializeObject<DprModel>(HttpContext.Request.Form["datadetails"]);

                if (attachConfirmDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachConfirmDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachConfirmDoc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/dpr/confirmdoc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachConfirmDoc.CopyToAsync(fileStream);
                        dprModel.AttachConfirmDoc = imageName;
                    }
                }

                var result = await dprBusiness.DprMasterSave(dprModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DprMasterDelete")]
        public async Task<IActionResult> DprMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprBusiness.DprMasterDelete(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDprVehiPlacedList")]
        public async Task<IActionResult> GetDprVehiPlacedList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprVehiPlacedBusiness.GetDprVehiPlacedList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDprVehiPlacedDetails")]
        public async Task<IActionResult> GetDprVehiPlacedDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprVehiPlacedBusiness.GetDprVehiPlacedDetails(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetVehicleDetails")]
        public async Task<IActionResult> GetVehicleDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprVehiPlacedBusiness.GetVehicleDetails(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBrokerList")]
        public async Task<IActionResult> GetBrokerList()
        {
            try
            {
                var result = await dprVehiPlacedBusiness.GetBrokerList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DprVehiPlacedSave")]
        public async Task<IActionResult> DprVehiPlacedSave(DprVehiPlacedModel dprVehi)
        {
            if (dprVehi == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprVehiPlacedBusiness.DprVehiPlacedSave(dprVehi);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DprVehiPlacedDelete")]
        public async Task<IActionResult> DprVehiPlacedDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await dprVehiPlacedBusiness.DprVehiPlacedDelete(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetTempgcList")]
        public async Task<IActionResult> GetTempgcList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tempGcBusiness.GetTempgcList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetTempgcInnerGridList")]
        public async Task<IActionResult> GetTempgcInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tempGcBusiness.GetTempgcInnerGridList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TempgcSave")]
        public async Task<IActionResult> TempgcSave()
        {
            try
            {
                var vehRcDoc = HttpContext.Request.Form.Files["vehRcDoc"];
                var vehPanDoc = HttpContext.Request.Form.Files["vehPanDoc"];
                var vehDecDoc = HttpContext.Request.Form.Files["vehDecDoc"];
                var partyInvDoc = HttpContext.Request.Form.Files["partyInvDoc"];
                var loadingSlipDoc = HttpContext.Request.Form.Files["loadingSlipDoc"];
                var vehPhoto1Doc = HttpContext.Request.Form.Files["vehPhoto1Doc"];
                var vehPhoto2Doc = HttpContext.Request.Form.Files["vehPhoto2Doc"];
                var vehPhoto3Doc = HttpContext.Request.Form.Files["vehPhoto3Doc"];

                TempGcModel tempGc = JsonConvert.DeserializeObject<TempGcModel>(HttpContext.Request.Form["datadetails"]);

                if (vehRcDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(vehRcDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(vehRcDoc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehRcDoc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await vehRcDoc.CopyToAsync(fileStream);
                        tempGc.VehRcDoc = imageName;
                    }
                }
                if (vehPanDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(vehPanDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(vehPanDoc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPanDoc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await vehPanDoc.CopyToAsync(fileStream);
                        tempGc.VehPanDoc = imageName;
                    }
                }
                if (vehDecDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(vehDecDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(vehDecDoc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehDecDoc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await vehDecDoc.CopyToAsync(fileStream);
                        tempGc.VehDecDoc = imageName;
                    }
                }
                if (partyInvDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(partyInvDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(partyInvDoc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/partyInvDoc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await partyInvDoc.CopyToAsync(fileStream);
                        tempGc.PartyInvDoc = imageName;
                    }
                }
                if (loadingSlipDoc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(loadingSlipDoc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(loadingSlipDoc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/loadingSlipDoc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await loadingSlipDoc.CopyToAsync(fileStream);
                        tempGc.LoadingSlipDoc = imageName;
                    }
                }
                if (vehPhoto1Doc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(vehPhoto1Doc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(vehPhoto1Doc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPhoto1Doc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await vehPhoto1Doc.CopyToAsync(fileStream);
                        tempGc.VehPhoto1Doc = imageName;
                    }
                }
                if (vehPhoto2Doc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(vehPhoto2Doc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(vehPhoto2Doc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPhoto2Doc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await vehPhoto2Doc.CopyToAsync(fileStream);
                        tempGc.VehPhoto2Doc = imageName;
                    }
                }
                if (vehPhoto3Doc != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(vehPhoto3Doc.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(vehPhoto3Doc.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPhoto3Doc/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await vehPhoto3Doc.CopyToAsync(fileStream);
                        tempGc.VehPhoto3Doc = imageName;
                    }
                }

                var result = await tempGcBusiness.TempgcSave(tempGc);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TempGcDelete")]
        public async Task<IActionResult> TempGcDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tempGcBusiness.TempGcDelete(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

