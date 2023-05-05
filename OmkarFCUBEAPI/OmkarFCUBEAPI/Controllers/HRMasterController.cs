using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

using HRMasters.Business;
using Microsoft.AspNetCore.Authorization;

using HRMasters.Models;


namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class HRMasterController : ControllerBase
    {
        readonly IHRMasterBusiness hrMasterBusiness;
     


        public HRMasterController(IHRMasterBusiness _hrMasterBusiness)
        {
            hrMasterBusiness = _hrMasterBusiness;
           



        }
        /// <summary>

        /// </summary>
        /// <param name="FinAccountsMasterModel"></param>
        [HttpPost("HRMasterSave")]
        public async Task<IActionResult> HRMasterSave(HRMasterModel hrMasterModel)
        {
            if (hrMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await hrMasterBusiness.HRMasterSave(hrMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      



    }
}

