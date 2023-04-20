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
        readonly IRoleMasterBusiness roleMasterBusiness;
        readonly IMenuFormTypesBusiness menuFormTypesBusiness;
        public AdminController(IUserBusiness _userBusiness,IRoleMasterBusiness _roleMasterBusiness, IMenuFormTypesBusiness _menuFormTypeBusiness)
        {
            userBusiness = _userBusiness;
            roleMasterBusiness = _roleMasterBusiness;
            menuFormTypesBusiness = _menuFormTypeBusiness;
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
        /// Controller method for rolemaster details save
        /// </summary>
        /// <param name="roleMasterModel"></param>
        [HttpPost("RoleMasterSave")]
        public async Task<IActionResult> RoleMasterSave(RoleMasterModel roleMasterModel)
        {
            if (roleMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await roleMasterBusiness.RoleMasterSave(roleMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Controller method for Menutype master details save
        /// </summary>
        /// <param name="menuFormTypeModel"></param>
        [HttpPost("MenuFormTypeSave")]
        public async Task<IActionResult> MenuFormTypeMasterSave(MenuFormTypesModel menuFormTypeModel)
        {
            if (menuFormTypeModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await menuFormTypesBusiness.MenuFormTypesSave(menuFormTypeModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
