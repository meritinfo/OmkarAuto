using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FinTrans.Models;
using FinTrans.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;



namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FinTransController : ControllerBase
    {
        readonly ICashReceiptPaymentsBusiness cashReceiptPaymentsBusiness;
        readonly IGstPurchaseMstBusiness gstPurchaseMstBusiness;


        public FinTransController(ICashReceiptPaymentsBusiness _cashReceiptPaymentsBusiness,
            IGstPurchaseMstBusiness _gstPurchaseMstBusiness)
        {
            cashReceiptPaymentsBusiness = _cashReceiptPaymentsBusiness;
            gstPurchaseMstBusiness= _gstPurchaseMstBusiness;
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

        [HttpPost("CashReceiptPaymentsDelete")]
        public async Task<IActionResult> CashReceiptPaymentsDelete(Request req)
        {
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
        public async Task<IActionResult> GetCashReceiptPaymentInnerGridList(Request req)
        {
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


        [HttpPost("GetNextDocNo")]
        public async Task<IActionResult> GetNextDocNo(DocNoFilterModel docNoFilter)
        {
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
        public async Task<IActionResult> GstPurchageDelete(Request request)
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
        public async Task<IActionResult> GetGstPurchaseInnerGridList(Request request)
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
        public async Task<IActionResult> GstPurchaseMstSave(GstPurchaseMstModel gstPurchaseMstModel)
        {
            if (gstPurchaseMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
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

    }
}

