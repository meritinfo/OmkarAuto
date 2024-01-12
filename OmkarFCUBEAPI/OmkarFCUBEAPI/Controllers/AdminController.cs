using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using AdminMasters.Business;
using AdminMasters.Models;
using Shared.Models;
using FleetMasters.Business;
using FleetMasters.Models;
using Newtonsoft.Json;
using System.Data.Common;
using System.IO;
using System.Data;
using Microsoft.Extensions.Options;
using SqlHelper.Models;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IUserBusiness userBusiness;
        readonly IRoleMasterBusiness roleMasterBusiness;
        readonly IHrMasterBusiness hrMasterBusiness;
        readonly IPtSlabMasterBusiness ptSlabMasterBusiness;
        readonly IRolePrivilegesBusiness rolePrivilegesBusiness;
        readonly IMenuFormTypesBusiness menuFormTypesBusiness;
        public AdminController(IOptions<DBModel> _dbconnection, IUserBusiness _userBusiness,
            IRoleMasterBusiness _roleMasterBusiness,
             IHrMasterBusiness _hrMasterBusiness,
              IPtSlabMasterBusiness _ptSlabMasterBusiness,
            IMenuFormTypesBusiness _menuFormTypeBusiness,
            IRolePrivilegesBusiness _rolePrivilegesBusiness)
        {
            dbconnection = _dbconnection;
            userBusiness = _userBusiness;
            roleMasterBusiness = _roleMasterBusiness;
            hrMasterBusiness = _hrMasterBusiness;
            ptSlabMasterBusiness = _ptSlabMasterBusiness;
            menuFormTypesBusiness = _menuFormTypeBusiness;
            rolePrivilegesBusiness = _rolePrivilegesBusiness;
        }

        /// <summary>
        /// Controller method for user master details save
        /// </summary>
        /// <param name="userMasterModel"></param>
        [HttpPost("UserMasterDetailsSave")]
        public async Task<IActionResult> UserMasterDetailsSave()
        {
            try
            {
                var userPhoto = HttpContext.Request.Form.Files["userPhoto"];

            UserMasterModel userMasterModel = JsonConvert.DeserializeObject<UserMasterModel>(HttpContext.Request.Form["datadetails"]);
            if (userPhoto != null)
            {
                string imageName = new String(Path.GetFileNameWithoutExtension(userPhoto.FileName)).Replace(" ", "-");
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(userPhoto.FileName);
                     var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "upload/user/userphoto/" + imageName);
                    //  var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "D:/OmkarFcube_New/OmkarFCUBEAPP/src/assets/upload/user/userphoto/" + imageName);
                  //  var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload/user/userphoto/" + imageName);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await userPhoto.CopyToAsync(fileStream);
                    userMasterModel.ImageName = imageName;
                }
            }
        //    if (userMasterModel == null)
           // {
            //    return BadRequest("Invalid request data");
       //     }
          
                var result = await userBusiness.UserMasterDetailsSave(userMasterModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(PasswordModel passwordModel)
        {
            if (passwordModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await userBusiness.ChangePassword(passwordModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CheckPassword")]
        public async Task<IActionResult> CheckPassword(PasswordModel request)
        {
            try
            {
                var result = await userBusiness.CheckPassword(request);

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
        [HttpPost("HrMasterSave")]
        public async Task<IActionResult> HrMasterSave(HrMasterModel hrMasterModel)
        {
            if (hrMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await hrMasterBusiness.HrMasterSave(hrMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("PtSlabMasterSave")]
        public async Task<IActionResult> PtSlabMasterSave(PtSlabMasterModel ptSlabMasterModel)
        {
            if (ptSlabMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ptSlabMasterBusiness.PtSlabMasterSave(ptSlabMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetHrMasterList")]
        public async Task<IActionResult> GetHrMasterList(PageRequest request)
        {
            try
            {
                var result = await hrMasterBusiness.GetHrMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetPtSlabMasterList")]
        public async Task<IActionResult> GetPtSlabMasterList(PageRequest request)
        {
            try
            {
                var result = await ptSlabMasterBusiness.GetPtSlabMasterList(request);

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
        [HttpPost("GetHrTypeList")]
        public async Task<IActionResult> GetHrTypeList()
        {
            try
            {
                var result = await userBusiness.GetHrTypeList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for User Master List
        /// </summary>
        [HttpPost("GetUserMasterList")]
        public async Task<IActionResult> GetUserMasterList(PageRequest request)
        {
            try
            {
                var result = await userBusiness.GetUserMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetRoleMasterList")]
        public async Task<IActionResult> GetRoleTypeList(PageRequest request)
        {
            try
            {
                var result = await roleMasterBusiness.GetRoleTypeList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for User Master List
        /// </summary>
        [HttpPost("GetEWayBillDetails")]
        public async Task<IActionResult> GetEWayBillDetails(EWayBillRequest request)
        {
            try
            {
                var result = await userBusiness.GetEWayBillDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for delete user details
        /// </summary>
        [HttpPost("DeleteUserDetails")]
        public async Task<IActionResult> DeleteUserDetails(string request)
        {
            try
            {
                var result = await userBusiness.DeleteUserDetails(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for validate username
        /// </summary>
        [HttpPost("UsernameValidation")]
        public async Task<IActionResult> UsernameValidation(UserMasterModel userMasterModel)
        {
            try
            {
                var result = await userBusiness.UsernameValidation(userMasterModel.UserName);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for Role Type List
        /// </summary>
        [HttpPost("GetRoleTypeList")]
        public async Task<IActionResult> GetRoleTypeList()
        {
            try
            {
                var result = await userBusiness.GetRoleTypeList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetRolePrivileges")]
        public async Task<IActionResult> GetRolePrivileges(Request request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await rolePrivilegesBusiness.GetRolePrivileges(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("RolePrivilegesListSave")]
        public async Task<IActionResult> RolePrivilegesListSave(RolePrivilegesListModel rolePrivilegesList)
        {
            if (rolePrivilegesList == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await rolePrivilegesBusiness.RolePrivilegesListSave(rolePrivilegesList);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }      

    }
}
