using FleetTrans.Business;
using Microsoft.AspNetCore.Mvc;
using Shared.Business;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace FCUBEAPI.Controllers
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
        /// <summary>
        /// Controller method for login to the application
        /// </summary>
        /// <param name="loginModel"></param>
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken(LoginModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sharedBusiness.RefreshToken(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// </summary>
        [HttpPost("IntermediateScreenDetail")]
        public async Task<IActionResult> IntermediateScreenDetail(IntermediateScreenModel request)
        {
            try
            {
                var result = await sharedBusiness.IntermediateScreenDetail(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetScopeBranchList")]
        public async Task<IActionResult> GetScopeBranchList(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sharedBusiness.GetScopeBranchList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CheckBookingDate")]
        public async Task<IActionResult> CheckBookingDate(DateModel request)
        {
            try
            {
                var result = await sharedBusiness.CheckBookingDate(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetYearList")]
        public async Task<IActionResult> GetYearList()
        {
            try
            {
                var result = await sharedBusiness.GetYearList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetServerDate")]
        public async Task<IActionResult> GetServerDate()
        {
            try
            {
                var result = await sharedBusiness.GetServerDate();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCompanyDetail")]
        public async Task<IActionResult> GetCompanyDetail()
        {
            try
            {
                var result = await sharedBusiness.GetCompanyDetail();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetScheduleDetails")]
        public async Task<IActionResult> GetScheduleDetails()
        {
            try
            {
                var result = await sharedBusiness.GetScheduleDetails();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        /// <summary>
        /// Controller method for menu list to the application
        /// </summary>
        /// <param name="UserID"></param>
        [HttpGet("MenuDetails/{userID}")]
        public async Task<IActionResult> MenuDetails(string userID)
        {
            if (userID == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sharedBusiness.MenuDetails(userID);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
