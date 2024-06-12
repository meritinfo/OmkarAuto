using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FreightMasters.Models;
using FreightMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using FleetMasters.Business;
using FreightMasters.Repository;
using FleetTrans.Business;
using Consignment.Business;
using Consignment.Models;
using Newtonsoft.Json;
using System.Data.Common;
using System.IO;
using FleetTrans.Models;

namespace FCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FreightMastersController : ControllerBase
    {

        readonly IDestinationMasterBusiness freightMastersBusiness;
        readonly IBranchMasterBusiness branchMastersBusiness;
        readonly IProductGroupMasterBusiness productGroupMastersBusiness;
        readonly IDocumentAllotmentBusiness documentAllotmentBusiness;
        readonly IProductMasterBusiness productMasterBusiness;
        readonly IClassificationMasterBusiness classificationMasterBusiness;
        readonly IBillsMasterBusiness billsMasterBusiness;
        readonly ILR_Bill_SeriesBusiness lr_Bill_SeriesBusiness;
        readonly IRatetypesBusiness ratetypesBusiness;
        readonly IFreightRatesMstBusiness freightRatesMstBusiness;
        readonly IDistanceMasterFrtBusiness distanceMasterFrtBusiness;
        readonly IDistanceMasterTripBusiness distanceMasterTripBusiness;
        readonly IDistanceMasterFrtRptBusiness distanceMasterFrtRptBusiness;
        readonly IDistanceMasterTripRptBusiness distanceMasterTripRptBusiness;
        readonly IDriverLicRptBusiness driverLicRptBusiness;
        readonly IConsigneeMasterBusiness consigneeMasterBusiness;

        public FreightMastersController(IDestinationMasterBusiness _freightMastersBusiness,
            IBranchMasterBusiness _branchMastersBusiness,
            IProductGroupMasterBusiness _productGroupMasterBusiness,
            IDocumentAllotmentBusiness _documentAllotmentBusiness,
            IProductMasterBusiness _productMasterBusiness,
            ILR_Bill_SeriesBusiness _lr_Bill_SeriesBusiness,
            IRatetypesBusiness _ratetypesBusiness,
            IClassificationMasterBusiness _classificationMasterBusiness,
            IBillsMasterBusiness _billsMasterBusiness,
            IFreightRatesMstBusiness _freightRatesMstBusiness,
            IDistanceMasterFrtBusiness _distanceMasterFrtBusiness,
            IDistanceMasterTripBusiness _distanceMasterTripBusiness,
            IDistanceMasterFrtRptBusiness _distanceMasterFrtRptBusiness,
            IDistanceMasterTripRptBusiness _distanceMasterTripRptBusiness,
            IConsigneeMasterBusiness _consigneeMasterBusiness,
            IDriverLicRptBusiness _driverLicRptBusiness)
        {
            branchMastersBusiness = _branchMastersBusiness;
            freightMastersBusiness = _freightMastersBusiness;
            productGroupMastersBusiness = _productGroupMasterBusiness;
            productMasterBusiness = _productMasterBusiness;
            lr_Bill_SeriesBusiness = _lr_Bill_SeriesBusiness;
            billsMasterBusiness = _billsMasterBusiness;
            ratetypesBusiness = _ratetypesBusiness;
            classificationMasterBusiness = _classificationMasterBusiness;
            freightRatesMstBusiness = _freightRatesMstBusiness;
            distanceMasterFrtBusiness = _distanceMasterFrtBusiness;
            distanceMasterTripBusiness = _distanceMasterTripBusiness;
            distanceMasterFrtRptBusiness = _distanceMasterFrtRptBusiness;
            distanceMasterTripRptBusiness = _distanceMasterTripRptBusiness;
            consigneeMasterBusiness = _consigneeMasterBusiness;
            driverLicRptBusiness = _driverLicRptBusiness;
            documentAllotmentBusiness = _documentAllotmentBusiness;
            billsMasterBusiness = _billsMasterBusiness;
        }

        /// <summary>
        /// Controller method for DESTINATION MASTER
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        [HttpPost("DestinationMasterDetailsSave")]
        public async Task<IActionResult> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel)
        {
            if (destinationMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightMastersBusiness.DestinationMasterDetailsSave(destinationMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDistanceMasterFrtRPTList")]
        public async Task<IActionResult> GetDistanceMasterFrtRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtRptBusiness.GetDistanceMasterFrtRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelDistanceMasterFrtRptList")]
        public async Task<IActionResult> ExcelDistanceMasterFrtRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtRptBusiness.ExcelDistanceMasterFrtRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDistanceMasterTripRPTList")]
        public async Task<IActionResult> GetDistanceMasterTripRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripRptBusiness.GetDistanceMasterTripRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelDistanceMasterTripRptList")]
        public async Task<IActionResult> ExcelDistanceMasterTripRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripRptBusiness.ExcelDistanceMasterTripRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDriverLicRPTList")]
        public async Task<IActionResult> GetDriverLicRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverLicRptBusiness.GetDriverLicRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ExcelDriverLicRptList")]
        public async Task<IActionResult> ExcelDriverLicRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await driverLicRptBusiness.ExcelDriverLicRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BranchMasterDetailsSave")]
        public async Task<IActionResult> BranchMasterDetailsSave(BranchMasterModel branchMasterModel)
        {
            if (branchMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchMastersBusiness.BranchMasterDetailsSave(branchMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BranchMasterDetailsDelete")]
        public async Task<IActionResult> BranchMasterDetailsDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchMastersBusiness.BranchMasterDetailsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChkCodeExits")]
        public async Task<IActionResult> ChkCodeExits(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchMastersBusiness.ChkCodeExits(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkBranchNameExits")]
        public async Task<IActionResult> ChkBranchNameExits(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchMastersBusiness.ChkBranchNameExits(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("LR_Bill_SeriesDetailsSave")]
        public async Task<IActionResult> LR_Bill_SeriesDetailsSave(LR_Bill_SeriesModel lr_Bill_SeriesModel)
        {
            if (lr_Bill_SeriesModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lr_Bill_SeriesBusiness.LR_Bill_SeriesDetailsSave(lr_Bill_SeriesModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ProductGroupMasterDetailsSave")]
        public async Task<IActionResult> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel)
        {
            if (productGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productGroupMastersBusiness.ProductGroupMasterDetailsSave(productGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ProductMasterSave")]
        public async Task<IActionResult> ProductMasterSave(ProductMasterModel productMasterModel)
        {
            if (productMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productMasterBusiness.ProductMasterSave(productMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ClassificationMasterSave")]
        public async Task<IActionResult> ClassificationMasterSave(ClassificationMasterModel classificationasterModel)
        {
            if (classificationasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await classificationMasterBusiness.ClassificationMasterSave(classificationasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DocumentallotmentSave")]
        public async Task<IActionResult> DocumentallotmentSave(DocumentAllotmentModel documentAllotmentModel)
        {
            if (documentAllotmentModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.DocumentallotmentSave(documentAllotmentModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDocumentAllotmentList")]
        public async Task<IActionResult> GetDocumentAllotmentList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.GetDocumentAllotmentList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDocumentNumcode")]
        public async Task<IActionResult> GetDocumentNumcode(RequestModel pageRequest)
        {
            if (pageRequest == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.GetDocNumCode(pageRequest);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DocumentAllotmentDelete")]
        public async Task<IActionResult> DocumentAllotmentDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.DocumentAllotmentDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("chkDocumentRange")]
        public async Task<IActionResult> chkDocumentRange(ScheduleModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.CheckDocumentRange(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpPost("ChallanMasterSave")]
        //public async Task<IActionResult> ChallanMasterSave(ChallanMasterModel challanMasterModel)
        //{
        //    if (challanMasterModel == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await challanMasterBusiness.ChallanMasterSave(challanMasterModel);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpPost("GetChallanMasterList")]
        //public async Task<IActionResult> GetChallanMasterList(ReportRequestModel request)
        //{
        //    try
        //    {
        //        var result = await challanMasterBusiness.GetChallanMasterList(request);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpPost("GetChallanInnerGridList")]
        //public async Task<IActionResult> GetChallanInnerGridList(RequestModel request)
        //{
        //    if (request == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await challanMasterBusiness.GetChallanInnerGridList(request);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpPost("ChallanMasterDelete")]
        //public async Task<IActionResult> ChallanMasterDelete(RequestModel req)
        //{
        //    if (req == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await challanMasterBusiness.ChallanMasterDelete(req);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpPost("GetBillsMasterList")]
        public async Task<IActionResult> GetBillsMasterList(PageRequest request)
        {
            try
            {
                var result = await billsMasterBusiness.GetBillsMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillsMasterSearchList")]
        public async Task<IActionResult> GetBillsMasterSearchList(BillsMasterSearchListRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.GetBillsMasterSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateClass")]
        public async Task<IActionResult> CheckDuplicateClass(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await classificationMasterBusiness.CheckDuplicateClass(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateRateDesc")]
        public async Task<IActionResult> CheckDuplicateRateDesc(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratetypesBusiness.CheckDuplicateRateDesc(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateProduct")]
        public async Task<IActionResult> CheckDuplicateProduct(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productMasterBusiness.CheckDuplicateProduct(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsMasterSave")]
        public async Task<IActionResult> BillsMasterSave(BillsMasterModel billsMasterModel)
        {
            if (billsMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.BillsMasterSave(billsMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillsInnerGridList")]
        public async Task<IActionResult> GetBillsInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.GetBillsInnerGridList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsMasterDelete")]
        public async Task<IActionResult> BillsMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.BillsMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetClassificationMasterList")]
        public async Task<IActionResult> GetClassificationMasterList(PageRequest request)
        {
            try
            {
                var result = await classificationMasterBusiness.GetClassificationMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("classificationMasterDelete")]
        public async Task<IActionResult> ClassificationMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await classificationMasterBusiness.ClassificationMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("RateTypeDelete")]
        public async Task<IActionResult>RateTypeDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratetypesBusiness.RateTypeDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ProductMasterDelete")]
        public async Task<IActionResult> ProductMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productMasterBusiness.ProductMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DistanceMasterFrtSave")]
        public async Task<IActionResult> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            if (distanceMasterFrtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.DistanceMasterFrtSave(distanceMasterFrtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkdistanceFrtValidity")]
        public async Task<IActionResult> ChkdistanceFrtValidity(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            if (distanceMasterFrtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.ChkdistanceFrtValidity(distanceMasterFrtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkdistanceTripValidity")]
        public async Task<IActionResult> ChkdistanceTripValidity(DistanceMasterTripModel distanceMasterTripModel)
        {
            if (distanceMasterTripModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.ChkdistanceTripValidity(distanceMasterTripModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("DistanceMasterTripSave")]
        public async Task<IActionResult> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel)
        {
            if (distanceMasterTripModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.DistanceMasterTripSave(distanceMasterTripModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DistanceMasterTripDelete")]
        public async Task<IActionResult> DistanceMasterTripDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.DistanceMasterTripDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DistanceMasterFrtDelete")]
        public async Task<IActionResult> DistanceMasterFrtDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.DistanceMasterFrtDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFreightTripInnerGridList")]
        public async Task<IActionResult> GetFreightTripInnerGridList(RequestModel request)
        {
            try
            {
                var result = await distanceMasterTripBusiness.GetFreightTripInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetFreightRateInnerGridList")]
        public async Task<IActionResult> GetFreightRateInnerGridList(RequestModel request)
        {
            try
            {
                var result = await freightRatesMstBusiness.GetFreightRateInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFreightInnerGridList")]
        public async Task<IActionResult> GetFreightInnerGridList(RequestModel request)
        {
            try
            {
                var result = await distanceMasterFrtBusiness.GetFreightInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("FreightRatesMstSave")]
        public async Task<IActionResult> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel)
        {
            if (freightRatesMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRatesMstBusiness.FreightRatesMstSave(freightRatesMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetPartyList")]
        public async Task<IActionResult> GetPartyList()
        {
            try
            {
                var result = await freightRatesMstBusiness.GetPartyList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("ConsigneeMasterSave")]
        public async Task<IActionResult> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel)
        {
            if (consigneeMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consigneeMasterBusiness.ConsigneeMasterSave(consigneeMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Controller method for Branch List
        /// </summary>
        [HttpPost("GetBranchList")]
        public async Task<IActionResult> GetBranchList()
        {
            try
            {
                var result = await branchMastersBusiness.GetBranchList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetStateList")]
        public async Task<IActionResult> GetStateList()
        {
            try
            {
                var result = await freightMastersBusiness.GetStateList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetProductGroupList")]
        public async Task<IActionResult> GetProductGroupList()
        {
            try
            {
                var result = await productMasterBusiness.GetProductGroupList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        /// <summary>
        /// Controller method for PRODUCT GROUP MASTER
        /// </summary>
        /// <param name="ratetypesModel"></param>
        [HttpPost("RatetypesDetailsSave")]
        public async Task<IActionResult> RatetypesDetailsSave(RatetypesModel ratetypesModel)
        {
            if (ratetypesModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratetypesBusiness.RatetypesDetailsSave(ratetypesModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDestinationMasterList")]
        public async Task<IActionResult> GetDestinationMasterList(PageRequest request)
        {
            try
            {
                var result = await freightMastersBusiness.GetDestinationMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceMasterFrtList")]
        public async Task<IActionResult> GetDistanceMasterFrtList(ReportRequestModel request)
        {
            try
            {
                var result = await distanceMasterFrtBusiness.GetDistanceMasterFrtList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFreightRatesList")]
        public async Task<IActionResult> GetFreightRatesList(PageRequest request)
        {
            try
            {
                var result = await freightRatesMstBusiness.GetFreightRatesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FreightRatesMasterDetailsDelete")]
        public async Task<IActionResult> FreightRatesMasterDetailsDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRatesMstBusiness.FreightRatesMasterDetailsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceMasterTripList")]
        public async Task<IActionResult> GetDistanceMasterTripList(ReportRequestModel request)
        {
            try
            {
                var result = await distanceMasterTripBusiness.GetDistanceMasterTripList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBranchMasterList")]
        public async Task<IActionResult> GetBranchMasterList(PageRequest request)
        {
            try
            {
                var result = await branchMastersBusiness.GetBranchMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetproductMasterList")]
        public async Task<IActionResult> GetProductMasterList(PageRequest request)
        {
            try
            {
                var result = await productMasterBusiness.GetProductMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetProductGroupMasterList")]
        public async Task<IActionResult> GetProductGroupMasterList(PageRequest request)
        {
            try
            {
                var result = await productGroupMastersBusiness.GetProductGroupMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LRBillSeriesList")]
        public async Task<IActionResult> LrBillSeriesList(PageRequest request)
        {
            try
            {
                var result = await lr_Bill_SeriesBusiness.LRBillSeriesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetRateTypesList")]
        public async Task<IActionResult> GetRateTypesList(PageRequest request)
        {
            try
            {
                var result = await ratetypesBusiness.GetRateTypesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistancefrtFromLocationList")]
        public async Task<IActionResult> GetDistancefrtFromLocationList()
        {
            try
            {
                var result = await distanceMasterFrtBusiness.GetDistancefrtFromLocationList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceFrtDtls")]
        public async Task<IActionResult> GetDistanceFrtDtls(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.GetDistanceFrtDtls(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceFrtEditDetails")]
        public async Task<IActionResult> GetDistanceFrtEditDetails(DistanceFrtEditModel distanceFrtEdit)
        {
            if (distanceFrtEdit == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.GetDistanceFrtEditDetails(distanceFrtEdit);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DistanceFrtEditDetailsSave")]
        public async Task<IActionResult> DistanceFrtEditDetailsSave(DistanceFrtEditModel distanceFrtEdit)
        {
            if (distanceFrtEdit == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.DistanceFrtEditDetailsSave(distanceFrtEdit);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("GetDistanceTripFromLocationList")]
        public async Task<IActionResult> GetDistanceTripFromLocationList()
        {
            try
            {
                var result = await distanceMasterTripBusiness.GetDistanceTripFromLocationList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceTripDtls")]
        public async Task<IActionResult> GetDistanceTripDtls(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.GetDistanceTripDtls(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceTripEditDetails")]
        public async Task<IActionResult> GetDistanceTripEditDetails(DistanceTripEditModel distanceTripEdit)
        {
            if (distanceTripEdit == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.GetDistanceTripEditDetails(distanceTripEdit);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DistanceTripEditDetailsSave")]
        public async Task<IActionResult> DistanceTripEditDetailsSave(DistanceTripEditModel distanceTripEdit)
        {
            if (distanceTripEdit == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.DistanceTripEditDetailsSave(distanceTripEdit);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost("GetBillsMasterList")]
        //public async Task<IActionResult> GetBillsMasterList(ReportRequestModel request)
        //{
        //    try
        //    {
        //        var result = await billsMasterBusiness.GetBillsMasterList(request);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpPost("BillsMasterSave")]
        //public async Task<IActionResult> BillsMasterSave(BillsMasterModel billsMasterModel)
        //{
        //    if (billsMasterModel == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await billsMasterBusiness.BillsMasterSave(billsMasterModel);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpPost("GetBillsInnerGridList")]
        //public async Task<IActionResult> GetBillsInnerGridList(RequestModel request)
        //{
        //    if (request == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await billsMasterBusiness.GetBillsInnerGridList(request);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpPost("BillsMasterDelete")]
        //public async Task<IActionResult> BillsMasterDelete(RequestModel req)
        //{
        //    if (req == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await billsMasterBusiness.BillsMasterDelete(req);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}



    }
}
