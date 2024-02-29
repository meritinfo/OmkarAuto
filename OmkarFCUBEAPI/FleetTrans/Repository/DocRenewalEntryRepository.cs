using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetTrans.Repository
{
    public class DocRenewalEntryRepository : IDocRenewalEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DocRenewalEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save Branch master details
        /// </summary>
        /// <param name=" DocRenewalEntry"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocRenewalEntryId"   , docRenewalEntryModel.DocRenewalEntryId),
                            new SqlParameter("@TransDate"           , docRenewalEntryModel.TransDate),
                            new SqlParameter("@DocRenewalID"        , docRenewalEntryModel.DocRenewalID),
                            new SqlParameter("@VehicleMasterID"     , docRenewalEntryModel.VehicleMasterID),
                            new SqlParameter("@DocumentRefNo"       , docRenewalEntryModel.DocumentRefNo),
                            new SqlParameter("@RenewalCompany"      , docRenewalEntryModel.RenewalCompany),
                            new SqlParameter("@ValidFromDt"         , docRenewalEntryModel.ValidFromDt),
                            new SqlParameter("@ValidToDt"           , docRenewalEntryModel.ValidToDt),
                            new SqlParameter("@BasicAmt"            , docRenewalEntryModel.BasicAmt),
                            new SqlParameter("@SgstPct"             , docRenewalEntryModel.SgstPct),
                            new SqlParameter("@SgstAmt"             , docRenewalEntryModel.SgstAmt),
                            new SqlParameter("@CgstPct"             , docRenewalEntryModel.CgstPct),
                            new SqlParameter("@CgstAmt"             , docRenewalEntryModel.CgstAmt),
                            new SqlParameter("@IgstPct"             , docRenewalEntryModel.IgstPct),
                            new SqlParameter("@IgstAmt"             , docRenewalEntryModel.IgstAmt),
                            new SqlParameter("@HsnCode1"            , docRenewalEntryModel.HsnCode1),
                            new SqlParameter("@BasicAmt2"           , docRenewalEntryModel.BasicAmt2),
                            new SqlParameter("@SgstPct2"            , docRenewalEntryModel.SgstPct2),
                            new SqlParameter("@SgstAmt2"            , docRenewalEntryModel.SgstAmt2),
                            new SqlParameter("@CgstPct2"            , docRenewalEntryModel.CgstPct2),
                            new SqlParameter("@CgstAmt2"            , docRenewalEntryModel.CgstAmt2),
                            new SqlParameter("@IgstPct2"            , docRenewalEntryModel.IgstPct2),
                            new SqlParameter("@IgstAmt2"            , docRenewalEntryModel.IgstAmt2),
                            new SqlParameter("@HsnCode2"            , docRenewalEntryModel.HsnCode2),
                            new SqlParameter("@NonGstAmount"        , docRenewalEntryModel.NonGstAmount),
                            new SqlParameter("@NonGstAmtDesc"       , docRenewalEntryModel.NonGstAmtDesc),
                            new SqlParameter("@SubTotal"            , docRenewalEntryModel.SubTotal),
                            new SqlParameter("@RoundOff"            , docRenewalEntryModel.RoundOff),
                            new SqlParameter("@NetAmount"           , docRenewalEntryModel.NetAmount),
                            new SqlParameter("@PmtType"             , docRenewalEntryModel.PmtType),
                            new SqlParameter("@CreditAc"            , docRenewalEntryModel.CreditAc),
                            new SqlParameter("@NeftPmt"             , docRenewalEntryModel.NeftPmt=="true"?"Y":"N"),
                            new SqlParameter("@ChequeNo"            , docRenewalEntryModel.ChequeNo),
                            new SqlParameter("@ChequeDt"            , docRenewalEntryModel.ChequeDt),
                            new SqlParameter("@FinDocID"            , docRenewalEntryModel.FinDocID),
                            new SqlParameter("@Attach1"             , docRenewalEntryModel.Attach1),
                            new SqlParameter("@Attach2"             , docRenewalEntryModel.Attach2),
                            new SqlParameter("@Remarks"             , docRenewalEntryModel.Remarks),
                            new SqlParameter("@BranchCode"          , docRenewalEntryModel.BranchCode),
                            new SqlParameter("@YearID"              , docRenewalEntryModel.YearID),
                            new SqlParameter("@LoggedInUser"        , docRenewalEntryModel.LoggedInUser),
                         
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DocRenewalEntryDetailsSave", param);

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
                //Log exception on database
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

        public async Task<ResponseModel> DocRenewalEntryDetailsDelete(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocRenewalEntryId",request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DocRenewalEntryDetailsDelete", param);

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
                //Log exception on database
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
        /// Service method for get branch list
        /// </summary>
        /// <returns>List<BranchListModel></returns>
        public async Task<DocRenewalEntryList> GetDocRenewalEntryList(PageRequest request)
        {
            DocRenewalEntryList docRenewalEntryList = new();
            List<DocRenewalEntryModel> docRenewalList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalEntryList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            docRenewalList.Add(new DocRenewalEntryModel
                            {
                                DocRenewalEntryId   = Convert.ToString(dataSet.Tables[0].Rows[i]["DocRenewalEntryId"]),
                                TransDate           = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                DocRenewalID        = Convert.ToString(dataSet.Tables[0].Rows[i]["DocRenewalID"]),
                                DocDescription      = Convert.ToString(dataSet.Tables[0].Rows[i]["DocDescription"]),
                                VehicleMasterID     = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterID"]),
                                VehicleNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DocumentRefNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["DocumentRefNo"]),
                                RenewalCompany      = Convert.ToString(dataSet.Tables[0].Rows[i]["RenewalCompany"]),
                                ValidFromDt         = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFromDt"]),
                                ValidToDt           = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidToDt"]),
                                BasicAmt            = Convert.ToString(dataSet.Tables[0].Rows[i]["BasicAmt"]),
                                SgstPct             = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt             = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct             = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt             = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct             = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt             = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                HsnCode1            = Convert.ToString(dataSet.Tables[0].Rows[i]["HsnCode1"]),
                                BasicAmt2           = Convert.ToString(dataSet.Tables[0].Rows[i]["BasicAmt2"]),
                                SgstPct2            = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct2"]),
                                SgstAmt2            = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt2"]),
                                CgstPct2            = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct2"]),
                                CgstAmt2            = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt2"]),
                                IgstPct2            = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct2"]),
                                IgstAmt2            = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt2"]),
                                HsnCode2            = Convert.ToString(dataSet.Tables[0].Rows[i]["HsnCode2"]),
                                NonGstAmount        = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmount"]),
                                NonGstAmtDesc       = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmtDesc"]),
                                SubTotal            = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotal"]),
                                RoundOff            = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                NetAmount           = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                PmtType             = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                CreditAc            = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                NeftPmt             = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                ChequeNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDt            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDt"]),
                                FinDocID            = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocID"]),
                                Attach1             = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach1"]),
                                Attach2             = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach2"]),
                                Remarks             = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                BranchCode          = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID              = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
       
                            });
                        }

                        docRenewalEntryList.docRenewalList = docRenewalList;

                        docRenewalEntryList.PageMetaData = new PaginationMetaData
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
            return docRenewalEntryList;
        }

        public async Task<List<DropDownListModel>> GetDocRenewalList()
        {
            List<DropDownListModel> DebitAcList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            DebitAcList.Add(new DropDownListModel
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
            return DebitAcList;
        }
        public async Task<List<DropDownListModel>> GetPaymentCreditAcList(RequestModel request)
        {
            List<DropDownListModel> creditacList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@PType", request.strRequest),
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPaymentCreditAcList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }

        public async Task<ResponseModel> ChkDocrenewalValidity(DocRenewalEntryModel docRenewalEntryModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterID"     , docRenewalEntryModel.VehicleMasterID),
                            new SqlParameter("@ValidFromDt"         , docRenewalEntryModel.ValidFromDt),
                            new SqlParameter("@ValidToDt"           , docRenewalEntryModel.ValidToDt),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkDocrenewalValidity", param);

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
                //Log exception on database
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


    }
}
