using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FinanceMaster.Models;
using FinanceMasters.Models;
using FinanceMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using FleetTrans.Models;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FinanceMastersController : ControllerBase
    {
        readonly IFinAccountsMasterBusiness finAccountsMasterBusiness;
        readonly IFinGroupMasterBusiness finGroupMasterBusiness;
        readonly IFinScheduleMasterBusiness finScheduleMasterBusiness;
        readonly IChequeAllotmentDtlBusiness chequeAllotmentDtlBusiness;
        readonly IChequeAllotmentMstBusiness chequeAllotmentMstBusiness;


        public FinanceMastersController(IFinGroupMasterBusiness _finGroupMasterBusiness, 
            IFinAccountsMasterBusiness _finAccountsMasterBusiness, 
            IFinScheduleMasterBusiness _finScheduleMasterBusiness, 
            IChequeAllotmentDtlBusiness _chequeAllotmentDtlBusiness, 
            IChequeAllotmentMstBusiness _chequeAllotmentMstBusiness)
        {
            finAccountsMasterBusiness = _finAccountsMasterBusiness;
            finGroupMasterBusiness = _finGroupMasterBusiness;
            finScheduleMasterBusiness = _finScheduleMasterBusiness;
            chequeAllotmentDtlBusiness = _chequeAllotmentDtlBusiness;
            chequeAllotmentMstBusiness = _chequeAllotmentMstBusiness;

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
        public async Task<IActionResult> FinGroupDetailsDelete(Request req)
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
        public async Task<IActionResult> GetSubAccountTypeList(Request req)
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
        public async Task<IActionResult> chkActName(Request req)
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
    }
}

