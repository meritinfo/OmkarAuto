using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Business;
using Shared.Models;
using System.Threading.Tasks;
using System;
using FreightMasters.Models;
using FreightMasters.Business;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreightMastersController : ControllerBase
    {
        readonly IDestinationMasterBusiness freightMastersBusiness;
        readonly IProductGroupMasterBusiness productGroupMastersBusiness;
        public FreightMastersController(IDestinationMasterBusiness _freightMastersBusiness, IProductGroupMasterBusiness _productGroupMasterBusiness)
        {
            freightMastersBusiness = _freightMastersBusiness;
            productGroupMastersBusiness = _productGroupMasterBusiness;
        }

        /// <summary>
        /// Controller method for DESTINATION MASTER
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        [HttpPost("DestinationMasterDetailsSave")]
        public async Task<IActionResult> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel)
        {
            if (destinationMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightMastersBusiness.DestinationMasterDetailsSave(destinationMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for PRODUCT GROUP MASTER
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        [HttpPost("ProductGroupMasterDetailsSave")]
        public async Task<IActionResult> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel)
        {
            if (productGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productGroupMastersBusiness.ProductGroupMasterDetailsSave(productGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
