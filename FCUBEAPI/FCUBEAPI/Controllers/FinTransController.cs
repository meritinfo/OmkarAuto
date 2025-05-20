using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FinTrans.Models;
using FinTrans.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.Common;



namespace FCUBEAPI.Controllers
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
        readonly ICustWizardBusiness custWizardBusiness;
        readonly ILedgerRptBusiness ledgerRptBusiness;
        readonly IGstSalesRegisterRptBusiness gstSalesRegisterRptBusiness;
        readonly IBankBookRptBusiness bankBookRptBusiness;
        readonly IBalanceBusiness balanceBusiness;
        readonly IMonthlyStatementsBusiness monthlyStatementsBusiness;


        public FinTransController(IOptions<DBModel> _dbconnection,
            ICashReceiptPaymentsBusiness _cashReceiptPaymentsBusiness,
            IGstPurchaseMstBusiness _gstPurchaseMstBusiness,
            IBankReconcilationBusiness _bankReconcilationBusiness,
            IOpBrsEntryBusiness _opBrsEntryBusiness, 
            ICustWizardBusiness _custWizardBusiness,
            ILedgerRptBusiness _ledgerRptBusiness,
            IBankBookRptBusiness _bankBookRptBusiness,
            IGstSalesRegisterRptBusiness _gstSalesRegisterRptBusiness,
            IBalanceBusiness _balanceBusiness,
            IMonthlyStatementsBusiness  _monthlyStatementsBusiness)
        {
            dbconnection = _dbconnection;
            cashReceiptPaymentsBusiness = _cashReceiptPaymentsBusiness;
            gstPurchaseMstBusiness= _gstPurchaseMstBusiness;
            bankReconcilationBusiness =_bankReconcilationBusiness;
            opBrsEntryBusiness = _opBrsEntryBusiness;
            custWizardBusiness = _custWizardBusiness;
            ledgerRptBusiness = _ledgerRptBusiness;
            gstSalesRegisterRptBusiness = _gstSalesRegisterRptBusiness;
            bankBookRptBusiness = _bankBookRptBusiness;
            balanceBusiness = _balanceBusiness;
            monthlyStatementsBusiness = _monthlyStatementsBusiness;
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

        [HttpPost("GetFinRefTypes")]
        public async Task<IActionResult> GetFinRefTypes()
        {            
            try
            {
                var result = await cashReceiptPaymentsBusiness.GetFinRefTypes();

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
        [HttpPost("GetCustWizardList")]
        public async Task<IActionResult> GetCustWizardList(PageRequest request)
        {
            try
            {
                var result = await custWizardBusiness.GetCustWizardList(request);

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
        [HttpPost("CustWizardSave")]
        public async Task<IActionResult> CustWizardSave(CustWizardModel custWizardModel)
        {
            if (custWizardModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await custWizardBusiness.CustWizardSave(custWizardModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCustWizardDetail")]
        public async Task<IActionResult> GetCustWizardDetail()
        {

            try
            {
                var result = await custWizardBusiness.GetCustWizardDetail();

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
        public async Task<IActionResult> GetGstPurchaseList(ReportRequestModel request)
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
                gstPurchaseMstModel.AttatchFile1="";
                gstPurchaseMstModel.AttatchFile2="";

                if (attatchFile1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(attatchFile1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(attatchFile1.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/gstpurchase/attatchFile1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/gstpurchase/attatchFile2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
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
        [HttpPost("GetGstTdsAcList")]
        public async Task<IActionResult> GetGstTdsAcList()
        {
            try
            {
                var result = await gstPurchaseMstBusiness.GetGstTdsAcList();

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
        public async Task<IActionResult> CashBookReport(ReportRequestModel request)
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


        [HttpPost("GetLedgerList")]
        public async Task<IActionResult> GetLedgerList()
        {
            try
            {
                var result = await ledgerRptBusiness.GetLedgerList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetGstSalesRegisterRptList")]
        public async Task<IActionResult> GetGstSalesRegisterRptList(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstSalesRegisterRptBusiness.GetGstSalesRegisterRptList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetGstSalesRegisterExcel")]
        public async Task<IActionResult> GetGstSalesRegisterRptExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await gstSalesRegisterRptBusiness.GetGstSalesRegisterRptExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetLedgerRptList")]
        public async Task<IActionResult> GetLedgerRptList(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ledgerRptBusiness.GetLedgerRptList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLedgerRptExcel")]
        public async Task<IActionResult> GetLedgerRptExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ledgerRptBusiness.GetLedgerRptExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLedgerRptPdf")]
        public async Task<IActionResult> GetLedgerRptPdf(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ledgerRptBusiness.GetLedgerRptPdf(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBankBookRptList")]
        public async Task<IActionResult> GetBankBookRptList(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await bankBookRptBusiness.GetBankBookRptList(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBankBookRptExcel")]
        public async Task<IActionResult> GetBankBookRptExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await bankBookRptBusiness.GetBankBookRptExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

        [HttpPost("GetBankBookRptPdf")]
        public async Task<IActionResult> GetBankBookRptPdf(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await bankBookRptBusiness.GetBankBookRptPdf(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetFinDocDetails")]
        public async Task<IActionResult> GetFinDocDetails(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.GetFinDocDetails(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckSubLedgerExists")]
        public async Task<IActionResult> CheckSubLedgerExists(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await cashReceiptPaymentsBusiness.CheckSubLedgerExists(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

        [HttpPost("GetOpeningBalanceExcel")]
        public async Task<IActionResult> GetOpeningBalanceExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await balanceBusiness.GetOpeningBalanceExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAsOnDateExcel")]
        public async Task<IActionResult> GetAsOnDateExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await balanceBusiness.GetAsOnDateExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAsOnDateDetailsExcel")]
        public async Task<IActionResult> GetAsOnDateDetailsExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await balanceBusiness.GetAsOnDateDetailsExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAsOnDateDetailsGroupExcel")]
        public async Task<IActionResult> GetAsOnDateDetailsGroupExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await balanceBusiness.GetAsOnDateDetailsGroupExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetGivenPeriodExcel")]
        public async Task<IActionResult> GetGivenPeriodExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await balanceBusiness.GetGivenPeriodExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMonthlyBookingRptExcel")]
        public async Task<IActionResult> GetMonthlyBookingRptExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await monthlyStatementsBusiness.GetMonthlyBookingRptExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMonthlyLorryHireRptExcel")]
        public async Task<IActionResult> GetMonthlyLorryHireRptExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await monthlyStatementsBusiness.GetMonthlyLorryHireRptExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMonthlyAdminExpRptExcel")]
        public async Task<IActionResult> GetMonthlyAdminExpRptExcel(ReportRequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await monthlyStatementsBusiness.GetMonthlyAdminExpRptExcel(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

