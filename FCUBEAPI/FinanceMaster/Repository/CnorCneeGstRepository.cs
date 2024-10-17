using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Spreadsheet;
using FinanceMaster.Models;
using FinanceMasters.Models;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public class CnorCneeGstRepository: ICnorCneeGstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CnorCneeGstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        //public async Task<ResponseModel> CnorCneeGstSave(CnorCneeGstDetailModel cnorCneeGstModel)
        //{
        //    ResponseModel responseModel = new();

        //    var connection = new SqlConnection(dbconnection.Value.DBConnection);
        //    connection.Open();
        //    SqlTransaction transaction;
        //    transaction = connection.BeginTransaction();

        //    try
        //    {
        //        if (dbconnection != null)
        //        {
        //            SqlParameter[] param =
        //                {
        //                   new SqlParameter("@CnorCneeDetID" , cnorCneeGstModel.CnorCneeDetID ),
        //                     new SqlParameter("@CnorCneeID" , cnorCneeGstModel.CnorCneeID ),
        //                     new SqlParameter("@Location" , cnorCneeGstModel.Location ),
        //                     new SqlParameter("@Address1" , cnorCneeGstModel.Address1),
        //                     new SqlParameter("@Address2" , cnorCneeGstModel.Address2 ),
        //                     new SqlParameter("@Address3 " , cnorCneeGstModel.Address3  ),
        //                     new SqlParameter("@StateCode" , cnorCneeGstModel.StateCode  ),
        //                     new SqlParameter("@PinCode" , cnorCneeGstModel.PinCode ),
        //                     new SqlParameter("@GstNo" , cnorCneeGstModel.GstNo ),
        //                     new SqlParameter("@ContactPerson" , cnorCneeGstModel.ContactPerson ),
        //                     new SqlParameter("@MobileNo" , cnorCneeGstModel.MobileNo ),
        //                     new SqlParameter("@Email" , cnorCneeGstModel.Email ),
        //                   //  new SqlParameter("@OLD_CnorCnee_ID " , cnorCneeGstModel.OLD_CnorCnee_ID ),

        //                };
        //            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ConsigneeCnorGstSave", param);

        //            if (statusData != null && statusData.Tables[0].Rows.Count > 0)
        //            {
        //                responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
        //                responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
        //                if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
        //                {
        //                    transaction.Commit();
        //                }
        //                else
        //                {
        //                    transaction.Rollback();
        //                }
        //            }
        //            else
        //            {
        //                responseModel.Status = false;
        //                transaction.Rollback();
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction.Rollback();
        //    }
        //    return responseModel;
        //}
        public async Task<ResponseModel> CnorCneeGstSave(CnorCneeGstModel cnorCneeGstModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null)
                {
                    responseModel = await CnorCneeGstDelete(transaction, cnorCneeGstModel.CnorCneeID);
                    if (!responseModel.Status)
                    {
                        transaction.Rollback();
                    }
                    else
                    {
                        for (int i = 0; i < cnorCneeGstModel.cnorCneeGstDetail.Count; i++)
                        {

                            SqlParameter[] param =
                            {
                                new SqlParameter("@CnorCneeDetID" , cnorCneeGstModel.cnorCneeGstDetail[i].CnorCneeDetID ),
                             new SqlParameter("@CnorCneeID" , cnorCneeGstModel.cnorCneeGstDetail[i].CnorCneeID ),
                             new SqlParameter("@Location" , cnorCneeGstModel.cnorCneeGstDetail[i].Location ),
                             new SqlParameter("@Address1" , cnorCneeGstModel.cnorCneeGstDetail[i].Address1),
                             new SqlParameter("@Address2" , cnorCneeGstModel.cnorCneeGstDetail[i].Address2 ),
                             new SqlParameter("@Address3 " , cnorCneeGstModel.cnorCneeGstDetail[i].Address3  ),
                             new SqlParameter("@StateCode" , cnorCneeGstModel.cnorCneeGstDetail[i].StateCode  ),
                             new SqlParameter("@PinCode" , cnorCneeGstModel.cnorCneeGstDetail[i].PinCode ),
                             new SqlParameter("@GstNo" , cnorCneeGstModel.cnorCneeGstDetail[i].GstNo ),
                             new SqlParameter("@ContactPerson" , cnorCneeGstModel.cnorCneeGstDetail[i].ContactPerson ),
                             new SqlParameter("@MobileNo" , cnorCneeGstModel.cnorCneeGstDetail[i].MobileNo ),
                             new SqlParameter("@Email" , cnorCneeGstModel.cnorCneeGstDetail[i].Email ),
                            };
                            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ConsigneeCnorGstSave", param);

                            if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                            {
                                responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                                responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = cnorCneeGstModel.cnorCneeGstDetail.Count;
                                }
                            }
                            else
                            {
                                responseModel.Status = false;
                                transaction.Rollback();
                            }
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<CnorCneeGstList> GetCnorCneeGstList(PageRequest request)
        {
            CnorCneeGstList cnorCneeGstList = new();
            List<CnorCneeGstModel> gstList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber"  , request.PageNumber),
                            new SqlParameter("@PageSize"    , request.PageSize),
                            new SqlParameter("@SortColumn"  , request.SortColumn),
                            new SqlParameter("@SortOrder"   , request.SortOrder),
                            new SqlParameter("@Search"      , request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetConsigneeCnorGstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gstList.Add(new CnorCneeGstModel
                            {
                                //CnorCneeDetID = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCneeDetID"]),
                                //CnorCneeID = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCneeID"]),
                                //Location = Convert.ToString(dataSet.Tables[0].Rows[i]["Location"]),
                                //Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                //Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                //Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                //StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                //PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                //GstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GstNo"]),
                                //ContactPerson = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactPerson"]),
                                //MobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MobileNo"]),
                                //Email = Convert.ToString(dataSet.Tables[0].Rows[i]["Email"]),
                                //centrename = Convert.ToString(dataSet.Tables[0].Rows[i]["centrename"]),
                                //OLD_CnorCnee_ID = Convert.ToString(dataSet.Tables[0].Rows[i]["OLD_CnorCnee_ID"]),
                            });
                        }

                        cnorCneeGstList.GstList = gstList;

                        cnorCneeGstList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
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
            return cnorCneeGstList;
        }
        public async Task<CnorCneeGstModel> GetCnorCneeDtlList(RequestModel request)
        {
            CnorCneeGstModel cnorCneeGstModel = new();
            List<CnorCneeGstDetailModel> cnorCneeGstDetail = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@CnorCneeID", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCnorCneeDetails", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            cnorCneeGstDetail.Add(new CnorCneeGstDetailModel
                            {
                               

                               // CnorCneeDetID = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCneeDetID"]),
                                CnorCneeID = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCneeID"]),
                               Location = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                GstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GstNo"]),
                                ContactPerson = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactPerson1"]),
                                MobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile1"]),
                                Email = Convert.ToString(dataSet.Tables[0].Rows[i]["Email"]),
                              //  centrename = Convert.ToString(dataSet.Tables[0].Rows[i]["centrename"]),
                            });
                        }

                        cnorCneeGstModel.cnorCneeGstDetail = cnorCneeGstDetail;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return cnorCneeGstModel;
        }
        public async Task<ResponseModel> GetCnorCneeGstDelete(RequestModel request)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null)
                {
                    responseModel = await CnorCneeGstDelete(transaction, request.strRequest);
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<List<DropDownListModel>> GetCneeCnorList()
        {
            List<DropDownListModel> ccList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetCneeCnorListSelect", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            ccList.Add(new DropDownListModel
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
            return ccList;
        }
        public async Task<ResponseModel> CnorCneeGstDelete(SqlTransaction transaction, string req)
        {
            ResponseModel responseModel = new();


            try
                {
                    if (dbconnection != null)
                    {
                        SqlParameter[] param =
                        {
                        new SqlParameter("@CnorCneeID", req),
                    };
                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CnorCneeGstDelete", param);

                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                            responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        }
                        else
                        {
                            responseModel.Status = false;
                            transaction.Rollback();
                        }
                    }
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
                return responseModel;
            }
           
        }
    
}
