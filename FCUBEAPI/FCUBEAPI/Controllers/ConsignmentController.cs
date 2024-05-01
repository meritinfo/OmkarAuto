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
        public ConsignmentController(IConsignmentBusiness _consignmentBusiness,
            IEwayBillBusiness _ewayBillBusiness,
            IEwayBillExpRptBusiness _ewayBillExpRptBusiness,
            IDprBusiness _dprBusiness,
            IDprVehiPlacedBusiness _dprVehiPlacedBusiness)
        {
            consignmentBusiness = _consignmentBusiness;
            ewayBillBusiness = _ewayBillBusiness;
            ewayBillExpRptBusiness = _ewayBillExpRptBusiness;
            dprBusiness = _dprBusiness;
            dprVehiPlacedBusiness = _dprVehiPlacedBusiness;
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
        

    }
}

