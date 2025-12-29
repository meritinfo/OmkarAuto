using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using AdminMasters.Business;
using AdminMasters.Models;
using Shared.Models;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Shared.Business;
using Microsoft.AspNetCore.Http;

namespace FCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly IUserBusiness userBusiness;
        readonly IRoleMasterBusiness roleMasterBusiness;
        readonly IRolePrivilegesBusiness rolePrivilegesBusiness;
        readonly IMenuFormTypesBusiness menuFormTypesBusiness;
        readonly ISharedBusiness sharedBusiness;
        public AdminController(IOptions<DBModel> _dbconnection, IUserBusiness _userBusiness,
            IRoleMasterBusiness _roleMasterBusiness,
            IMenuFormTypesBusiness _menuFormTypeBusiness,
            IRolePrivilegesBusiness _rolePrivilegesBusiness, 
            ISharedBusiness _sharedBusiness)
        {
            dbconnection = _dbconnection;
            userBusiness = _userBusiness;
            roleMasterBusiness = _roleMasterBusiness;
            menuFormTypesBusiness = _menuFormTypeBusiness;
            rolePrivilegesBusiness = _rolePrivilegesBusiness;
            sharedBusiness =_sharedBusiness;
        }

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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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



        [HttpPost("GetEWayBillDetails")]
        public async Task<IActionResult> GetEWayBillDetails(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("DeleteUserDetails")]
        public async Task<IActionResult> DeleteUserDetails(string request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
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

        [HttpPost("UsernameValidation")]
        public async Task<IActionResult> UsernameValidation(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await userBusiness.UsernameValidation(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


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
       

        [HttpPost("GetUserRights")]
        public async Task<IActionResult> GetUserRights(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await userBusiness.GetUserRights(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetDashboardCustomer")]
        public async Task<IActionResult> GetDashboardCustomer(ReportRequestModel report)
        {
            if (report == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sharedBusiness.GetDashboardCustomer(report);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetCustomerProfitLossRptExcel")]
        public async Task<IActionResult> GetCustomerProfitLossRptExcel(ReportRequestModel report)
        {
            if (report == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await sharedBusiness.GetCustomerProfitLossRptExcel(report);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDashboardNCC")]
        public async Task<IActionResult> GetDashboardNCC(RequestModel request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await userBusiness.GetDashboardNCC(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


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
        [HttpPost("ChkDuplicateRoleDesc")]
        public async Task<IActionResult> ChkDuplicateRoleDesc(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await roleMasterBusiness.ChkDuplicateRoleDesc(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkDuplicateRoleName")]
        public async Task<IActionResult> ChkDuplicateRoleName(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await roleMasterBusiness.ChkDuplicateRoleName(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("RoleTypesDelete")]
        public async Task<IActionResult> RoleTypesDelete(RequestModel req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await roleMasterBusiness.RoleTypesDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("GetRolePrivileges")]
        public async Task<IActionResult> GetRolePrivileges(RequestModel request)
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

        [HttpPost("GetDocRenewalDetails")]
        public async Task<IActionResult> GetDocRenewalDetails()
        {
            try
            {
                var result = await sharedBusiness.GetDocRenewalDetails();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
    }
}
