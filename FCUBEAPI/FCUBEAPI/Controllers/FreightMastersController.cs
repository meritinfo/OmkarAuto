using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FreightMasters.Models;
using FreightMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;


namespace FCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FreightMastersController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IPartyGroupMasterBusiness partyGroupMasterBusiness;
        readonly IDestinationMasterBusiness freightMastersBusiness;
        readonly IBranchMasterBusiness branchMastersBusiness;
        readonly IProductGroupMasterBusiness productGroupMastersBusiness;
        readonly IDocumentAllotmentBusiness documentAllotmentBusiness;
        readonly IProductMasterBusiness productMasterBusiness;
        readonly IClassificationMasterBusiness classificationMasterBusiness;
        readonly IBillsMasterBusiness billsMasterBusiness;
        readonly IFleetBillsMasterBusiness fleetbillsMasterBusiness;
        readonly IBillsTypeBusiness billsTypeBusiness;
        readonly IRatetypesBusiness ratetypesBusiness;
        readonly IFreightRatesMstBusiness freightRatesMstBusiness;
        readonly IDistanceMasterFrtBusiness distanceMasterFrtBusiness;
        readonly IDistanceMasterTripBusiness distanceMasterTripBusiness;
        readonly IConsigneeMasterBusiness consigneeMasterBusiness;
        readonly ICompanyInfoBusiness companyInfoBusiness;
        readonly ILhpmSlabMasterBusiness lhpmSlabMasterBusiness;
        readonly IBillSubmitMstBusiness billSubmitMstBusiness;
        readonly IAdditionalCostRecMasterBusiness additionalCostRecMasterBusiness;
        readonly IAddCostRecBusiness addCostRecorveryBusiness;
        readonly IPanWiseTdsRateBusiness panWiseTdsRateBusiness;
        readonly IFreightRptBusiness freightRptBusiness;
        readonly IGstPctValuesBusiness gstPctValuesBusiness;
        readonly IRatesMasterNewBusiness ratesMasterNewBusiness;
        readonly IChCostTypesBusiness chCostTypesBusiness;
      




        readonly IFreightGstMasterBusiness freightGstMasterBusiness;
        readonly ILRBillSeriesBusiness lrBillSeriesBusiness;
        readonly IBillsMasterLlpBusiness billsMasterBusinessLLP;
        readonly IAdminGroupMasterBusiness adminGroupMasterBusiness;
        readonly IBranchCustomerTargetBusiness branchCustomerTargetBusiness;
        readonly IPartyMisLocationBusiness partyMisLocationBusiness;
        readonly IDocumentMasterBusiness documentMasterBusiness;


        public FreightMastersController(IOptions<DBModel> _dbconnection,
            IDestinationMasterBusiness _freightMastersBusiness,
            IBranchMasterBusiness _branchMastersBusiness,
            IProductGroupMasterBusiness _productGroupMasterBusiness,
            IDocumentAllotmentBusiness _documentAllotmentBusiness,
            IProductMasterBusiness _productMasterBusiness,
            IBillsTypeBusiness _billsTypeBusiness,
            IRatetypesBusiness _ratetypesBusiness,
            IClassificationMasterBusiness _classificationMasterBusiness,
            IBillsMasterBusiness _billsMasterBusiness,
            IFleetBillsMasterBusiness _fleetbillsMasterBusiness,
            IFreightRatesMstBusiness _freightRatesMstBusiness,
            IDistanceMasterFrtBusiness _distanceMasterFrtBusiness,
            IDistanceMasterTripBusiness _distanceMasterTripBusiness,
            IConsigneeMasterBusiness _consigneeMasterBusiness,
            ICompanyInfoBusiness _companyInfoBusiness,
            ILhpmSlabMasterBusiness _lhpmSlabMasterBusiness,
            IPartyGroupMasterBusiness _partyGroupMasterBusiness,
            IBillSubmitMstBusiness _billSubmitMstBusiness,
            IAdditionalCostRecMasterBusiness _additionalCostRecMasterBusiness,
            IAddCostRecBusiness _addCostRecorveryBusiness,
           IPanWiseTdsRateBusiness _panWiseTdsRateBusiness,
           IFreightRptBusiness _freightRptBusiness,
           IGstPctValuesBusiness _gstPctValuesBusiness,
           IRatesMasterNewBusiness _ratesMasterNewBusiness,
           IChCostTypesBusiness _chCostTypesBusiness,
            IFreightGstMasterBusiness _freightGstMasterBusiness,
             ILRBillSeriesBusiness _lrBillSeriesBusiness,
             IBillsMasterLlpBusiness _billsMasterBusinessLLP,
             IAdminGroupMasterBusiness _adminGroupMasterBusiness,
             IBranchCustomerTargetBusiness _branchCustomerTargetBusiness,
             IPartyMisLocationBusiness _partyMisLocationBusiness,
             IDocumentMasterBusiness _documentMasterBusiness)
        {
            dbconnection = _dbconnection;
            branchMastersBusiness = _branchMastersBusiness;
            freightMastersBusiness = _freightMastersBusiness;
            productGroupMastersBusiness = _productGroupMasterBusiness;
            productMasterBusiness = _productMasterBusiness;
            billsMasterBusiness = _billsMasterBusiness;
            fleetbillsMasterBusiness = _fleetbillsMasterBusiness;
            ratetypesBusiness = _ratetypesBusiness;
            classificationMasterBusiness = _classificationMasterBusiness;
            freightRatesMstBusiness = _freightRatesMstBusiness;
            distanceMasterFrtBusiness = _distanceMasterFrtBusiness;
            distanceMasterTripBusiness = _distanceMasterTripBusiness;
            consigneeMasterBusiness = _consigneeMasterBusiness;
            documentAllotmentBusiness = _documentAllotmentBusiness;
            billsMasterBusiness = _billsMasterBusiness;
            billsTypeBusiness = _billsTypeBusiness;
            companyInfoBusiness = _companyInfoBusiness;
            lhpmSlabMasterBusiness = _lhpmSlabMasterBusiness;
            partyGroupMasterBusiness = _partyGroupMasterBusiness;
            billSubmitMstBusiness = _billSubmitMstBusiness;
            additionalCostRecMasterBusiness = _additionalCostRecMasterBusiness;
            addCostRecorveryBusiness = _addCostRecorveryBusiness;
            panWiseTdsRateBusiness = _panWiseTdsRateBusiness;
            freightRptBusiness = _freightRptBusiness;
            gstPctValuesBusiness = _gstPctValuesBusiness;
            ratesMasterNewBusiness = _ratesMasterNewBusiness;
            chCostTypesBusiness = _chCostTypesBusiness;
            freightGstMasterBusiness = _freightGstMasterBusiness;
            lrBillSeriesBusiness = _lrBillSeriesBusiness;
            billsMasterBusinessLLP = _billsMasterBusinessLLP;
            adminGroupMasterBusiness = _adminGroupMasterBusiness;
            branchCustomerTargetBusiness = _branchCustomerTargetBusiness;
            partyMisLocationBusiness = _partyMisLocationBusiness;
            this.documentMasterBusiness = _documentMasterBusiness;
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
                var result = await freightRptBusiness.GetDistanceMasterFrtRptList(request);

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
                var result = await freightRptBusiness.ExcelDistanceMasterFrtRptList(request);

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
                var result = await freightRptBusiness.GetDistanceMasterTripRptList(request);

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
                var result = await freightRptBusiness.ExcelDistanceMasterTripRptList(request);

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
                var result = await freightRptBusiness.GetDriverLicRptList(request);

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
                var result = await freightRptBusiness.ExcelDriverLicRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDPRRptList")]
        public async Task<IActionResult> GetDPRRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetDPRRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDPRRptExcel")]
        public async Task<IActionResult> GetDPRRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetDPRRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLHPaymentSummRptExcel")]
        public async Task<IActionResult> GetLHPaymentSummRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLHPaymentSummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDetentionRptList")]
        public async Task<IActionResult> GetDetentionRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetDetentionRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDetentionRptExcel")]
        public async Task<IActionResult> GetDetentionRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetDetentionRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDeductionRptList")]
        public async Task<IActionResult> GetDeductionRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetDeductionRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDeductionRptExcel")]
        public async Task<IActionResult> GetDeductionRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetDeductionRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMissingDocRptList")]
        public async Task<IActionResult> GetMissingDocRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetMissingDocRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMissingDocRptExcel")]
        public async Task<IActionResult> GetMissingDocRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetMissingDocRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillGstRptExcel")]
        public async Task<IActionResult> GetBillGstRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBillGstRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetDeliveryDisputeRptExcel")]
        public async Task<IActionResult> GetDeliveryDisputeRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetDeliveryDisputeRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetPartyMISRptExcel")]
        public async Task<IActionResult> GetPartyMISRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetPartyMISRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetPartyMisList")]
        public async Task<IActionResult> GetPartyMisList()
        {
            try
            {
                var result = await freightRptBusiness.GetPartyMisList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetBillInterestLossRptExcel")]
        public async Task<IActionResult> GetBillInterestLossRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBillInterestLossRptExcel(request);

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
        [HttpPost("CheckDocumentRange")]
        public async Task<IActionResult> CheckDocumentRange(ReportRequestModel req)
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
        [HttpPost("CheckDocumentllpRange")]
        public async Task<IActionResult> CheckDocumentllpRange(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.CheckDocumentllpRange(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("GetRangeList")]
        public async Task<IActionResult> GetRangeList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.GetRangeList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSeriesllpList")]
        public async Task<IActionResult> GetSeriesllpList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.GetSeriesllpList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckIncSeries")]
        public async Task<IActionResult> CheckIncSeries(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentAllotmentBusiness.CheckIncSeries(req);

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
        [HttpPost("GetFinAcList")]
        public async Task<IActionResult> GetFinAcList()
        {
            try
            {
                var result = await billsTypeBusiness.GetFinAcList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillsTypeList")]
        public async Task<IActionResult> GetBillsTypeList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsTypeBusiness.GetBillsTypeList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsTypeSave")]
        public async Task<IActionResult> BillsTypeSave(BillsTypeModel billsTypeModel)
        {
            if (billsTypeModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsTypeBusiness.BillsTypeSave(billsTypeModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsTypeDelete")]
        public async Task<IActionResult> BillsTypeDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsTypeBusiness.BillsTypeDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillsMasterList")]
        public async Task<IActionResult> GetBillsMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("GetFleetBillsMasterList")]
        public async Task<IActionResult> GetFleetBillsMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillsMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillEnqDetails")]
        public async Task<IActionResult> GetBillEnqDetails(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.GetBillEnqDetails(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FleetGetBillEnqDetails")]
        public async Task<IActionResult> GetFleetBillEnqDetails(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillEnqDetails(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillEnqInnerGridList")]
        public async Task<IActionResult> GetMrEnqInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.GetBillEnqInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFleetBillEnqInnerGridList")]
        public async Task<IActionResult> GetFleetMrEnqInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillEnqInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillPdf")]
        public async Task<IActionResult> GetBillPdf(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.GetBillPdf(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFleetBillPdf")]
        public async Task<IActionResult> GetFleetBillPdf(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillPdf(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFleetBillGsrPdf")]
        public async Task<IActionResult> GetFleetBillGsrPdf(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillGsrPdf(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillsMasterSearchList")]
        public async Task<IActionResult> GetBillsMasterSearchList(RequestModel request)
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
        [HttpPost("GetFleetBillsMasterSearchList")]
        public async Task<IActionResult> GetFleetBillsMasterSearchList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillsMasterSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillPartyGstLocationList")]
        public async Task<IActionResult> GetBillPartyGstLocationList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.GetBillPartyGstLocationList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFleetBillPartyGstLocationList")]
        public async Task<IActionResult> GetFleetBillPartyGstLocationList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillPartyGstLocationList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateBillsNo")]
        public async Task<IActionResult> CheckDuplicateBillsNo(BillsMasterModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.CheckDuplicateBillsNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckFleetDuplicateBillsNo")]
        public async Task<IActionResult> CheckFleetDuplicateBillsNo(BillsMasterModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.CheckDuplicateBillsNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFleetBillTypeSacHsn")]
        public async Task<IActionResult> GetFleetBillTypeSacHsn(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillTypeSacHsn(request);

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
        [HttpPost("CheckDuplicateBillType")]
        public async Task<IActionResult> CheckDuplicateBillType(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsTypeBusiness.CheckDuplicateBillType(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetBillTypesList")]
        public async Task<IActionResult> GetBillTypesList()
        {
            try
            {
                var result = await billsTypeBusiness.GetBillTypesList();

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
        [HttpPost("FleetBillsMasterSave")]
        public async Task<IActionResult> FleetBillsMasterSave(BillsMasterModel billsMasterModel)
        {
            if (billsMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.BillsMasterSave(billsMasterModel);

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
        [HttpPost("GetFleetBillsInnerGridList")]
        public async Task<IActionResult> GetFleetBillsInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.GetBillsInnerGridList(request);
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
        [HttpPost("FleetBillsMasterDelete")]
        public async Task<IActionResult> FleetBillsMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await fleetbillsMasterBusiness.BillsMasterDelete(req);

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("LrBillUpdate")]
        public async Task<IActionResult> LrBillUpdate(RequestModel reqModel)
        {
            if (reqModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.LrBillUpdate(reqModel);

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
        public async Task<IActionResult> RateTypeDelete(RequestModel req)
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
                

        [HttpPost("GetRateTypeMethod")]
        public async Task<IActionResult> GetRateTypeMethod(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRatesMstBusiness.GetRateTypeMethod(req);

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
        [HttpPost("GetConsigneeCnorList")]
        public async Task<IActionResult> GetConsigneeCnorList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consigneeMasterBusiness.GetConsigneeCnorList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ConsigneeCnorMasterDelete")]
        public async Task<IActionResult> ConsigneeCnorMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consigneeMasterBusiness.ConsigneeCnorMasterDelete(req);

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("GetRateTypesList")]
        public async Task<IActionResult> GetRateTypesList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
        [HttpPost("CompanyInfoSave")]
        public async Task<IActionResult> CompanyInfoSave(CompanyInfoModel companyInfoModel)
        {
            if (companyInfoModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await companyInfoBusiness.CompanyInfoSave(companyInfoModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCompanyDetail")]
        public async Task<IActionResult> GetCompanyDetail()
        {

            try
            {
                var result = await companyInfoBusiness.GetCompanyDetail();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LhpmSlabMasterSave")]
        public async Task<IActionResult> LhpmSlabMasterSave(LhpmSlabMasterModel lhpmSlabMasterModel)
        {
            if (lhpmSlabMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lhpmSlabMasterBusiness.LhpmSlabMasterSave(lhpmSlabMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLhpmSlabMasterList")]
        public async Task<IActionResult> GetLhpmSlabMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lhpmSlabMasterBusiness.GetLhpmSlabMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LhpmSlabMasterDelete")]
        public async Task<IActionResult> LhpmSlabMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lhpmSlabMasterBusiness.LhpmSlabMasterDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBookingRegisterRptExcel")]
        public async Task<IActionResult> GetBookingRegisterRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBookingRegisterRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBookingRegisterRptList")]
        public async Task<IActionResult> GetBookingRegisterRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBookingRegisterRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLRWithOutChallanRptExcel")]
        public async Task<IActionResult> GetLRWithOutChallanRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLRWithOutChallanRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLRWithOutChallanRptList")]
        public async Task<IActionResult> GetLRWithOutChallanRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLRWithOutChallanRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetUnBilledRptExcel")]
        public async Task<IActionResult> GetUnBilledRptExcel(RepReqModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetUnBilledRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetUnBilledRptList")]
        public async Task<IActionResult> GetUnBilledRptList(RepReqModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetUnBilledRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetPendingDelvAckRptExcel")]
        public async Task<IActionResult> GetPendingDelvAckRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetPendingDelvAckRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetChallanRegisterRptList")]
        public async Task<IActionResult> GetChallanRegisterRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetChallanRegisterRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetChallanRegisterRptExcel")]
        public async Task<IActionResult> GetChallanRegisterRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetChallanRegisterRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChallanTdsStatementRptExcel")]
        public async Task<IActionResult> GetChallanTdsStatementRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetChallanTdsStatementRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetChallanTdsStatementRptList")]
        public async Task<IActionResult> GetChallanTdsStatementRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetChallanTdsStatementRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetCountOfDocEnteredRptExcel")]
        public async Task<IActionResult> GetCountOfDocEnteredRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetCountOfDocEnteredRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetLhPayableStatusRptList")]
        public async Task<IActionResult> GetLhPayableStatusRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLhPayableStatusRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLhPayableStatusRptExcel")]
        public async Task<IActionResult> GetLhPayableStatusRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLhPayableStatusRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillRegisterRptExcel")]
        public async Task<IActionResult> GetBillRegisterRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBillRegisterRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillRegisterRptList")]
        public async Task<IActionResult> GetBillRegisterRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBillRegisterRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMRRegisterRptExcel")]
        public async Task<IActionResult> GetMRRegisterRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetMRRegisterRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetMRRegisterRptList")]
        public async Task<IActionResult> GetMRRegisterRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetMRRegisterRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLHPMVarianceRptExcel")]
        public async Task<IActionResult> GetLHPMVarianceRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLHPMVarianceRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLHPMVarianceRptList")]
        public async Task<IActionResult> GetLHPMVarianceRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLHPMVarianceRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetGSTRegisterRptExcel")]
        public async Task<IActionResult> GetGSTRegisterRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetGSTRegisterRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetGSTRegisterRptList")]
        public async Task<IActionResult> GetGSTRegisterRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetGSTRegisterRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("PartyGroupMasterSave")]
        public async Task<IActionResult> PartyGroupMasterSave(PartyGroupMasterModel partyGroupMasterModel)
        {
            if (partyGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyGroupMasterBusiness.PartyGroupMasterSave(partyGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPartyGroupMasterlist")]
        public async Task<IActionResult> GetPartyGroupMasterlist(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyGroupMasterBusiness.GetPartyGroupMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPartyGroupDetailInnergrid")]
        public async Task<IActionResult> GetPartyGroupDetailInnergrid(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyGroupMasterBusiness.GetPartyGroupDetailInnergrid(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PartyGroupMasterDelete")]
        public async Task<IActionResult> PartyGroupMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }

            try
            {
                var result = await partyGroupMasterBusiness.PartyGroupMasterDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetLHExtraPmtReconRptExcel")]
        public async Task<IActionResult> GetLHExtraPmtReconRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLHExtraPmtReconRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLHExtraPmtReconRptList")]
        public async Task<IActionResult> GetLHExtraPmtReconRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLHExtraPmtReconRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillSubmitMasterList")]
        public async Task<IActionResult> GetBillSubmitMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billSubmitMstBusiness.GetBillSubmitMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetBillSubmitPrint")]
        public async Task<IActionResult> GetBillSubmitPrint(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billSubmitMstBusiness.GetBillSubmitPrint(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillSubmitMasterInnerGridList")]
        public async Task<IActionResult> GetBillSubmitMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billSubmitMstBusiness.GetBillSubmitMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BillSubmitMasterDelete")]
        public async Task<IActionResult> BillSubmitMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }

            try
            {
                var result = await billSubmitMstBusiness.BillSubmitMasterDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BillSubmitMstSave")]
        public async Task<IActionResult> BillSubmitMstSave(BillSubmitMasterModel billSubmitMasterModel)
        {
            if (billSubmitMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billSubmitMstBusiness.BillSubmitMstSave(billSubmitMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDeptList")]
        public async Task<IActionResult> GetDeptList()
        {
            try
            {
                var result = await billSubmitMstBusiness.GetDeptList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillSubmitSearchList")]
        public async Task<IActionResult> GetBillSubmitSearchList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billSubmitMstBusiness.GetBillSubmitSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetAdditionalCostRecMasterList")]
        public async Task<IActionResult> GetAdditionalCostRecMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await additionalCostRecMasterBusiness.GetAdditionalCostRecMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("AdditionalCostRecMasterSave")]
        public async Task<IActionResult> AdditionalCostRecMasterSave(AdditionalCostRecMasterModel additionalCostRecMasterModel)
        {
            if (additionalCostRecMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await additionalCostRecMasterBusiness.AdditionalCostRecMasterSave(additionalCostRecMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetAdditionalCostRecDelete")]
        public async Task<IActionResult> GetAdditionalCostRecDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }

            try
            {
                var result = await additionalCostRecMasterBusiness.GetAdditionalCostRecDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateAddCostDescription")]
        public async Task<IActionResult> CheckDuplicateAddCostDescription(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await additionalCostRecMasterBusiness.CheckDuplicateAddCostDescription(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateAddCostCode")]
        public async Task<IActionResult> CheckDuplicateAddCostCode(RequestModel requestModel)
        {
            if (requestModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await additionalCostRecMasterBusiness.CheckDuplicateAddCostCode(requestModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetAgeingSummRptExcel")]
        public async Task<IActionResult> GetAgeingSummRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetAgeingSummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAgeingSummBranchRptExcel")]
        public async Task<IActionResult> GetAgeingSummBranchRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetAgeingSummBranchRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAgeingSummPartyRptExcel")]
        public async Task<IActionResult> GetAgeingSummPartyRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetAgeingSummPartyRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAgeingDetailRptExcel")]
        public async Task<IActionResult> GetAgeingDetailRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetAgeingDetailRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOutstandingSummRptExcel")]
        public async Task<IActionResult> GetOutstandingSummRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOutstandingSummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOutstandingDetailRptExcel")]
        public async Task<IActionResult> GetOutstandingDetailRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOutstandingDetailRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetOutstandingDetailPartyRptExcel")]
        public async Task<IActionResult> GetOutstandingDetailPartyRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOutstandingDetailPartyRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
       
        [HttpPost("GetOutstandingDetailPartyRptList")]
        public async Task<IActionResult> GetOutstandingDetailPartyRptList(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOutstandingDetailPartyRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillSubmittedSummRptExcel")]
        public async Task<IActionResult> GetBillSubmittedSummRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBillSubmittedSummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillSubmittedDetailRptExcel")]
        public async Task<IActionResult> GetBillSubmittedDetailRptExcel(ReportAgeModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBillSubmittedDetailRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOutstandingAnalysisRptExcel")]
        public async Task<IActionResult> GetOutstandingAnalysisRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOutstandingAnalysisRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetOutstandingAnalysisRptList")]
        public async Task<IActionResult> GetOutstandingAnalysisRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOutstandingAnalysisRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("GetLRCostingRptExcel")]
        public async Task<IActionResult> GetLRCostingRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLRCostingRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLRwiseCostingLlpRptExcel")]
        public async Task<IActionResult> GetLRwiseCostingLlpRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLRwiseCostingLlpRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLRCostingRptList")]
        public async Task<IActionResult> GetLRCostingRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetLRCostingRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOnAccountMRStatusRptExcel")]
        public async Task<IActionResult> GetOnAccountMRStatusRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOnAccountMRStatusRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetOnAccountMRStatusRptList")]
        public async Task<IActionResult> GetOnAccountMRStatusRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetOnAccountMRStatusRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetAddCostRecorveryRptExcel")]
        public async Task<IActionResult> GetAddCostRecorveryRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecorveryRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetAddCostRecorveryRptList")]
        public async Task<IActionResult> GetAddCostRecorveryRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecorveryRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetAddCostRecMstList")]
        public async Task<IActionResult> GetAddCostRecMstList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecMstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAddCostRecInnerGridList")]
        public async Task<IActionResult> GetAddCostRecInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddCostRecSave")]
        public async Task<IActionResult> AddCostRecSave()
        {
            try
            {
                var attatchFile1 = HttpContext.Request.Form.Files["attatchFile1"];
                var attatchFile2 = HttpContext.Request.Form.Files["attatchFile2"];

                AddCostRecMstModel addCostRec = JsonConvert.DeserializeObject<AddCostRecMstModel>(HttpContext.Request.Form["datadetails"]);
                if (attatchFile1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attatchFile1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attatchFile1.FileName);
                    var foldername = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/addcostrecentry/attatchFile1/");
                    var fullPath = System.IO.Path.Combine(foldername, imageName);

                    bool exists = System.IO.Directory.Exists(foldername);
                    if (!exists)
                    {
                        Directory.CreateDirectory(foldername);
                    }
                    using (Stream fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await attatchFile1.CopyToAsync(fileStream);
                        addCostRec.AttatchFile1 = imageName;
                    }
                }
                if (attatchFile2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attatchFile2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attatchFile2.FileName);
                    var foldername = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/addcostrecentry/attatchFile2/");
                    var fullPath = System.IO.Path.Combine(foldername, imageName);

                    bool exists = System.IO.Directory.Exists(foldername);
                    if (!exists)
                    {
                        Directory.CreateDirectory(foldername);
                    }
                    using (Stream fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await attatchFile1.CopyToAsync(fileStream);
                        addCostRec.AttatchFile2 = imageName;
                    }
                }
                var result = await addCostRecorveryBusiness.AddCostRecSave(addCostRec);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddCostRecDelete")]
        public async Task<IActionResult> AddCostRecDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.AddCostRecDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetAddCostRecEntryTranNo")]
        public async Task<IActionResult> GetAddCostRecEntryTranNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecEntryTranNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAddCostRecList")]
        public async Task<IActionResult> GetAddCostRecList()
        {
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAddCostRecEntryDocDetails")]
        public async Task<IActionResult> GetAddCostRecEntryDocDetails(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecEntryDocDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAddCostRecEntrySearchList")]
        public async Task<IActionResult> GetAddCostRecEntrySearchList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetAddCostRecEntrySearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetcostCodeList")]
        public async Task<IActionResult> GetcostCodeList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await addCostRecorveryBusiness.GetcostCodeList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBusinessSummRptExcel")]
        public async Task<IActionResult> GetbusinessSummRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBusinessSummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBusinessSummRptList")]
        public async Task<IActionResult> GetBusinessSummRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRptBusiness.GetBusinessSummRptList(request);

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
        [HttpPost("PanWiseTdsRateSave")]
        public async Task<IActionResult> PanWiseTdsRateSave()
        {
            try
            {
                // var driverPhoto = HttpContext.Request.Form.Files["driverPhoto"];
                var drivingLicense = HttpContext.Request.Form.Files["tdsCertUpload"];


                PanWiseTdsRateModel panWiseTdsRateModel = JsonConvert.DeserializeObject<PanWiseTdsRateModel>(HttpContext.Request.Form["datadetails"]);

                if (drivingLicense != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(drivingLicense.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(drivingLicense.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/panwise");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await drivingLicense.CopyToAsync(fileStream);
                        panWiseTdsRateModel.TdsCertUpload = imageName;
                    }
                }

                var result = await panWiseTdsRateBusiness.PanWiseTdsRateSave(panWiseTdsRateModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPanWiseTdsRateList")]
        public async Task<IActionResult> GetPanWiseTdsRateList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await panWiseTdsRateBusiness.GetPanWiseTdsRateList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("ChkPanDuplicate")]
        public async Task<IActionResult> ChkPanDuplicate(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await panWiseTdsRateBusiness.ChkPanDuplicate(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PanWiseTdsRateDelete")]
        public async Task<IActionResult> PanWiseTdsRateDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await panWiseTdsRateBusiness.PanWiseTdsRateDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetGstPctValuesList")]
        public async Task<IActionResult> GetGstPctValuesList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstPctValuesBusiness.GetGstPctValuesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetGstPctValuesDelete")]
        public async Task<IActionResult> GetGstPctValuesDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstPctValuesBusiness.GetGstPctValuesDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GstPctValuesSave")]
        public async Task<IActionResult> GstPctValuesSave(GstPctValuesModel gstPctValuesModel)
        {
            if (gstPctValuesModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstPctValuesBusiness.GstPctValuesSave(gstPctValuesModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetRatesMasterNewList")]
        public async Task<IActionResult> GetRatesMasterNewList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratesMasterNewBusiness.GetRatesMasterNewList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("RatesMasterNewSave")]
        public async Task<IActionResult> RatesMasterNewSave(RatesMasterNewModel ratesMasterNewModel)
        {
            if (ratesMasterNewModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratesMasterNewBusiness.RatesMasterNewSave(ratesMasterNewModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("RatesMasterNewDelete")]
        public async Task<IActionResult> RatesMasterNewDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratesMasterNewBusiness.RatesMasterNewDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetRatesMasterNewInnerGridList")]
        public async Task<IActionResult> GetRatesMasterNewInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratesMasterNewBusiness.GetRatesMasterNewInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChCostTypesSave")]
        public async Task<IActionResult> ChCostTypesSave(ChCostTypesModel chCostTypesModel)
        {
            if (chCostTypesModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await chCostTypesBusiness.ChCostTypesSave(chCostTypesModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetChCostTypesList")]
        public async Task<IActionResult> GetChCostTypesList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await chCostTypesBusiness.GetChCostTypesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChCostTypesDelete")]
        public async Task<IActionResult> ChCostTypesDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await chCostTypesBusiness.ChCostTypesDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateCostDesc")]
        public async Task<IActionResult> CheckDuplicateCostDesc(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await chCostTypesBusiness.CheckDuplicateCostDesc(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFreightGstMasterList")]
        public async Task<IActionResult> GetFreightGstMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightGstMasterBusiness.GetFreightGstMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FreightGstMasterSave")]
        public async Task<IActionResult> FreightGstMasterSave(FreightGstMasterModel freightGstMasterModel)
        {
            if (freightGstMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightGstMasterBusiness.FreightGstMasterSave(freightGstMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FreightGstMasterDelete")]
        public async Task<IActionResult> FreightGstMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightGstMasterBusiness.FreightGstMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLedgerList")]
        public async Task<IActionResult> GetLedgerList()
        {
            try
            {
                var result = await freightGstMasterBusiness.GetLedgerList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateFreightDesc")]
        public async Task<IActionResult> CheckDuplicateFreightDesc(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightGstMasterBusiness.CheckDuplicateFreightDesc(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetLRBillSeriesMasterList")]
        public async Task<IActionResult> GetLRBillSeriesMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lrBillSeriesBusiness.GetLRBillSeriesMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LRBillSeriesSave")]
        public async Task<IActionResult> LRBillSeriesSave(LRBillSeriesModel lRBillSeriesModel)
        {
            if (lRBillSeriesModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lrBillSeriesBusiness.LRBillSeriesSave(lRBillSeriesModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LRBillSeriesMasterDelete")]
        public async Task<IActionResult> LRBillSeriesMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lrBillSeriesBusiness.LRBillSeriesMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateSeriesCode")]
        public async Task<IActionResult> CheckDuplicateSeriesCode(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lrBillSeriesBusiness.CheckDuplicateSeriesCode(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillsMasterListLLP")]
        public async Task<IActionResult> GetBillsMasterListLLP(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillsMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillsMasterSearchListLLP")]
        public async Task<IActionResult> GetBillsMasterSearchListLLP(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillsMasterSearchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsMasterSaveLLP")]
        public async Task<IActionResult> BillsMasterSaveLLP(BillsMasterModelLLP billsMasterModel)
        {
            if (billsMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.BillsMasterSaveLLP(billsMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsMasterVehDtlUpdateLLP")]
        public async Task<IActionResult> BillsMasterVehDtlUpdateLLP(BillsMasterModelLLP billsMasterModel)
        {
            if (billsMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.BillsMasterVehDtlUpdateLLP(billsMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillsInnerGridListLLP")]
        public async Task<IActionResult> GetBillsInnerGridListLLP(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillsInnerGridList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillsVehDetailInnerGridList")]
        public async Task<IActionResult> GetBillsVehDetailInnerGridListGetBillsVehDetailInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillsVehDetailInnerGridList(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BillsMasterDeleteLLP")]
        public async Task<IActionResult> BillsMasterDeleteLLP(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.BillsMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      

        [HttpPost("GetBillPartyGstLocationListLLP")]
        public async Task<IActionResult> GetBillPartyGstLocationListLLP(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillPartyGstLocationList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckDuplicateBillsNoLLP")]
        public async Task<IActionResult> CheckDuplicateBillsNoLLP(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.CheckDuplicateBillsNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillTypeSacHsnLLP")]
        public async Task<IActionResult> GetBillTypeSacHsnLLP(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillTypeSacHsn(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBillNoLLP")]
        public async Task<IActionResult> GetBillNoLLP(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillNoLLP(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillPdfLlp")]
        public async Task<IActionResult> GetBillPdfLlp(RepReqModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusinessLLP.GetBillPdfLlp(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
       
        [HttpPost("GetAdminGroupMasterList")]
        public async Task<IActionResult> GetAdminGroupMasterList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await adminGroupMasterBusiness.GetAdminGroupMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("AdminGroupMasterDelete")]
        public async Task<IActionResult> AdminGroupMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await adminGroupMasterBusiness.AdminGroupMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateAdminGrpDesc")]
        public async Task<IActionResult> CheckDuplicateAdminGrpDesc(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await adminGroupMasterBusiness.CheckDuplicateAdminGrpDesc(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("AdminGroupMasterSave")]
        public async Task<IActionResult> AdminGroupMasterSave(AdminGroupMasterModel adminGroupMasterModel)
        {
            if (adminGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await adminGroupMasterBusiness.AdminGroupMasterSave(adminGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAdminSortSlNo")]
        public async Task<IActionResult> GetAdminSortSlNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await adminGroupMasterBusiness.GetAdminSortSlNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBranchCustomerTargetMstList")]
        public async Task<IActionResult> GetBranchCustomerTargetMstList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchCustomerTargetBusiness.GetBranchCustomerTargetMstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BranchCustomerTargetSave")]
        public async Task<IActionResult> BranchCustomerTargetSave(BranchCustomerTargetMstModel branchCustomerTargetMstModel)
        {
            if (branchCustomerTargetMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchCustomerTargetBusiness.BranchCustomerTargetSave(branchCustomerTargetMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BranchCustomerTargetDelete")]
        public async Task<IActionResult> BranchCustomerTargetDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchCustomerTargetBusiness.BranchCustomerTargetDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BranchCustomerTargetDtlInnerGridList")]
        public async Task<IActionResult> BranchCustomerTargetDtlInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchCustomerTargetBusiness.BranchCustomerTargetDtlInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPartyMisLocationList")]
        public async Task<IActionResult> GetPartyMisLocationList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyMisLocationBusiness.GetPartyMisLocationList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPartyMisLocationInnerGridList")]
        public async Task<IActionResult> GetPartyMisLocationInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyMisLocationBusiness.GetPartyMisLocationInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("PartyMisLocationDelete")]
        public async Task<IActionResult> PartyMisLocationDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyMisLocationBusiness.PartyMisLocationDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("PartyMisLocationSave")]
        public async Task<IActionResult> PartyMisLocationSave(PartyMisLocationModel partyMisLocationModel)
        {
            if (partyMisLocationModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyMisLocationBusiness.PartyMisLocationSave(partyMisLocationModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateLocation")]
        public async Task<IActionResult> CheckDuplicateLocation(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await partyMisLocationBusiness.CheckDuplicateLocation(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DocumentMasterSave")]
        public async Task<IActionResult> DocumentMasterSave(DocumentMasterModel documentMasterModel)
        {
            if (documentMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentMasterBusiness.DocumentMasterSave(documentMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDocumentMasterList")]
        public async Task<IActionResult> GetDocumentMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentMasterBusiness.GetDocumentMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DocumentMasterDelete")]
        public async Task<IActionResult> DocumentMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await documentMasterBusiness.DocumentMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }

}
