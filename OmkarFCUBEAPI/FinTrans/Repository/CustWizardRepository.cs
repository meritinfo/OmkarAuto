using FinTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Repository
{
    public class CustWizardRepository: ICustWizardRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CustWizardRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<CustWizardList> GetCustWizardList(PageRequest request)
        {
            CustWizardList custWizardList = new();
            List<CustWizardModel> custList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CustWizardList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            custList.Add(new CustWizardModel
                            {
                                Custwizid = Convert.ToString(dataSet.Tables[0].Rows[i]["Custwizid"]),
                                CashAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CashAc"]),

                                HsdAc = Convert.ToString(dataSet.Tables[0].Rows[i]["HsdAc"]),
                                TripRoutExpAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripRoutExpAc"]),
                                TripRepairsAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripRepairsAc"]),

                                TripParkingAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripParkingAc"]),

                                TripMChallanAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripMChallanAc"]),
                                TripWeighmentAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripWeighmentAc"]),
                                TripAccidentAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripAccidentAc"]),
                                TripTollAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTollAc"]),
                                TripOthersMiscAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripOthersMiscAc"]),
                                TripDrAlAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TripDrAlAc"]),
                                DelayDamageAc = Convert.ToString(dataSet.Tables[0].Rows[i]["DelayDamageAc"]),
                                SgstInputAc = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstInputAc"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),



                            });
                        }

                        custWizardList.CustList = custList;

                        custWizardList.PageMetaData = new PaginationMetaData
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
            return custWizardList;
        }
    
    public async Task<ResponseModel> CustWizardSave(CustWizardModel custWizardModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Custwizid", custWizardModel.Custwizid),
                            new SqlParameter("@CashAc", custWizardModel.CashAc),
                            new SqlParameter("@HsdAc", custWizardModel.HsdAc),
                            new SqlParameter("@TripRoutExpAc", custWizardModel.TripRoutExpAc),
                            new SqlParameter("@TripRepairsAc", custWizardModel.TripRepairsAc),
                            new SqlParameter("@TripParkingAc", custWizardModel.TripParkingAc),
                            new SqlParameter("@TripMChallanAc", custWizardModel.TripMChallanAc),
                            new SqlParameter("@TripWeighmentAc", custWizardModel.TripWeighmentAc),
                            new SqlParameter("@TripAccidentAc", custWizardModel.TripAccidentAc),
                            new SqlParameter("@TripTollAc", custWizardModel.TripTollAc),
                            new SqlParameter("@TripOthersMiscAc", custWizardModel.TripOthersMiscAc),
                            new SqlParameter("@TripDrAlAc", custWizardModel.TripDrAlAc),
                            new SqlParameter("@DelayDamageAc", custWizardModel.DelayDamageAc),
                            new SqlParameter("@SgstInputAc", custWizardModel.SgstInputAc),
                            new SqlParameter("@CgstInputAc", custWizardModel.CgstInputAc),
                            new SqlParameter("@FastagTollAc", custWizardModel.FastagTollAc),
                            new SqlParameter("@HappayAc", custWizardModel.HappayAc),
                            new SqlParameter("@DriverPoolAc", custWizardModel.DriverPoolAc),
                            new SqlParameter("@DriverSalAc", custWizardModel.DriverSalAc),
                            new SqlParameter("@FrtIncAc", custWizardModel.FrtIncAc),
                         // new SqlParameter("@LoggedInUser", custWizardModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CustWizard_Insert", param);

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
    }
}
