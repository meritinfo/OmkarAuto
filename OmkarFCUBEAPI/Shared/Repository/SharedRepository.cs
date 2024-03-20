using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using System.Data;
using System.IO;

namespace Shared.Repository
{
    public class SharedRepository : ISharedRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public SharedRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for login to the application
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns>UserModel</returns>
        public async Task<UserModel> LoginDetails(LoginModel loginModel)
        {
            UserModel userModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserName", loginModel.UserName),
                            new SqlParameter("@UserPassword", loginModel.UserPassword)
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "LoginDetails_Select", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        userModel.UserId    = Convert.ToString(userData.Tables[0].Rows[0]["UserId"]);
                        userModel.UserName  = Convert.ToString(userData.Tables[0].Rows[0]["UserName"]);
                        userModel.Status    = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        userModel.Scope     = Convert.ToString(userData.Tables[0].Rows[0]["UserScope"]);
                        userModel.Message   = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        userModel.UserId    = "0";
                        userModel.UserName  = "";
                        userModel.Status    = false;
                        userModel.Scope     = "";
                        userModel.Message   = "Account not found";
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return userModel;
        }
        public async Task<ResponseModel> IntermediateScreenDetail(IntermediateScreenModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@YearID", request.YearID),
                             new SqlParameter("@LoginDate", request.LoginDate)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "IntermediateScreenDetails_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return responseModel;
        }
        public async Task<ResponseModel> CheckBookingDate(DateModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@YearID", request.YearID),
                             new SqlParameter("@BookingDate", request.BookingDate)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CheckDate_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return responseModel;
        }

        /// <summary>
        /// Service method for login to the application
        /// </summary>
        /// <param name="userID"></param>
        /// <returns>List<MenuModel></returns>
        public async Task<List<MenuModel>> MenuDetails(string userID)
        {
            List<MenuModel> menuList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserID", userID)
                        };
                    var menuData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "MenuList_Select", param);

                    if (menuData != null && menuData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < menuData.Tables[0].Rows.Count; i++)
                        {
                            menuList.Add(new MenuModel
                            {
                                ModuleId = Convert.ToInt32(menuData.Tables[0].Rows[i]["ModuleId"]),
                                ModuleName = Convert.ToString(menuData.Tables[0].Rows[i]["ModuleName"]),
                                MenuName = Convert.ToString(menuData.Tables[0].Rows[i]["MenuName"]),
                                MenuType = Convert.ToString(menuData.Tables[0].Rows[i]["MenuType"]),
                                MenuCode = Convert.ToString(menuData.Tables[0].Rows[i]["MenuCode"]),
                                CreateYN = Convert.ToString(menuData.Tables[0].Rows[i]["CreateYN"]),
                                EditYN = Convert.ToString(menuData.Tables[0].Rows[i]["EditYN"]),
                                ViewYN = Convert.ToString(menuData.Tables[0].Rows[i]["ViewYN"]),
                                DeleteYN = Convert.ToString(menuData.Tables[0].Rows[i]["DeleteYN"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return menuList;
        }
        public async Task<List<DropDownListModel>> GetYearList()
        {
            List<DropDownListModel> yearList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "YearList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            yearList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return yearList;
        }
        public async Task<List<DropDownListModel>> GetServerDate()
        {
            List<DropDownListModel> yearList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "Current_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            yearList.Add(new DropDownListModel
                            {
                        
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return yearList;
        }

        // <summary>
        /// Service method for login to the application
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns>UserModel</returns>
        public async Task<EWayAPIConfigurationModel> EWayAPIConfigurationDetails()
        {
            EWayAPIConfigurationModel configModel = new();
            try
            {
                if (dbconnection != null)
                {
                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "EWayApiDetails_Select", null);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        configModel.ApiCheckGstinUrl = Convert.ToString(resultData.Tables[0].Rows[0]["ApiCheckGstinUrl"]);
                        configModel.ApiAccessTokenUrl = Convert.ToString(resultData.Tables[0].Rows[0]["ApiAccessTokenUrl"]);
                        configModel.ApiUserName = Convert.ToString(resultData.Tables[0].Rows[0]["ApiUserName"]);
                        configModel.ApiPassword = Convert.ToString(resultData.Tables[0].Rows[0]["ApiPassword"]);
                        configModel.ApiClient_id = Convert.ToString(resultData.Tables[0].Rows[0]["ApiClient_id"]);
                        configModel.ApiClient_secret = Convert.ToString(resultData.Tables[0].Rows[0]["ApiClient_secret"]);
                        configModel.ApiGrantType = Convert.ToString(resultData.Tables[0].Rows[0]["ApiGrantType"]);
                        configModel.GstUserName = Convert.ToString(resultData.Tables[0].Rows[0]["GstUserName"]);
                        configModel.EwayBillApiYN = Convert.ToString(resultData.Tables[0].Rows[0]["EwayBillApiYN"]);
                        configModel.EwayBillApiGstId = Convert.ToString(resultData.Tables[0].Rows[0]["EwayBillApiGstId"]);
                        configModel.EwayBillApiUid = Convert.ToString(resultData.Tables[0].Rows[0]["EwayBillApiUid"]);
                        configModel.EwayBillApiPwd = Convert.ToString(resultData.Tables[0].Rows[0]["EwayBillApiPwd"]);
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return configModel;
        }
        public async Task<ResponseModel> GetExcelReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    int colcnt = dt.Columns.Count;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = "OMKAR";
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 0; i < colcnt; i++)
                    {
                        ws.Cell(5, i+1).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0;

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        for (int i = 0; i < colcnt; i++)
                        {
                            ws.Cell(j + 6, i + 1).Value = Convert.ToString(dt.Rows[j][i]);
                        }

                    }
                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, j + 5, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, j + 5, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("Reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
                    var filePath = foldername + "//" + filename;
                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);
                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

    }
}
