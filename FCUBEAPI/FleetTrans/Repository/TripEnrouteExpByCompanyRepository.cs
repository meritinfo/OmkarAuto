using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public class TripEnrouteExpByCompanyRepository: ITripEnrouteExpByCompanyRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public TripEnrouteExpByCompanyRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> TripEnrouteExpByCompanySave(TripEnrouteExpByCompanyModel tripEnrouteExpByCompanyModel)
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
                    SqlParameter[] param =
                        {
                            new SqlParameter("@EnrouteExpId" , tripEnrouteExpByCompanyModel.EnrouteExpId ),
                            new SqlParameter("@VehicleID" , tripEnrouteExpByCompanyModel.VehicleID ),
                            new SqlParameter("@ExpBranch" , tripEnrouteExpByCompanyModel.ExpBranch ),
                            new SqlParameter("@ExpDate" , tripEnrouteExpByCompanyModel.ExpDate ),
                            new SqlParameter("@ExpId" , tripEnrouteExpByCompanyModel.ExpId  ),
                            new SqlParameter("@Remarks" , tripEnrouteExpByCompanyModel.Remarks ),
                            new SqlParameter("@ExpAmount" , tripEnrouteExpByCompanyModel.ExpAmount ),
                            new SqlParameter("@PmtType" , tripEnrouteExpByCompanyModel.PmtType ),
                            new SqlParameter("@CreditAc" , tripEnrouteExpByCompanyModel.CreditAc ),
                            new SqlParameter("@NeftYN" , tripEnrouteExpByCompanyModel.NeftYN  ),
                            new SqlParameter("@ChequeNo" , tripEnrouteExpByCompanyModel.ChequeNo ),
                            new SqlParameter("@ChequeDate" , tripEnrouteExpByCompanyModel.ChequeDate ),
                            new SqlParameter("@YearId" , tripEnrouteExpByCompanyModel.YearId ),
                            new SqlParameter("@LoggedInUser", tripEnrouteExpByCompanyModel.LoggedInUser),                           
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripEnrouteExpByCompanySave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
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
        public async Task<ResponseModel> TripEnrouteExpByCompanyDelete(RequestModel req)
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
                    SqlParameter[] param =
                        {
                            new SqlParameter("@EnrouteExpId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripEnrouteExpByCompanyDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
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
        public async Task<List<DropDownListModel>> GetExpTypeList()
        {
            List<DropDownListModel> expList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getExpList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            expList.Add(new DropDownListModel
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
            return expList;
        }
        public async Task<TripEnrouteExpByCompanyList> GetTripEnrouteExpByCompanyList(ReportRequestModel request)
        {
            TripEnrouteExpByCompanyList tripEnrouteExpByCompanyList = new();
            List<TripEnrouteExpByCompanyModel> companyList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@ExpId",     request.FilterStr),
                            new SqlParameter("@LoginBranch",    request.FilterStr1),
                            new SqlParameter("@VehicleMasterId",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripEnrouteExpByCompanyList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            companyList.Add(new TripEnrouteExpByCompanyModel
                            {
                                EnrouteExpId = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpId"]),
                                VehicleID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleID"]),
                                ExpBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpBranch"]),
                                ExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpDate"]),
                                ExpId = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpId"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ExpAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpAmount"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                NeftYN = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftYN"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                TripAdjYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripAdjYN"]),
                                FtmId = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmId"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                bname = Convert.ToString(dataSet.Tables[0].Rows[i]["bname"]),
                                exp = Convert.ToString(dataSet.Tables[0].Rows[i]["exp"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),



                            });
                        }

                        tripEnrouteExpByCompanyList.CompanyList = companyList;

                        tripEnrouteExpByCompanyList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tripEnrouteExpByCompanyList;
        }
    }


}
