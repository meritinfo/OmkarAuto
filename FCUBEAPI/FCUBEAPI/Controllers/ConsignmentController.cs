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
using FreightMasters.Repository;


namespace FCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ConsignmentController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IConsignmentBusiness consignmentBusiness;
        readonly IChallanMasterBusiness challanMasterBusiness;
        readonly IEwayBillBusiness ewayBillBusiness;
        readonly IEwayBillExpRptBusiness ewayBillExpRptBusiness;
        readonly IDprBusiness dprBusiness;
        readonly IDeliveryAckPodBusiness deliveryAckPodBusiness;
        readonly IDprVehiPlacedBusiness dprVehiPlacedBusiness;
        readonly IGenerateTempGcBusiness tempGcBusiness;
        readonly ILorryHireBusiness lorryHireBusiness;
        readonly ILorryHireReqBusiness lorryHireReqBusiness;
        readonly ILorryHireAprvBusiness lorryHireAprvBusiness;
        readonly IMrBusiness mrBusiness;
        readonly IChallanReleaseBusiness challanReleaseBusiness;
        public ConsignmentController(IOptions<DBModel> _dbconnection,
            IConsignmentBusiness _consignmentBusiness,
            IChallanMasterBusiness _challanMasterBusiness,
            IEwayBillBusiness _ewayBillBusiness,
            IDeliveryAckPodBusiness _deliveryAckPodBusiness,
            IEwayBillExpRptBusiness _ewayBillExpRptBusiness,
            IDprBusiness _dprBusiness,
            IDprVehiPlacedBusiness _dprVehiPlacedBusiness,
            IGenerateTempGcBusiness _tempGcBusiness,
            ILorryHireBusiness _lorryHireBusiness,
            ILorryHireReqBusiness _lorryHireReqBusiness,
            ILorryHireAprvBusiness _lorryHireAprvBusiness,
            IMrBusiness _mrBusiness,
            IChallanReleaseBusiness _challanReleaseBusiness)
        {
            dbconnection = _dbconnection;
            consignmentBusiness = _consignmentBusiness;
            challanMasterBusiness = _challanMasterBusiness;
            ewayBillBusiness = _ewayBillBusiness;
            ewayBillExpRptBusiness = _ewayBillExpRptBusiness;
            dprBusiness = _dprBusiness;
            dprVehiPlacedBusiness = _dprVehiPlacedBusiness;
            tempGcBusiness = _tempGcBusiness;
            deliveryAckPodBusiness = _deliveryAckPodBusiness;
            lorryHireBusiness = _lorryHireBusiness;
            lorryHireReqBusiness = _lorryHireReqBusiness;
            lorryHireAprvBusiness = _lorryHireAprvBusiness;
            mrBusiness = _mrBusiness;
            challanReleaseBusiness = _challanReleaseBusiness;
        }
        

        [HttpPost("ConsignmentSave")]
        public async Task<IActionResult> ConsignmentSave()
        {
          
            try
            {
                var attachedfile = HttpContext.Request.Form.Files["attachedfile"];
                ConsignmentModel consignmentModel = JsonConvert.DeserializeObject<ConsignmentModel>(HttpContext.Request.Form["datadetails"]);
                consignmentModel.Attachedfile = "";

                if (attachedfile != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachedfile.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachedfile.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/Lr/attachedfile");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachedfile.CopyToAsync(fileStream);
                        consignmentModel.Attachedfile = imageName;
                    }
                }

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
        [HttpPost("GetLrInnerGridList")]
        public async Task<IActionResult> GetLrInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.GetLrInnerGridList(request);

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

        [HttpPost("CheckDuplicateLr")]
        public async Task<IActionResult> CheckDuplicateLr(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("CheckVehicleNo")]
        public async Task<IActionResult> CheckVehicleNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.CheckVehicleNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        

        [HttpPost("GetLrNo")]
        public async Task<IActionResult> GetLrNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.GetLrNo(request);

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
        [HttpPost("GetVehicleIdList")]
        public async Task<IActionResult> GetVehicleIdList()
        {
            try
            {
                var result = await consignmentBusiness.GetVehicleIdList();

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
        [HttpPost("ChallanMasterSave")]
        public async Task<IActionResult> ChallanMasterSave()
        {
            try
            {
                var photo1 = HttpContext.Request.Form.Files["photo1"];
                var photo2 = HttpContext.Request.Form.Files["photo2"];
                var photo3 = HttpContext.Request.Form.Files["photo3"];
                var truckDriverImage = HttpContext.Request.Form.Files["truckDriverImage"];

                ChallanMasterModel challanMasterModel = JsonConvert.DeserializeObject<ChallanMasterModel>(HttpContext.Request.Form["datadetails"]);
                challanMasterModel.Photo1 = ""; 
                challanMasterModel.Photo2 = ""; 
                challanMasterModel.Photo3 = "";
                challanMasterModel.TruckDriverImage = "";

                if (photo1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(photo1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(photo1.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/challan/photo1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await photo1.CopyToAsync(fileStream);
                        challanMasterModel.Photo1 = imageName;
                    }
                }
                if (photo2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(photo2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(photo2.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/challan/photo2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await photo2.CopyToAsync(fileStream);
                        challanMasterModel.Photo2 = imageName;
                    }
                }
                if (photo3 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(photo3.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(photo3.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/challan/photo3");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await photo3.CopyToAsync(fileStream);
                        challanMasterModel.Photo3 = imageName;
                    }
                }
                if (truckDriverImage != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(truckDriverImage.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(truckDriverImage.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/challan/truckDriverImage");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await truckDriverImage.CopyToAsync(fileStream);
                        challanMasterModel.TruckDriverImage = imageName;
                    }
                }

                var result = await challanMasterBusiness.ChallanMasterSave(challanMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanMasterList")]
        public async Task<IActionResult> GetChallanMasterList(ReportRequestModel request)
        {
            try
            {
                var result = await challanMasterBusiness.GetChallanMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanInnerGridList")]
        public async Task<IActionResult> GetChallanInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetChallanInnerGridList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChallanMasterDelete")]
        public async Task<IActionResult> ChallanMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.ChallanMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanNo")]
        public async Task<IActionResult> GetChallanNo(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetChallanNo(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateChallan")]
        public async Task<IActionResult> CheckDuplicateChallan(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.CheckDuplicateChallan(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetConsignmentId")]
        public async Task<IActionResult> GetConsignmentId(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetConsignmentId(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanDetailsFromLR")]
        public async Task<IActionResult> GetChallanDetailsFromLR(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetChallanDetailsFromLR(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPanValidDetails")]
        public async Task<IActionResult> GetPanValidDetails(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetPanValidDetails(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckChallanPrepForLr")]
        public async Task<IActionResult> CheckChallanPrepForLr(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.CheckChallanPrepForLr(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEWayBillExtList")]
        public async Task<IActionResult> GetEWayBillExtList(ReportRequestModel request)
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
                    var foldername = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/dpr/confirmdoc");
                    var fullPath = System.IO.Path.Combine(foldername, imageName);
                   
                    bool exists = System.IO.Directory.Exists(foldername);
                    if (!exists)
                    {
                        Directory.CreateDirectory(foldername);
                    }
                    using (Stream fileStream = new FileStream(fullPath, FileMode.Create))
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehRcDoc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPanDoc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehDecDoc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/partyInvDoc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/loadingSlipDoc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPhoto1Doc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPhoto2Doc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/tempGc/vehPhoto3Doc");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
        [HttpPost("GetBillSubmitSeries")]
        public async Task<IActionResult> GetBillSubmitSeries(RequestModel request)
        {
            try
            {
                var result = await consignmentBusiness.GetBillSubmitSeries(request);

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

        [HttpPost("SendLRMail")]
        public async Task<IActionResult> SendLRMail(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tempGcBusiness.SendLRMail(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLRPdf")]
        public async Task<IActionResult> GetLRPdf(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tempGcBusiness.GetLRPdf(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetCnorCneeDetails")]
        public async Task<IActionResult> GetCnorCneeDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await tempGcBusiness.GetCnorCneeDetails(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDeliveryAckPodList")]
        public async Task<IActionResult> GetDeliveryAckPodList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await deliveryAckPodBusiness.GetDeliveryAckPodList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DeliveryAckPodDelete")]
        public async Task<IActionResult> DeliveryAckPodDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await deliveryAckPodBusiness.DeliveryAckPodDelete(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DeliveryAckPodSave")]
        public async Task<IActionResult> DeliveryAckPodSave()
        {
            try
            {
                var podAttach1 = HttpContext.Request.Form.Files["podAttach1"];
                var podAttach2 = HttpContext.Request.Form.Files["podAttach2"];

                DeliveryAckPodModel deliveryAckPodModel = JsonConvert.DeserializeObject<DeliveryAckPodModel>(HttpContext.Request.Form["datadetails"]);
                deliveryAckPodModel.PodAttach1 = "";
                deliveryAckPodModel.PodAttach2 = "";

                if (podAttach1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(podAttach1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(podAttach1.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/deliveryackpod/podattach1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await podAttach1.CopyToAsync(fileStream);
                        deliveryAckPodModel.PodAttach1 = imageName;
                    }
                }
                if (podAttach2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(podAttach2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(podAttach2.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/deliveryackpod/podattach2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await podAttach1.CopyToAsync(fileStream);
                        deliveryAckPodModel.PodAttach2 = imageName;
                    }
                }

                var result = await deliveryAckPodBusiness.DeliveryAckPodSave(deliveryAckPodModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDeliveryCnDetails")]
        public async Task<IActionResult> GetDeliveryCnDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await deliveryAckPodBusiness.GetDeliveryCnDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAckSlNo")]
        public async Task<IActionResult> GetAckSlNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await deliveryAckPodBusiness.GetAckSlNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDeliveryAckDoneForLrNo")]
        public async Task<IActionResult> CheckDeliveryAckDoneForLrNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await deliveryAckPodBusiness.CheckDeliveryAckDoneForLrNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetConsignmentUpdateDetails")]
        public async Task<IActionResult> GetConsignmentUpdateDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.GetConsignmentUpdateDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ConsignmentUpdate")]
        public async Task<IActionResult> ConsignmentUpdate()
        {
            try
            {
                var whatsappPOD1 = HttpContext.Request.Form.Files["whatsappPOD1"];
                var whatsappPOD2 = HttpContext.Request.Form.Files["whatsappPOD2"];
                ConsignmentUpdateModel consignmentModel = JsonConvert.DeserializeObject<ConsignmentUpdateModel>(HttpContext.Request.Form["datadetails"]);
                consignmentModel.WhatsappPOD1 = "";
                consignmentModel.WhatsappPOD2 = "";

                if (whatsappPOD1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(whatsappPOD1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(whatsappPOD1.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/Lr/whatsappPOD1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await whatsappPOD1.CopyToAsync(fileStream);
                        consignmentModel.WhatsappPOD1 = imageName;
                    }
                }  

                if (whatsappPOD2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(whatsappPOD2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(whatsappPOD2.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/Lr/whatsappPOD2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await whatsappPOD2.CopyToAsync(fileStream);
                        consignmentModel.WhatsappPOD2 = imageName;
                    }
                }
                var result = await consignmentBusiness.ConsignmentUpdate(consignmentModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLorryHirePaymentList")]
        public async Task<IActionResult> GetLorryHirePaymentList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.GetLorryHirePaymentList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLorryHireInnerGrid")]
        public async Task<IActionResult> GetLorryHireInnerGrid(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.GetLorryHireInnerGrid(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChkLHPMBrokerDisputeDetails")]
        public async Task<IActionResult> ChkLHPMBrokerDisputeDetails(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.ChkLHPMBrokerDisputeDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        

        [HttpPost("LorryHireMasterSave")]
        public async Task<IActionResult> LorryHireMasterSave(LorryHireMasterModel lorryHire)
        {
            if (lorryHire == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.LorryHireMasterSave(lorryHire);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LorryHireMasterDelete")]
        public async Task<IActionResult> LorryHireMasterDelete(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.LorryHireMasterDelete(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetChallanLorryhireDetails")]
        public async Task<IActionResult> GetChallanLorryhireDetails(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.GetChallanLorryhireDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLorryHirePmtNo")]
        public async Task<IActionResult> GetLorryHirePmtNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.GetLorryHirePmtNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckChallanNoExists")]
        public async Task<IActionResult> CheckChallanNoExists(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireBusiness.CheckChallanNoExists(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("GetLorryHireReqList")]
        public async Task<IActionResult> GetLorryHireReqList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireReqBusiness.GetLorryHireReqList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("LorryHireReqSave")]
        public async Task<IActionResult> LorryHireReqSave()
        {

            try
            {
                var attachPath = HttpContext.Request.Form.Files["attachPath"];
                LorryHireReqModel lorryHire = JsonConvert.DeserializeObject<LorryHireReqModel>(HttpContext.Request.Form["datadetails"]);
                lorryHire.AttachPath = "";

                if (attachPath != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attachPath.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attachPath.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/lorryHirePmtReq/attachPath");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attachPath.CopyToAsync(fileStream);
                        lorryHire.AttachPath = imageName;
                    }
                }
                  
                var result = await lorryHireReqBusiness.LorryHireReqSave(lorryHire);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("LorryHireReqDelete")]
        public async Task<IActionResult> LorryHireReqDelete(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireReqBusiness.LorryHireReqDelete(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetChallanDetails")]
        public async Task<IActionResult> GetChallanDetails(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireReqBusiness.GetChallanDetails(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLorryHireAprvList")]
        public async Task<IActionResult> GetLorryHireAprvList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireAprvBusiness.GetLorryHireAprvList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("LorryHireAprvSave")]
        public async Task<IActionResult> LorryHireAprvSave(LorryHireReqModel lorryHire)
        {
            if (lorryHire == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireAprvBusiness.LorryHireAprvSave(lorryHire);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("LorryHireAprvDelete")]
        public async Task<IActionResult> LorryHireAprvDelete(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lorryHireAprvBusiness.LorryHireAprvDelete(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetMrMstList")]
        public async Task<IActionResult> GetMrMstList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.GetMrMstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMrNo")]
        public async Task<IActionResult> GetMrNo(RequestModel request)
        {
            try
            {
                var result = await mrBusiness.GetMrNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPartyGroupList")]
        public async Task<IActionResult> GetPartyGroupList()
        {
            try
            {
                var result = await mrBusiness.GetPartyGroupList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetOnAcMrSearchList")]
        public async Task<IActionResult> GetOnAcMrSearchList(DropDownListModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.GetOnAcMrSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillLRSearchDtls")]
        public async Task<IActionResult> GetBillLRSearchDtls(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.GetBillLRSearchDtls(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetMrInnerGridList")]
        public async Task<IActionResult> GetMrInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.GetMrInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("MrMstDelete")]
        public async Task<IActionResult> MrMstDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.MrMstDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("MrMstSave")]
        public async Task<IActionResult> MrMstSave(MrModel mr)
        {
            if (mr == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.MrMstSave(mr);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCnEnqDetails")]
        public async Task<IActionResult> GetCnEnqDetails(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.GetCnEnqDetails(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetCnEnqDoc")]
        public async Task<IActionResult> GetCnEnqDoc(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.GetCnEnqDoc(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

        [HttpPost("GetCnEnqInnerGridList")]
        public async Task<IActionResult> GetCnEnqInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consignmentBusiness.GetCnEnqInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanEnqDetails")]
        public async Task<IActionResult> GetChallanEnqDetails(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetChallanEnqDetails(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanEnqInnerGridList")]
        public async Task<IActionResult> GetChallanEnqInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetChallanEnqInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }        

        [HttpPost("GetChallanPrintPdf")]
        public async Task<IActionResult> GetChallanPrintPdf(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanMasterBusiness.GetChallanPrintPdf(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMrEnqDetails")]
        public async Task<IActionResult> GetMrEnqDetails(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.GetMrEnqDetails(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetMrEnqInnerGridList")]
        public async Task<IActionResult> GetMrEnqInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await mrBusiness.GetMrEnqInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanReleaseList")]
        public async Task<IActionResult> GetChallanReleaseList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanReleaseBusiness.GetChallanReleaseList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChallanReleaseSave")]
        public async Task<IActionResult> ChallanReleaseSave(ChallanReleaseModel mr)
        {
            if (mr == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanReleaseBusiness.ChallanReleaseSave(mr);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChallanReleaseDelete")]
        public async Task<IActionResult> ChallanReleaseDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanReleaseBusiness.ChallanReleaseDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      
        [HttpPost("SearchChallanDetails")]
        public async Task<IActionResult> SearchChallanDetails(ReportRequestModel request)
        {
            try
            {
                var result = await challanReleaseBusiness.SearchChallanDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateChallanRelease")]
        public async Task<IActionResult> CheckDuplicateChallanRelease(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await challanReleaseBusiness.CheckDuplicateChallanRelease(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }









    }
}

