using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using HRMasters.Models;
using HRMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using HRMasters.Repository;
using System.Collections.Generic;


namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class HRMasterController : ControllerBase
    {
        readonly IHrMasterBusiness hrMasterBusiness;
        readonly IEmpMasterBusiness empMasterBusiness;
        readonly IEmpSalaryBusiness empSalaryBusiness;


        public HRMasterController(IHrMasterBusiness _hrMasterBusiness, 
            IEmpMasterBusiness _empMasterBusiness,
            IEmpSalaryBusiness _empSalaryBusiness)
        {
            hrMasterBusiness = _hrMasterBusiness;
            empMasterBusiness = _empMasterBusiness;
            empSalaryBusiness = _empSalaryBusiness;
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
        public async Task<IActionResult> EmpMasterSave(EmpMasterModel empMaster)
        {
            if (empMaster == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
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


    }
}

