using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FreightMasters.Models;
using FreightMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using System.Collections.Generic;
using FinanceMaster.Business;
using FleetTrans.Business;
using FleetMasters.Business;
using AdminMasters.Business;
using AdminMasters.Models;
using Newtonsoft.Json;
using System.Data.Common;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Consignment.Business;
using FleetMasters.Models;

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
        readonly IBillsTypeBusiness billsTypeBusiness;
        readonly ILR_Bill_SeriesBusiness lr_Bill_SeriesBusiness;
        readonly IRatetypesBusiness ratetypesBusiness;
        readonly IFreightRatesMstBusiness freightRatesMstBusiness;
        readonly IDistanceMasterFrtBusiness distanceMasterFrtBusiness;
        readonly IDistanceMasterTripBusiness distanceMasterTripBusiness;
        readonly IDistanceMasterFrtRptBusiness distanceMasterFrtRptBusiness;
        readonly IDistanceMasterTripRptBusiness distanceMasterTripRptBusiness;
        readonly IDriverLicRptBusiness driverLicRptBusiness;
        readonly IConsigneeMasterBusiness consigneeMasterBusiness;
        readonly ICompanyInfoBusiness companyInfoBusiness;
        readonly ILhpmSlabMasterBusiness lhpmSlabMasterBusiness;
        readonly IBookingRegisterRptBusiness bookingRegisterRptBusiness;
        readonly ILRWithOutChallanRptBusiness lRWithOutChallanRptBusiness;
        readonly IUnBilledRptBusiness unBilledRptBusiness;
        readonly IChallanRegisterRptBusiness challanRegisterRptBusiness;
        readonly ILhPayableStatusRptBusiness lhPayableStatusRptBusiness;
        readonly IBillRegisterRptBusiness billRegisterRptBusiness;
        readonly IMRRegisterRptBusiness mRRegisterRptBusiness;
        readonly ILHPMVarianceRptBusiness lHPMVarianceRptBusiness;
        readonly IGSTRegisterRptBusiness gSTRegisterRptBusiness;
        readonly ILHExtraPmtReconRptBusiness lHExtraPmtReconRptBusiness;
        readonly IBillSubmitMstBusiness billSubmitMstBusiness;
        readonly IAdditionalCostRecMasterBusiness additionalCostRecMasterBusiness;
        readonly IBillOutstandingRptBusiness billOutstandingRptBusiness;
        readonly ILRCostingRptBusiness lRCostingRptBusiness;
        readonly IOnAccountMRStatusRptBusiness onAccountMRStatusRptBusiness;
        readonly IAddCostRecBusiness addCostRecorveryBusiness;
        readonly IBusinessSummRptBusiness businessSummRptBusiness;
        readonly IPanWiseTdsRateBusiness panWiseTdsRateBusiness;
        public FreightMastersController(IOptions<DBModel> _dbconnection,
            IDestinationMasterBusiness _freightMastersBusiness,
            IBranchMasterBusiness _branchMastersBusiness,
            IProductGroupMasterBusiness _productGroupMasterBusiness,
            IDocumentAllotmentBusiness _documentAllotmentBusiness,
            IProductMasterBusiness _productMasterBusiness,
            IBillsTypeBusiness _billsTypeBusiness,
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
            IDriverLicRptBusiness _driverLicRptBusiness,
            ICompanyInfoBusiness _companyInfoBusiness,
            ILhpmSlabMasterBusiness _lhpmSlabMasterBusiness,
            IBookingRegisterRptBusiness _bookingRegisterRptBusiness,
            ILRWithOutChallanRptBusiness _lRWithOutChallanRptBusiness,
            IUnBilledRptBusiness _unBilledRptBusiness,
            IChallanRegisterRptBusiness _challanRegisterRptBusiness,
            ILhPayableStatusRptBusiness _lhPayableStatusRptBusiness,
            IBillRegisterRptBusiness _billRegisterRptBusiness,
            IMRRegisterRptBusiness _mRRegisterRptBusiness,
            ILHPMVarianceRptBusiness _lHPMVarianceRptBusiness,
            IGSTRegisterRptBusiness _gSTRegisterRptBusiness,
            IPartyGroupMasterBusiness _partyGroupMasterBusiness,
            ILHExtraPmtReconRptBusiness _lHExtraPmtReconRptBusiness,
            IBillSubmitMstBusiness _billSubmitMstBusiness,
            IAdditionalCostRecMasterBusiness _additionalCostRecMasterBusiness,
            IBillOutstandingRptBusiness _billOutstandingRptBusiness,
            ILRCostingRptBusiness _lRCostingRptBusiness,
            IOnAccountMRStatusRptBusiness _onAccountMRStatusRptBusiness,
            IAddCostRecBusiness _addCostRecorveryBusiness,
            IBusinessSummRptBusiness _businessSummRptBusiness,
           IPanWiseTdsRateBusiness _panWiseTdsRateBusiness)
        {
            dbconnection = _dbconnection;
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
            billsTypeBusiness = _billsTypeBusiness;
            companyInfoBusiness = _companyInfoBusiness;
            lhpmSlabMasterBusiness = _lhpmSlabMasterBusiness;
            bookingRegisterRptBusiness = _bookingRegisterRptBusiness;
            lRWithOutChallanRptBusiness = _lRWithOutChallanRptBusiness;
            unBilledRptBusiness = _unBilledRptBusiness;
            challanRegisterRptBusiness = _challanRegisterRptBusiness;
            lhPayableStatusRptBusiness = _lhPayableStatusRptBusiness;
            billRegisterRptBusiness = _billRegisterRptBusiness;
            mRRegisterRptBusiness = _mRRegisterRptBusiness;
            lHPMVarianceRptBusiness = _lHPMVarianceRptBusiness;
            gSTRegisterRptBusiness = _gSTRegisterRptBusiness;
            partyGroupMasterBusiness = _partyGroupMasterBusiness;
            lHExtraPmtReconRptBusiness = _lHExtraPmtReconRptBusiness;
            billSubmitMstBusiness = _billSubmitMstBusiness;
            additionalCostRecMasterBusiness = _additionalCostRecMasterBusiness;
            billOutstandingRptBusiness = _billOutstandingRptBusiness;
            lRCostingRptBusiness = _lRCostingRptBusiness;
            onAccountMRStatusRptBusiness = _onAccountMRStatusRptBusiness;
            addCostRecorveryBusiness = _addCostRecorveryBusiness;
            businessSummRptBusiness = _businessSummRptBusiness;
            panWiseTdsRateBusiness = _panWiseTdsRateBusiness;
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

        //[HttpPost("ProductMasterSave")]
        //public async Task<IActionResult> ProductMasterSave(ProductMasterModel productMasterModel)
        //{
        //    if (productMasterModel == null)
        //    {
        //        return BadRequest("Invalid request data");
        //    }
        //    try
        //    {
        //        var result = await productMasterBusiness.ProductMasterSave(productMasterModel);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
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
        public async Task<IActionResult> GetBillsMasterList(PageFromDtToDtRequest request)
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

        [HttpPost("GetBillTypeSacHsn")]
        public async Task<IActionResult> GetBillTypeSacHsn(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billsMasterBusiness.GetBillTypeSacHsn(request);

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
        [HttpPost("LRBillSeriesList")]
        public async Task<IActionResult> LrBillSeriesList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
                var result = await bookingRegisterRptBusiness.GetBookingRegisterRptExcel(request);

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
                var result = await bookingRegisterRptBusiness.GetBookingRegisterRptList(request);

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
                var result = await lRWithOutChallanRptBusiness.GetLRWithOutChallanRptExcel(request);

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
                var result = await lRWithOutChallanRptBusiness.GetLRWithOutChallanRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetUnBilledRptExcel")]
        public async Task<IActionResult> GetUnBilledRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await unBilledRptBusiness.GetUnBilledRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetUnBilledRptList")]
        public async Task<IActionResult> GetUnBilledRptList(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await unBilledRptBusiness.GetUnBilledRptList(request);

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
                var result = await challanRegisterRptBusiness.GetChallanRegisterRptList(request);

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
                var result = await challanRegisterRptBusiness.GetChallanRegisterRptExcel(request);

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
                var result = await lhPayableStatusRptBusiness.GetLhPayableStatusRptList(request);

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
                var result = await lhPayableStatusRptBusiness.GetLhPayableStatusRptExcel(request);

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
                var result = await billRegisterRptBusiness.GetBillRegisterRptExcel(request);

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
                var result = await billRegisterRptBusiness.GetBillRegisterRptList(request);

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
                var result = await mRRegisterRptBusiness.GetMRRegisterRptExcel(request);

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
                var result = await mRRegisterRptBusiness.GetMRRegisterRptList(request);

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
                var result = await lHPMVarianceRptBusiness.GetLHPMVarianceRptExcel(request);

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
                var result = await lHPMVarianceRptBusiness.GetLHPMVarianceRptList(request);

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
                var result = await gSTRegisterRptBusiness.GetGSTRegisterRptExcel(request);

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
                var result = await gSTRegisterRptBusiness.GetGSTRegisterRptList(request);

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
                var result = await lHExtraPmtReconRptBusiness.GetLHExtraPmtReconRptExcel(request);

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
                var result = await lHExtraPmtReconRptBusiness.GetLHExtraPmtReconRptList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBillSubmitMasterList")]
        public async Task<IActionResult> GetBillSubmitMasterList(PageFromDtToDtRequest request)
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
        public async Task<IActionResult> GetAgeingSummRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billOutstandingRptBusiness.GetAgeingSummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAgeingSummBranchRptExcel")]
        public async Task<IActionResult> GetAgeingSummBranchRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billOutstandingRptBusiness.GetAgeingSummBranchRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAgeingSummPartyRptExcel")]
        public async Task<IActionResult> GetAgeingSummPartyRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billOutstandingRptBusiness.GetAgeingSummPartyRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAgeingDetailRptExcel")]
        public async Task<IActionResult> GetAgeingDetailRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billOutstandingRptBusiness.GetAgeingDetailRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOutstandingSummRptExcel")]
        public async Task<IActionResult> GetOutstandingSummRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billOutstandingRptBusiness.GetOutstandingSummRptExcel(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOutstandingDetailRptExcel")]
        public async Task<IActionResult> GetOutstandingDetailRptExcel(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await billOutstandingRptBusiness.GetOutstandingDetailRptExcel(request);

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
                var result = await billOutstandingRptBusiness.GetOutstandingAnalysisRptExcel(request);

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
                var result = await billOutstandingRptBusiness.GetOutstandingAnalysisRptList(request);

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
                var result = await lRCostingRptBusiness.GetLRCostingRptExcel(request);

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
                var result = await lRCostingRptBusiness.GetLRCostingRptList(request);

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
                var result = await onAccountMRStatusRptBusiness.GetOnAccountMRStatusRptExcel(request);

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
                var result = await onAccountMRStatusRptBusiness.GetOnAccountMRStatusRptList(request);

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
                var result = await businessSummRptBusiness.GetBusinessSummRptExcel(request);

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
                var result = await businessSummRptBusiness.GetBusinessSummRptList(request);

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
    }
}
