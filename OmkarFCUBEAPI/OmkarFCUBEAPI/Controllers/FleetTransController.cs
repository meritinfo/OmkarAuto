using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

using FleetTrans.Business;
using Microsoft.AspNetCore.Authorization;

using FleetTrans.Models;


namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FleetTransController : ControllerBase
    {
        readonly IDocRenewalEntryBusiness docRenewalEntryBusiness;


        public FleetTransController(IDocRenewalEntryBusiness _DocRenewalEntryBusiness)
        {
            docRenewalEntryBusiness = _DocRenewalEntryBusiness;
          


        }
        /// <summary>

        /// </summary>
        /// <param name="FinAccountsMasterModel"></param>
        [HttpPost("DocRenewalEntryDetailsSave")]
        public async Task<IActionResult> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel)
        {
            if (docRenewalEntryModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await docRenewalEntryBusiness.DocRenewalEntryDetailsSave(docRenewalEntryModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      
    }
}

