using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FreightMasters.Models;
using FreightMasters.Business;
using Microsoft.AspNetCore.Authorization;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FreightMastersController : ControllerBase
    {
        readonly IDestinationMasterBusiness freightMastersBusiness;
        readonly IProductGroupMasterBusiness productGroupMastersBusiness;
        readonly IProductMasterBusiness productMasterBusiness;
        public FreightMastersController(IDestinationMasterBusiness _freightMastersBusiness, IProductGroupMasterBusiness _productGroupMasterBusiness, IProductMasterBusiness _productMasterBusiness)
        {
            freightMastersBusiness = _freightMastersBusiness;
            productGroupMastersBusiness = _productGroupMasterBusiness;
            productMasterBusiness = _productMasterBusiness;
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
        /// <summary>
        /// Controller method for PRODUCT GROUP MASTER
        /// </summary>
        /// <param name="productMasterModel"></param>
        [HttpPost("ProductMasterSave")]
        public async Task<IActionResult> ProductMasterSave(ProductMasterModel productMasterModel)
        {
            if (productMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productMasterBusiness.ProductMasterSave(productMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
