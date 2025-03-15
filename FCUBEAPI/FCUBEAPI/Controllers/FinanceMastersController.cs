using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FinanceMasters.Models;
using FinanceMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using FinanceMaster.Business;
using FinanceMaster.Models;
using FreightMasters.Models;
using FleetTrans.Models;
using Newtonsoft.Json;
using System.Data.Common;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using FleetTrans.Business;
using Org.BouncyCastle.Ocsp;
using System.Collections.Generic;
using Consignment.Business;

namespace FCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FinanceMastersController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IFinAccountsMasterBusiness finAccountsMasterBusiness;
        readonly IFinGroupMasterBusiness finGroupMasterBusiness;
        readonly IFinScheduleMasterBusiness finScheduleMasterBusiness;
        readonly IOpeningBalanceMasterBusiness openingBalanceMasterBusiness;
        readonly IChequeAllotmentDtlBusiness chequeAllotmentDtlBusiness;
        readonly IChequeAllotmentMstBusiness chequeAllotmentMstBusiness;
        readonly IBeneficiaryMasterBusiness beneficiaryMasterBusiness;
        readonly ICnorCneeGstBusiness cnorCneeGstBusiness;
        readonly IExpenseBudgetsBusiness expenseBudgetsBusiness;
        readonly ISubLedgerMasterBusiness subLedgerMasterBusiness;
        readonly IBenBankListBusiness benBankListBusiness;


        public FinanceMastersController(IOptions<DBModel> _dbconnection,IFinGroupMasterBusiness _finGroupMasterBusiness, 
            IFinAccountsMasterBusiness _finAccountsMasterBusiness, 
            IFinScheduleMasterBusiness _finScheduleMasterBusiness,
            IOpeningBalanceMasterBusiness _openingBalanceMasterBusiness,
            IChequeAllotmentDtlBusiness _chequeAllotmentDtlBusiness, 
            IChequeAllotmentMstBusiness _chequeAllotmentMstBusiness,
            IBeneficiaryMasterBusiness _beneficiaryMasterBusiness,
            ICnorCneeGstBusiness _cnorCneeGstBusiness,
            IExpenseBudgetsBusiness _expenseBudgetsBusiness,
            ISubLedgerMasterBusiness _subLedgerMasterBusiness,
            IBenBankListBusiness _benBankListBusiness)
        {
            dbconnection = _dbconnection;
            finAccountsMasterBusiness = _finAccountsMasterBusiness;
            finGroupMasterBusiness = _finGroupMasterBusiness;
            finScheduleMasterBusiness = _finScheduleMasterBusiness;
            chequeAllotmentDtlBusiness = _chequeAllotmentDtlBusiness;
            chequeAllotmentMstBusiness = _chequeAllotmentMstBusiness;
            openingBalanceMasterBusiness=_openingBalanceMasterBusiness;
            beneficiaryMasterBusiness= _beneficiaryMasterBusiness;
            cnorCneeGstBusiness= _cnorCneeGstBusiness;
            expenseBudgetsBusiness= _expenseBudgetsBusiness;
            subLedgerMasterBusiness = _subLedgerMasterBusiness;
            benBankListBusiness= _benBankListBusiness;

        }
        /// <summary>
        
        /// </summary>
        /// <param name="FinAccountsMasterModel"></param>
        [HttpPost("FinAccountsMasterSave")]
        public async Task<IActionResult> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel)
        {
            if (finAccountsMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finAccountsMasterBusiness.FinAccountsMasterSave(finAccountsMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFinAccountsMasterList")]
        public async Task<IActionResult> GetFinAccountsMasterList(PageRequest request)
        {
            try
            {
                var result = await finAccountsMasterBusiness.GetFinAccountsMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetFinActLedgertype")]
        public async Task<IActionResult> GetFinActLedgertype()
        {
            try
            {
                var result = await finAccountsMasterBusiness.GetFinActLedgertype();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFinGroupList")]
        public async Task<IActionResult> GetFinGroupList()
        {
            try
            {
                var result = await finAccountsMasterBusiness.GetFinGroupList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        


        [HttpPost("GetEmpList")]
        public async Task<IActionResult> GetEmpList()
        {
            try
            {
                var result = await finAccountsMasterBusiness.GetEmpList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FinAccountsGSTSave")]
        public async Task<IActionResult> FinAccountsGSTSave(FinAccountsMasterGstModel finAccountsMasterModel)
        {
            if (finAccountsMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finAccountsMasterBusiness.FinAccountsGSTSave(finAccountsMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("FinAccountGstDelete")]
        public async Task<IActionResult> FinAccountGstDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finAccountsMasterBusiness.FinAccountGstDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFinAccountGstList")]
        public async Task<IActionResult> GetFinAccountGstList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finAccountsMasterBusiness.GetFinAccountGstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        



        [HttpPost("FinScheduleMasterSave")]
        public async Task<IActionResult> FinScheduleMasterSave(FinScheduleMasterModel finScheduleMasterModel)
        {
            if (finScheduleMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finScheduleMasterBusiness.FinScheduleMasterSave(finScheduleMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("ChequeAllotmentDtlSave")]
        public async Task<IActionResult> ChequeAllotmentDtlSave(ChequeAllotmentDtlModel chequeAllotmentDtlModel)
        {
            if (chequeAllotmentDtlModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await chequeAllotmentDtlBusiness.ChequeAllotmentDtlSave(chequeAllotmentDtlModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChequeAllotmentMstSave")]
        public async Task<IActionResult> ChequeAllotmentMstSave(ChequeAllotmentMstModel chequeAllotmentMstModel)
        {
            if (chequeAllotmentMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await chequeAllotmentMstBusiness.ChequeAllotmentMstSave(chequeAllotmentMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FinGroupMasterSave")]
        public async Task<IActionResult> FinGroupMasterSave(FinGroupMasterModel finGroupMasterModel)
        {
            if (finGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finGroupMasterBusiness.FinGroupMasterSave(finGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFinGroupMasterList")]
        public async Task<IActionResult> GetFinGroupMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finGroupMasterBusiness.GetFinGroupMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FinGroupDetailsDelete")]
        public async Task<IActionResult> FinGroupDetailsDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finGroupMasterBusiness.FinGroupDetailsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAccountTypeList")]
        public async Task<IActionResult> GetAccountTypeList()
        {
            try
            {
                var result = await finGroupMasterBusiness.GetAccountTypeList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSubAccountTypeList")]
        public async Task<IActionResult> GetSubAccountTypeList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finGroupMasterBusiness.GetSubAccountTypeList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetScheduleList")]
        public async Task<IActionResult> GetScheduleList()
        {            
            try
            {
                var result = await finGroupMasterBusiness.GetScheduleList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("chkActName")]
        public async Task<IActionResult> chkActName(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await finGroupMasterBusiness.chkActName(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("OpeningBalanceSave")]
        public async Task<IActionResult> OpeningBalanceSave(OpeningBalanceMasterModel openingBalanceMaster)
        {
            if (openingBalanceMaster == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await openingBalanceMasterBusiness.OpeningBalanceSave(openingBalanceMaster);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOpeningBalMasterList")]
        public async Task<IActionResult> GetOpeningBalMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await openingBalanceMasterBusiness.GetOpeningBalMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetOpeningBalDetailList")]
        public async Task<IActionResult> GetOpeningBalDetailList(OpeningBalanceRequest req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await openingBalanceMasterBusiness.GetOpeningBalDetailList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetAccountList")]
        public async Task<IActionResult> GetAccountList()
        {
            try
            {
                var result = await openingBalanceMasterBusiness.GetAccountList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("OpeningBalanceDelete")]
        public async Task<IActionResult> OpeningBalanceDelete(OpeningBalanceRequest req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await openingBalanceMasterBusiness.OpeningBalanceDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ConsolidateOpeningBalUpdate")]
        public async Task<IActionResult> ConsolidateOpeningBalUpdate(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await openingBalanceMasterBusiness.ConsolidateOpeningBalUpdate(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetConsolidateOpeningBalList")]
        public async Task<IActionResult> GetConsolidateOpeningBalList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await openingBalanceMasterBusiness.GetConsolidateOpeningBalList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetConsolidateOpeningBalExcel")]
        public async Task<IActionResult> GetConsolidateOpeningBalExcel(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await openingBalanceMasterBusiness.GetConsolidateOpeningBalExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BeneficiaryMasterSave")]
        public async Task<IActionResult> BeneficiaryMasterSave()
        {
            try
            {
                var cancelCheqAttach = HttpContext.Request.Form.Files["cancelCheqAttach"];
                var vendorAttachedfile = HttpContext.Request.Form.Files["vendorAttachedfile"];

                BeneficiaryMasterModel beneficiaryMasterModel = JsonConvert.DeserializeObject<BeneficiaryMasterModel>(HttpContext.Request.Form["datadetails"]);

                if (cancelCheqAttach != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(cancelCheqAttach.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(cancelCheqAttach.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/beneificiary");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await cancelCheqAttach.CopyToAsync(fileStream);
                        beneficiaryMasterModel.CancelCheqAttach = imageName;
                    }
                }
                if (vendorAttachedfile != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(vendorAttachedfile.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(vendorAttachedfile.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/beneificiary");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await vendorAttachedfile.CopyToAsync(fileStream);
                        beneficiaryMasterModel.VendorAttachedfile = imageName;
                    }
                }
                var result = await beneficiaryMasterBusiness.BeneficiaryMasterSave(beneficiaryMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBeneficiaryMasterList")]
        public async Task<IActionResult> GetBeneficiaryMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await beneficiaryMasterBusiness.GetBeneficiaryMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBenCode")]
        public async Task<IActionResult> GetBenCode(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await beneficiaryMasterBusiness.GetBenCode(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBankAccountVerify")]
        public async Task<IActionResult> GetBankAccountVerify(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await beneficiaryMasterBusiness.GetBankAccountVerify(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       

        [HttpPost("GetBenBankList")]
        public async Task<IActionResult> GetBenBankList()
        {
            try
            {
                var result = await beneficiaryMasterBusiness.GetBenBankList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetUserBenApproveBlock")]
        public async Task<IActionResult> GetUserBenApproveBlock(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await beneficiaryMasterBusiness.GetUserBenApproveBlock(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

        [HttpPost("BeneficiaryMasterDelete")]
        public async Task<IActionResult> BeneficiaryMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await beneficiaryMasterBusiness.BeneficiaryMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCnorCneeGstList")]
        public async Task<IActionResult> GetCnorCneeGstList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cnorCneeGstBusiness.GetCnorCneeGstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCneeCnorList")]
        public async Task<IActionResult> GetCneeCnorList()
        {
            try
            {
                var result = await cnorCneeGstBusiness.GetCneeCnorList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CnorCneeGstSave")]
        public async Task<IActionResult> CnorCneeGstSave(CnorCneeGstModel cnorCneeGstModel)
        {
            if (cnorCneeGstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cnorCneeGstBusiness.CnorCneeGstSave(cnorCneeGstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CnorCneeGstDelete")]
        public async Task<IActionResult> GetCnorCneeGstDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cnorCneeGstBusiness.GetCnorCneeGstDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCnorCneeDtlList")]
        public async Task<IActionResult> GetCnorCneeDtlList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cnorCneeGstBusiness.GetCnorCneeDtlList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ExpenseBudgetsSave")]
        public async Task<IActionResult> ExpenseBudgetsSave(ExpenseBudgetsList expenseBudgetsModel)
        {
            if (expenseBudgetsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await expenseBudgetsBusiness.ExpenseBudgetsSave(expenseBudgetsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetExpenseBudgetsInnerGridList")]
        public async Task<IActionResult> GetExpenseBudgetsInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await expenseBudgetsBusiness.GetExpenseBudgetsInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost("SubLedgerMasterSave")]
        public async Task<IActionResult> SubLedgerMasterSave(SubLedgerMasterModel subLedgerMasterModel)
        {
            if (subLedgerMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await subLedgerMasterBusiness.SubLedgerMasterSave(subLedgerMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSubLedgerMasterList")]
        public async Task<IActionResult> GetSubLedgerMasterList(PageFromDtToDtRequest request)
        {
            try
            {
                var result = await subLedgerMasterBusiness.GetSubLedgerMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SubLedgerMasterDelete")]
        public async Task<IActionResult> SubLedgerMasterDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await subLedgerMasterBusiness.SubLedgerMasterDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSubledgerAcList")]
        public async Task<IActionResult> GetSubledgerAcList()
        {
            try
            {
                var result = await subLedgerMasterBusiness.GetSubledgerAcList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetValidateList")]
        public async Task<IActionResult> GetValidateList()
        {
            try
            {
                var result = await subLedgerMasterBusiness.GetValidateList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetTableField")]
        public async Task<IActionResult> GetTableField(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await subLedgerMasterBusiness.GetTableField(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSubLedgerMasterInnerGridList")]
        public async Task<IActionResult> GetSubLedgerMasterInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await subLedgerMasterBusiness.GetSubLedgerMasterInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost("GetBenBanksList")]
        public async Task<IActionResult> GetBenBankList(ReportRequestModel request)
        {
            try
            {
                var result = await benBankListBusiness.GetBenBankList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BenBankListSave")]
        public async Task<IActionResult> BenBankListSave(BenBankListModel benbankListModel)
        {
            if (benbankListModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await benBankListBusiness.BenBankListSave(benbankListModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("BenBankListDelete")]
        public async Task<IActionResult> BenBankListDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await benBankListBusiness.BenBankListDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckDuplicateBank")]
        public async Task<IActionResult> CheckDuplicateBank(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await benBankListBusiness.CheckDuplicateBank(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }





    }
}

