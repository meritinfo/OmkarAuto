using ClosedXML.Excel;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Shared.Repository
{
    public class SharedRepository : ISharedRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public SharedRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

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
                            new SqlParameter("@UserPassword", loginModel.UserPassword),
                            new SqlParameter("@IpAddress",  loginModel.IpAddress),
                            new SqlParameter("@Otp",  loginModel.Otp),
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLoginDetails", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        userModel.UserId    = Convert.ToString(userData.Tables[0].Rows[0]["UserId"]);
                        userModel.UserName  = Convert.ToString(userData.Tables[0].Rows[0]["UserName"]);
                        userModel.Status    = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        userModel.Scope     = Convert.ToString(userData.Tables[0].Rows[0]["UserScope"]);
                        userModel.Message   = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                        userModel.UserType   = Convert.ToString(userData.Tables[0].Rows[0]["UserType"]);
                    }
                    else
                    {
                        userModel.UserId    = "0";
                        userModel.UserName  = "";
                        userModel.Status    = false;
                        userModel.Scope     = "";
                        userModel.Message   = "Account not found";
                        userModel.UserType   = "";
                    }
                }
            }
            catch (Exception ex)
            {
               
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
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return responseModel;
        }

        public async Task<List<DropDownListModel>> GetScopeBranchList(RequestModel req)
        {
            List<DropDownListModel> branchList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = 
                        { 
                            new SqlParameter("@UserId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getScopeBranchList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            branchList.Add(new DropDownListModel
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
                
            }
            return branchList;
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
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return responseModel;
        }
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
                
            }
            return yearList;
        }

        public async Task<ResponseModel> GetServerDate(RequestModel request)
        {
            ResponseModel serverDt = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@YearId", request.strRequest)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getServerDate", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        serverDt.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        serverDt.Message = Convert.ToDateTime(statusData.Tables[0].Rows[0]["Message"]).ToString("yyyy-MM-dd");
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return serverDt;
        }

        public async Task<ResponseModel> GetCompanyDetail()
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {                  
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCompanyName");

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message= Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }                   
                }
            }
            catch (Exception ex)
            {
                
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetCompanyShortCode()
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCompanyShortCode");

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ScheduleModel> GetScheduleDetails()
        {
            ScheduleModel scheduleModel = new();
            try
            {
                if (dbconnection != null)
                {
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getScheduleDetails");

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        scheduleModel.WarningTimeStart = Convert.ToString(userData.Tables[0].Rows[0]["WarningTimeStart"]);
                        scheduleModel.PublishStart = Convert.ToString(userData.Tables[0].Rows[0]["PublishStart"]);
                        scheduleModel.PublishEnd = Convert.ToString(userData.Tables[0].Rows[0]["PublishEnd"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return scheduleModel;
        }
        public async Task<EWayAPIConfigurationModel> EWayAPIConfigurationDetails(RequestModel request)
        {
            EWayAPIConfigurationModel configModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode", request.strRequest2),
                            new SqlParameter("@RcmFcm", request.strRequest1),
                        };
                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEWayApiDetails", param);

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
                        configModel.ApiEwayBillExtenUrl = Convert.ToString(resultData.Tables[0].Rows[0]["ApiEwayBillExtenUrl"]);
                    }
                }
            }
            catch (Exception ex)
            {

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
                    responseModel = await GetCompanyDetail();
                    int colcnt = dt.Columns.Count;
                     
                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
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
                        
                        if (rptheader == "TRIPS SUMMARY -MONTHLY STATEMENT" || rptheader == "TRIPS MARGIN SUMMARY - MONTHLY STATEMENT")
                        {
                            if(Convert.ToString(dt.Rows[j][1]) == "TOTAL")
                            {
                                ws.Range(j + 6, 1, j + 6, colcnt).Style.Font.Bold = true;
                            }
                        }
                    }
                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, j + 5, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, j + 5, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
                    
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
        public async Task<List<DocRenewalModel>> GetDocRenewalDetails()
        {
            List<DocRenewalModel> DocRenewalList = new();
            try
            {
                if (dbconnection != null)
                {
                    var menuData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalDetails", null);

                    if (menuData != null && menuData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < menuData.Tables[0].Rows.Count; i++)
                        {
                            DocRenewalList.Add(new DocRenewalModel
                            {
                                VehicleNo = Convert.ToString(menuData.Tables[0].Rows[i]["VehicleNo"]),
                                DocDescription = Convert.ToString(menuData.Tables[0].Rows[i]["DocDescription"]),
                                ValidToDt = Convert.ToString(menuData.Tables[0].Rows[i]["ValidToDt"]),
                                NetAmount = Convert.ToString(menuData.Tables[0].Rows[i]["NetAmount"]),
                                DaysRemaining = Convert.ToString(menuData.Tables[0].Rows[i]["DaysRemaining"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return DocRenewalList;
        }
        public async Task<List<RequestModel>> GetDashboardCustomer(ReportRequestModel report)
        {
            List<RequestModel> partyList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", report.PageNumber),
                            new SqlParameter("@PageSize",   report.PageSize),
                            new SqlParameter("@SortColumn", report.SortColumn),
                            new SqlParameter("@SortOrder",  report.SortOrder),
                            new SqlParameter("@Turnover",   report.Search),
                            new SqlParameter("@DayAfterInt",report.FilterStr1),
                            new SqlParameter("@AdminInt",   report.FilterStr),
                            new SqlParameter("@Interest",   report.FilterStr2),
                            new SqlParameter("@YearId",     report.FilterStr3),
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDashboardCustomer", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < userData.Tables[0].Rows.Count; i++)
                        {
                            partyList.Add(new RequestModel
                            {
                                strRequest = Convert.ToString(userData.Tables[0].Rows[i]["Party"]),
                                strRequest1 = Convert.ToString(userData.Tables[0].Rows[i]["Amount"]),
                                strRequest2 = Convert.ToString(userData.Tables[0].Rows[i]["Pct"]),                               
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return partyList;
        }
        public async Task<ResponseModel> GenerateLoginOTP(LoginModel login)
        {
            ResponseModel responseModel = new();
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                       {
                            new SqlParameter("@UserName", login.UserName),
                            new SqlParameter("@IpAddress",  login.IpAddress)
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GenerateLoginOTP", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message= Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                    if (responseModel.Status)
                    {
                        login.Otp = responseModel.Message;
                        response = await SendOTPMail(login);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return response;
        }
        public async Task<ResponseModel> SendOTPMail(LoginModel login)
        {
            ResponseModel response = new(); 
            ResponseModel company = new();
            List<DropDownListModel> emailList = new();
            MailHostDtlsModel mailHost = new();
            try
            {

                using (MailMessage mail = new MailMessage())
                {
                    mailHost = await GetMailHostDetails();
                    company = await GetCompanyDetail();                       

                    string strMail = "";
                    string sUserName = mailHost.EmailId;
                    string sUserPassword = mailHost.EmailPwd;
                    string sHost = mailHost.EmailServer;
                    string sDisplayName = mailHost.EmailDisplayName;
                    bool bEnableSsl = true;
                    int port = Convert.ToInt32(mailHost.EmailPort);

                    emailList = await GetEmailIdList("OTP");

                    for (int i = 0; i < emailList.Count; i++)
                    {
                        strMail = strMail + "," + emailList[i].DataName.ToString();
                    }

                    strMail = strMail.Remove(0, 1);

                    string strNarr = "";
                    strNarr += "Dear Admin, <br><br><br><br>";
                    strNarr += "Greetings of day !" + "<br>";
                    strNarr += "Please find Login OTP generated for <b>" + login.UserName + 
                                " </b> is <b>"+ login.Otp +"</b> " +
                                "trying to login from Mac Address/ IP Address "+ login.IpAddress +" <br>";
                    strNarr += "Share OTP for Login" + "<br><br><br>";
                    strNarr += "Thanks" + "<br>";
                    strNarr += company.Message + "<br>";

                    mail.To.Add(strMail);
                    mail.From = new MailAddress(sUserName, sDisplayName);
                    mail.Subject = "Login OTP for " + login.UserName ;
                    mail.Body = strNarr;
                    mail.IsBodyHtml = true;

                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = sHost;
                    smtp.Credentials = new NetworkCredential(sUserName, sUserPassword);
                    smtp.EnableSsl = bEnableSsl;
                    smtp.Port = port;
                    mail.Priority = MailPriority.Normal;
                    mail.IsBodyHtml = true;
                    mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                    smtp.Send(mail);
                    response.Status = true;
                    response.Message = "Mail Sent Successfully";
                }

            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;

        }

        public async Task<MailHostDtlsModel> GetMailHostDetails()
        {
            MailHostDtlsModel mail = new();
            try
            {
                if (dbconnection != null)
                {
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmailHostConfig", null);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        mail.EmailId = Convert.ToString(userData.Tables[0].Rows[0]["EmailId"]);
                        mail.EmailPwd = Convert.ToString(userData.Tables[0].Rows[0]["EmailPwd"]);
                        mail.EmailServer = Convert.ToString(userData.Tables[0].Rows[0]["EmailServer"]);
                        mail.EmailPort = Convert.ToString(userData.Tables[0].Rows[0]["EmailPort"]);
                        mail.EmailDisplayName = Convert.ToString(userData.Tables[0].Rows[0]["EmailDisplayName"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return mail;
        }

        public async Task<List<DropDownListModel>> GetEmailIdList(string EmailFor)
        {
            List<DropDownListModel> emailList = new();
            try
            {
                if (dbconnection != null)
                {

                    SqlParameter[] param =
                        {
                            new SqlParameter("@EmailFor", EmailFor),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmailIdList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            emailList.Add(new DropDownListModel
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

            }
            return emailList;
        }

        public async Task<ResponseModel> GetDashboardDetail(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserId", request.strRequest),
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCompanyDashboard", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<RequestModel> GetBpclAccessParentToken()
        {
            RequestModel requestModel = new RequestModel();
            RequestModel request = new RequestModel();
            try
            {
                requestModel = await GetAccessSubToken();

                string URL = "https://qa.api.cep.bpcl.in/retail/v2/bpcl/smartfleet/subuser/";

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + requestModel.strRequest);
                client.DefaultRequestHeaders.Add("Cookie", "ROUTE=.api-68c6f96bd-8z5nx");

                HttpResponseMessage response = client.PostAsync("parenttoken?accountId="+ requestModel.strRequest1, null).Result;

                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    BrplParentTokenModel tokenModel = JsonConvert.DeserializeObject<BrplParentTokenModel>(responseData);
                    request.strRequest = tokenModel.access_token;
                    request.strRequest1 = requestModel.strRequest1;
                    client.Dispose();
                }
            }
            catch (Exception ex)
            { }
            return request;
        }


        public async Task<RequestModel> GetAccessSubToken()
        {
            RequestModel request = new();
            try
            {
                EWayAPIConfigurationModel subTokenConfig = await APIConfigurationDetails();
                string URL = "https://qa.api.cep.bpcl.in/authorizationserver/";

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("client_id", subTokenConfig.ApiClient_id),
                    new KeyValuePair<string, string>("client_secret", subTokenConfig.ApiClient_secret),
                    new KeyValuePair<string, string>("grant_type", subTokenConfig.ApiGrantType),
                    new KeyValuePair<string, string>("username", subTokenConfig.ApiUserName),
                    new KeyValuePair<string, string>("password", subTokenConfig.ApiPassword),
                });

                HttpResponseMessage response = client.PostAsync("oauth/token", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    BrplSubTokenModel tokenModel = JsonConvert.DeserializeObject<BrplSubTokenModel>(responseData);
                    request.strRequest = tokenModel.access_token;
                    request.strRequest1 = subTokenConfig.GstUserName;
                    client.Dispose();
                }
            }
            catch (Exception ex)
            { }
            return request;
        }

        public async Task<EWayAPIConfigurationModel> APIConfigurationDetails()
        {
            EWayAPIConfigurationModel configModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBpclApiDetails", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        configModel.ApiCheckGstinUrl = Convert.ToString(resultData.Tables[0].Rows[0]["ApiUrl"]);
                        configModel.ApiUserName = Convert.ToString(resultData.Tables[0].Rows[0]["ApiUserName"]);
                        configModel.ApiPassword = Convert.ToString(resultData.Tables[0].Rows[0]["ApiPassword"]);
                        configModel.ApiClient_id = Convert.ToString(resultData.Tables[0].Rows[0]["ApiClient_id"]);
                        configModel.ApiClient_secret = Convert.ToString(resultData.Tables[0].Rows[0]["ApiClient_secret"]);
                        configModel.ApiGrantType = Convert.ToString(resultData.Tables[0].Rows[0]["ApiGrantType"]);
                        configModel.GstUserName = Convert.ToString(resultData.Tables[0].Rows[0]["WalletAccountId"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return configModel;
        }
    }
}
