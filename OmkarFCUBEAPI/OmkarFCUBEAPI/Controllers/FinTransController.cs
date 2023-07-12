using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

using FinTrans.Business;
using Microsoft.AspNetCore.Authorization;

using FinTrans.Models;
using FinanceMasters.Business;


namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FinTransController : ControllerBase
    {
        readonly ICashReceiptPaymentsBusiness cashReceiptPaymentsBusiness;
        readonly IBankReceiptPaymentsBusiness bankReceiptPaymentsBusiness;
        readonly IBankCashContraBusiness bankCashContraBusiness;
        readonly IJournalEntryBusiness journalEntryBusiness;


        public FinTransController(ICashReceiptPaymentsBusiness _cashReceiptPaymentsBusiness, IBankReceiptPaymentsBusiness _bankReceiptPaymentsBusiness, IBankCashContraBusiness _bankCashContraBusiness, IJournalEntryBusiness _journalEntryBusiness)
        {
            cashReceiptPaymentsBusiness = _cashReceiptPaymentsBusiness;
            bankReceiptPaymentsBusiness = _bankReceiptPaymentsBusiness;
            bankCashContraBusiness = _bankCashContraBusiness;
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
        public async Task<IActionResult> GetCashReceiptPaymentsList(CashReceiptPaymentsListRequest request)
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


        [HttpPost("BankReceiptPaymentsSave")]
        public async Task<IActionResult> BankReceiptpaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            if (cashReceiptPaymentsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await bankReceiptPaymentsBusiness.BankReceiptPaymentsSave(cashReceiptPaymentsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBankReceiptpaymentsList")]
        public async Task<IActionResult> GetBankReceiptpaymentsList(BankReceiptpaymentsListRequest request)
        {
            try
            {
                var result = await bankReceiptPaymentsBusiness.GetBankReceiptpaymentsList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("BankCashContraSave")]
        public async Task<IActionResult> BankCashContraSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            if (cashReceiptPaymentsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await bankCashContraBusiness.BankCashContraSave(cashReceiptPaymentsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBankCashContraList")]
        public async Task<IActionResult> GetBankCashContraList(BankCashContraListRequest request)
        {
            try
            {
                var result = await bankCashContraBusiness.GetBankCashContraList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("JournalEntrySave")]
        public async Task<IActionResult> JournalEntrySave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            if (cashReceiptPaymentsModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await journalEntryBusiness.JournalEntrySave(cashReceiptPaymentsModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}

