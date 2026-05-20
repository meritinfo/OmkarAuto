using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using HRMasters.Models;
using HRMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;


namespace OmkarAutoApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class HRMasterController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IHrMasterBusiness hrMasterBusiness;
        readonly IPtSlabMasterBusiness ptSlabMasterBusiness;
        readonly IEmpMasterBusiness empMasterBusiness;
        readonly IEmpSalaryBusiness empSalaryBusiness;
        readonly ILoanBusiness loanBusiness;
        readonly IEmpSalaryCalcBusiness empSalaryCalcBusiness;
        readonly IPayGenerationBusiness payGenerationBusiness;


        public HRMasterController(IOptions<DBModel> _dbconnection, 
            IHrMasterBusiness _hrMasterBusiness, 
            IEmpMasterBusiness _empMasterBusiness,
            IEmpSalaryBusiness _empSalaryBusiness,
            IPtSlabMasterBusiness _ptSlabMasterBusiness,
            ILoanBusiness _loanBusiness,
            IEmpSalaryCalcBusiness _empSalaryCalcBusiness,
            IPayGenerationBusiness _payGenerationBusiness)
        {
            dbconnection = _dbconnection;
            hrMasterBusiness = _hrMasterBusiness;
            ptSlabMasterBusiness = _ptSlabMasterBusiness;
            empMasterBusiness = _empMasterBusiness;
            empSalaryBusiness = _empSalaryBusiness;
            loanBusiness = _loanBusiness;
            empSalaryCalcBusiness = _empSalaryCalcBusiness;
            payGenerationBusiness = _payGenerationBusiness;
        }
       

        [HttpPost("HrMasterSave")]
        public async Task<IActionResult> HrMasterSave(HrMasterModel hrMasterModel)
        {
            if (hrMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await hrMasterBusiness.HrMasterSave(hrMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetHrMasterList")]
        public async Task<IActionResult> GetHrMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await hrMasterBusiness.GetHrMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("CheckHrcode")]
        public async Task<IActionResult> CheckHrcode(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await hrMasterBusiness.CheckHrcode(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("HrMasterDelete")]
        public async Task<IActionResult> HrMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await hrMasterBusiness.HrMasterDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpMasterSave")]
        public async Task<IActionResult> EmpMasterSave()
        {
            try
            {
                var empAttach1 = HttpContext.Request.Form.Files["empAttach1"];
                var empAttach2 = HttpContext.Request.Form.Files["empAttach2"];

                EmpMasterModel empMaster = JsonConvert.DeserializeObject<EmpMasterModel>(HttpContext.Request.Form["datadetails"]);

                if (empAttach1 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(empAttach1.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(empAttach1.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/empmaster/empattach1");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await empAttach1.CopyToAsync(fileStream);
                        empMaster.EmpAttach1 = imageName;
                    }
                }
                if (empAttach2 != null)
                {
                    string imageName = new String(Path.GetFileNameWithoutExtension(empAttach2.FileName)).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(empAttach2.FileName);
                    var pathToSave = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/empmaster/empattach2");
                    var filePath = System.IO.Path.Combine(pathToSave, imageName);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await empAttach2.CopyToAsync(fileStream);
                        empMaster.EmpAttach2 = imageName;
                    }
                }
                var result = await empMasterBusiness.EmpMasterSave(empMaster);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpMasterList")]
        public async Task<IActionResult> GetEmpMasterList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empMasterBusiness.GetEmpMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("EmpMasterDelete")]
        public async Task<IActionResult> EmpMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empMasterBusiness.EmpMasterDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetBankList")]
        public async Task<IActionResult> GetBankList()
        { 
            try
            {
                var result = await empMasterBusiness.GetBankList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetPrefixList")]
        public async Task<IActionResult> GetPrefixList()
        {
            try
            {
                var result = await empMasterBusiness.GetPrefixList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDepartmentList")]
        public async Task<IActionResult> GetDepartmentList()
        {
            try
            {
                var result = await empMasterBusiness.GetDepartmentList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDesignationList")]
        public async Task<IActionResult> GetDesignationList()
        {
            try
            {
                var result = await empMasterBusiness.GetDesignationList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMotherTongueList")]
        public async Task<IActionResult> GetMotherTongueList()
        {
            try
            {
                var result = await empMasterBusiness.GetMotherTongueList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmployeeList")]
        public async Task<IActionResult> GetEmployeeList()
        {
            try
            {
                var result = await empMasterBusiness.GetEmployeeList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetMaxEmpNo")]
        public async Task<IActionResult> GetMaxEmpNo(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empMasterBusiness.GetMaxEmpNo(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpSalaryMstList")]
        public async Task<IActionResult> GetEmpSalaryMstList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryBusiness.GetEmpSalaryMstList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpSalaryEarnList")]
        public async Task<IActionResult> GetEmpSalaryEarnList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryBusiness.GetEmpSalaryEarnList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpSalaryDedList")]
        public async Task<IActionResult> GetEmpSalaryDedList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryBusiness.GetEmpSalaryDedList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSalaryEarningList")]
        public async Task<IActionResult> GetSalaryEarningList()
        {
            try
            {
                var result = await empSalaryBusiness.GetSalaryEarningList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetSalaryDeductionList")]
        public async Task<IActionResult> GetSalaryDeductionList()
        {
            try
            {
                var result = await empSalaryBusiness.GetSalaryDeductionList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpSalaryMasterSave")]
        public async Task<IActionResult> EmpSalaryMasterSave(EmpSalaryMstModel empSalaryMst)
        {
            if (empSalaryMst == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryBusiness.EmpSalaryMasterSave(empSalaryMst);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpSalaryMasterDelete")]
        public async Task<IActionResult> EmpSalaryMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryBusiness.EmpSalaryMasterDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetEmpLoanList")]
        public async Task<IActionResult> GetEmpLoanList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.GetEmpLoanList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpLoanSave")]
        public async Task<IActionResult> EmpLoanSave(LoanModel loanModel)
        {
            if (loanModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.EmpLoanSave(loanModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpLoanDelete")]
        public async Task<IActionResult> EmpLoanDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.EmpLoanDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpLoanRepayList")]
        public async Task<IActionResult> GetEmpLoanRepayList(PageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.GetEmpLoanRepayList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpLoanRepaySave")]
        public async Task<IActionResult> EmpLoanRepaySave(LoanModel loanModel)
        {
            if (loanModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.EmpLoanRepaySave(loanModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpLoanRepayDelete")]
        public async Task<IActionResult> EmpLoanRepayDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.EmpLoanRepayDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetLoanList")]
        public async Task<IActionResult> GetLoanList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.GetLoanList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetLoanAmountDetails")]
        public async Task<IActionResult> GetLoanAmountDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await loanBusiness.GetLoanAmountDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpPayCalList")]
        public async Task<IActionResult> GetEmpPayCalList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpPayCalList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpSalEarnList")]
        public async Task<IActionResult> GetEmpSalEarnList(EmpSalaryMstModel empPayCalc)
        {
            if (empPayCalc == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpSalEarnList(empPayCalc);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpSalDedList")]
        public async Task<IActionResult> GetEmpSalDedList(EmpSalaryMstModel empPayCalc)
        {
            if (empPayCalc == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpSalDedList(empPayCalc);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpLeaveDetails")]
        public async Task<IActionResult> GetEmpLeaveDetails(EmpLeaveModel empLeave)
        {
            if (empLeave == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpLeaveDetails(empLeave);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpLoanDetails")]
        public async Task<IActionResult> GetEmpLoanDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpLoanDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost("GetBranchEmpList")]
        public async Task<IActionResult> GetBranchEmpList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetBranchEmpList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpPayCalSave")]
        public async Task<IActionResult> EmpPayCalSave(EmpPayCalcModel empPayCalc)
        {
            if (empPayCalc == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.EmpPayCalSave(empPayCalc);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("EmpPayCalDelete")]
        public async Task<IActionResult> EmpPayCalDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.EmpPayCalDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpPayEarnDetails")]
        public async Task<IActionResult> GetEmpPayEarnDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpPayEarnDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetEmpPayDedDetails")]
        public async Task<IActionResult> GetEmpPayDedDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpPayDedDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetEmpPayLeaveDetails")]
        public async Task<IActionResult> GetEmpPayLeaveDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpPayLeaveDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetEmpPayLoanDetails")]
        public async Task<IActionResult> GetEmpPayLoanDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetEmpPayLoanDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("PtSlabMasterDelete")]
        public async Task<IActionResult> PtSlabMasterDelete(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ptSlabMasterBusiness.PtSlabMasterDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PtSlabMasterSave")]
        public async Task<IActionResult> PtSlabMasterSave(PtSlabMasterModel ptSlabMasterModel)
        {
            if (ptSlabMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ptSlabMasterBusiness.PtSlabMasterSave(ptSlabMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetPtSlabMasterList")]
        public async Task<IActionResult> GetPtSlabMasterList(PageRequest request)
        {
            try
            {
                var result = await ptSlabMasterBusiness.GetPtSlabMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetEmpPayGenerationList")]
        public async Task<IActionResult> GetEmpPayGenerationList(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await payGenerationBusiness.GetEmpPayGenerationList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpPayGenerationSave")]
        public async Task<IActionResult> EmpPayGenerationSave(EmpPayGenList payGenModel)
        {
            if (payGenModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await payGenerationBusiness.EmpPayGenerationSave(payGenModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EmpPayGenerationDelete")]
        public async Task<IActionResult> EmpPayGenerationDelete(PageFromDtToDtRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await payGenerationBusiness.EmpPayGenerationDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetSelectedEmpDetails")]
        public async Task<IActionResult> GetSelectedEmpDetails(ReportRequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await empSalaryCalcBusiness.GetSelectedEmpDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

