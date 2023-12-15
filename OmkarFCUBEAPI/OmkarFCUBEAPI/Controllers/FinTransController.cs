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
        readonly IJournalEntryBusiness journalEntryBusiness;


        public FinTransController(ICashReceiptPaymentsBusiness _cashReceiptPaymentsBusiness, IJournalEntryBusiness _journalEntryBusiness)
        {
            cashReceiptPaymentsBusiness = _cashReceiptPaymentsBusiness;
            journalEntryBusiness = _journalEntryBusiness;



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


        [HttpPost("JournalEntrySave")]
        public async Task<IActionResult> JournalEntrySave(JournalEntryModel journalEntryModel)
        {
            if (journalEntryModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await journalEntryBusiness.JournalEntrySave(journalEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetJournalEntryList")]
        public async Task<IActionResult> GetJournalEntryList(PageRequest request)
        {
            try
            {
                var result = await journalEntryBusiness.GetJournalEntryList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}

