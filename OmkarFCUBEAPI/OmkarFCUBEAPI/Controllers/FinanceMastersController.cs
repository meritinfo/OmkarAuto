using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FinanceMaster.Models;
using FinanceMasters.Business;
using Microsoft.AspNetCore.Authorization;
using FleetMasters.Business;
using FleetMasters.Models;
using FinanceMasters.Models;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FinanceMastersController : ControllerBase
    {
        readonly IFinAccountsMasterBusiness finAccountsMasterBusiness;
        readonly IFinScheduleMasterBusiness finScheduleMasterBusiness;
        readonly IChequeAllotmentDtlBusiness chequeAllotmentDtlBusiness;
        readonly IChequeAllotmentMstBusiness chequeAllotmentMstBusiness;

        public FinanceMastersController(IFinAccountsMasterBusiness _finAccountsMasterBusiness, IFinScheduleMasterBusiness _finScheduleMasterBusiness, IChequeAllotmentDtlBusiness _chequeAllotmentDtlBusiness, IChequeAllotmentMstBusiness _chequeAllotmentMstBusiness)
        {
            finAccountsMasterBusiness = _finAccountsMasterBusiness;
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
    }
}

