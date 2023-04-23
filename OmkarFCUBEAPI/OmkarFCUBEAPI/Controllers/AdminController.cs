using FleetMasters.Business;
using FleetMasters.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using AdminMasters.Business;
using AdminMasters.Models;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AdminController : ControllerBase
    {
        readonly IUserBusiness userBusiness;
        public AdminController(IUserBusiness _userBusiness)
        {
            userBusiness = _userBusiness;
        }

        /// <summary>
        /// Controller method for user master details save
        /// </summary>
        /// <param name="userMasterModel"></param>
        [HttpPost("UserMasterDetailsSave")]
        public async Task<IActionResult> UserMasterDetailsSave(UserMasterModel userMasterModel)
        {
            if (userMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await userBusiness.UserMasterDetailsSave(userMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for Module List
        /// </summary>
        [HttpPost("GetModuleList")]
        public async Task<IActionResult> GetModuleList()
        {
            try
            {
                var result = await userBusiness.GetModuleList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
