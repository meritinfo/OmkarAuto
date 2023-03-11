using Microsoft.AspNetCore.Mvc;
using Shared.Business;
using Shared.Models;
using System;
using System.Threading.Tasks;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        readonly ISharedBusiness sharedBusiness;
        public LoginController(ISharedBusiness _sharedBusiness)
        {
            sharedBusiness = _sharedBusiness;
        }

        /// <summary>
        /// Controller method for login to the application
        /// </summary>
        /// <param name="loginModel"></param>
        [HttpPost("LoginDetails")]
        public async Task<IActionResult> LoginDetails(LoginModel loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sharedBusiness.LoginDetails(loginModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
