using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FinTrans.Models;
using FinTrans.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using FleetMasters.Models;
using Newtonsoft.Json;
using System.Data.Common;
using System.IO;
using System.Data;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;



namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FinTransController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly ICashReceiptPaymentsBusiness cashReceiptPaymentsBusiness;
        readonly IGstPurchaseMstBusiness gstPurchaseMstBusiness;
        readonly IBankReconcilationBusiness bankReconcilationBusiness;
        readonly IOpBrsEntryBusiness opBrsEntryBusiness;


        public FinTransController(ICashReceiptPaymentsBusiness _cashReceiptPaymentsBusiness,
            IGstPurchaseMstBusiness _gstPurchaseMstBusiness,
            IBankReconcilationBusiness _bankReconcilationBusiness,
            IOpBrsEntryBusiness _opBrsEntryBusiness)
        {
            cashReceiptPaymentsBusiness = _cashReceiptPaymentsBusiness;
            gstPurchaseMstBusiness= _gstPurchaseMstBusiness;
            bankReconcilationBusiness =_bankReconcilationBusiness;
            opBrsEntryBusiness = _opBrsEntryBusiness;
        }
        /// <summary>

        /// </summary>
        /// <param name="FinAccountsMasterModel"></param>
        [HttpPost("CashReceiptPaymentsSave")]
        public async Task<IActionResult> CashReceiptpaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            if (cashReceiptPaymentsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.CashReceiptPaymentsSave(cashReceiptPaymentsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetCashReceiptPaymentsList")]
        public async Task<IActionResult> GetCashReceiptPaymentsList(BankCashListFilterModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.GetCashReceiptPaymentsList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetOpBrsEntryList")]
        public async Task<IActionResult> GetOpBrsEntryList(PageRequest request)
        {
            try
            {
                var result = await opBrsEntryBusiness.GetOpBrsEntryList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("OpBrsEntrySave")]
        public async Task<IActionResult> OpBrsEntrySave(BrsEntryModel brsEntryModel)
        {
            if (brsEntryModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await opBrsEntryBusiness.OpBrsEntrySave(brsEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CashReceiptPaymentsDelete")]
        public async Task<IActionResult> CashReceiptPaymentsDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.CashReceiptPaymentsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetCashReceiptPaymentInnerGridList")]
        public async Task<IActionResult> GetCashReceiptPaymentInnerGridList(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.GetCashReceiptPaymentInnerGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetCashBankAccountList")]
        public async Task<IActionResult> GetCashBankAccountList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.GetCashBankAccountList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetNextDocNo")]
        public async Task<IActionResult> GetNextDocNo(DocNoFilterModel docNoFilter)
        {
            if (docNoFilter == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.GetNextDocNo(docNoFilter);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GstPurchageDelete")]
        public async Task<IActionResult> GstPurchageDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstPurchaseMstBusiness.GstPurchageDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetGstPurchaseList")]
        public async Task<IActionResult> GetGstPurchaseList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstPurchaseMstBusiness.GetGstPurchaseList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpPost("GetGstPurchaseInnerGridList")]
        public async Task<IActionResult> GetGstPurchaseInnerGridList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstPurchaseMstBusiness.GetGstPurchaseInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GstPurchaseMstSave")]
        public async Task<IActionResult> GstPurchaseMstSave()
        {
            try
            {
                var attatchFile1 = HttpContext.Request.Form.Files["attatchFile1"];
                var attatchFile2 = HttpContext.Request.Form.Files["attatchFile2"];

                GstPurchaseMstModel gstPurchaseMstModel = JsonConvert.DeserializeObject<GstPurchaseMstModel>(HttpContext.Request.Form["datadetails"]);

                if (attatchFile1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attatchFile1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attatchFile1.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/gstpurchase/attatchFile1/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attatchFile1.CopyToAsync(fileStream);
                        gstPurchaseMstModel.AttatchFile1 = imageName;
                    }
                }
                if (attatchFile2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attatchFile2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attatchFile2.FileName);
                    var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/gstpurchase/attatchFile2/" + imageName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await attatchFile2.CopyToAsync(fileStream);
                        gstPurchaseMstModel.AttatchFile2 = imageName;
                    }
                }

                var result = await gstPurchaseMstBusiness.GstPurchaseMstSave(gstPurchaseMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetGstVendorList")]
        public async Task<IActionResult> GetGstVendorList()
        {
            try
            {
                var result = await gstPurchaseMstBusiness.GetGstVendorList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("BankReconcilationSave")]
        public async Task<IActionResult> BankReconcilationSave(BankReconcilationListModel bankRecListModel)
        {
            if (bankRecListModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await bankReconcilationBusiness.BankReconcilationSave(bankRecListModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetBankReconcileGridList")]
        public async Task<IActionResult> GetBankReconcileGridList(BankRecFilterModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await bankReconcilationBusiness.GetBankReconcileGridList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBankAcList2")]
        public async Task<IActionResult> GetBankAcList()
        {
            try
            {
                var result = await opBrsEntryBusiness.GetBankAcList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("OpBrsEntryDelete")]
        public async Task<IActionResult> OpBrsEntryDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await opBrsEntryBusiness.OpBrsEntryDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetBankDebitAcList")]
        public async Task<IActionResult> GetBankDebitAcList()
        {
            try
            {
                var result = await opBrsEntryBusiness.GetBankDebitAcList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBankacList")]
        public async Task<IActionResult> GetBankacList()
        {
            try
            {
                var result = await bankReconcilationBusiness.GetBankacList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CashBookReport")]
        public async Task<IActionResult> CashBookReport(CashBookReportRequestModel request)
        {
            try
            {
                var result = await cashReceiptPaymentsBusiness.CashBookReport(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

