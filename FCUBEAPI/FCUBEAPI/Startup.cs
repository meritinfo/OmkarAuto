using AdminMasters.Business;
using AdminMasters.Repository;
using FleetMasters.Business;
using FleetMasters.Repository;
using FleetTrans.Business;
using FleetTrans.Repository;
using Consignment.Business;
using Consignment.Repository;
using FinanceMasters.Business;
using FinanceMasters.Repository;
using HRMasters.Business;
using HRMasters.Repository;
using FinTrans.Business;
using FinTrans.Repository;
using FreightMasters.Business;
using FreightMasters.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Shared.Business;
using Shared.Repository;
using SqlHelper.Models;
using System.Text;
using AdminMasters.Models;
using FinanceMaster.Repository;
using FinanceMaster.Business;
using FreightMasters.Models;

namespace FCUBEAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors();
            services.AddControllers();
            services.Configure<DBModel>(Configuration.GetSection("ConnectionStrings"));
            services.Configure<GSTConfigurationModel>(Configuration.GetSection("GSTConfiguration"));
            services.AddScoped<ISharedBusiness, SharedBusiness>();
            services.AddScoped<ISharedRepository, SharedRepository>();
            services.AddScoped<IDestinationMasterBusiness, DestinationMasterBusiness>();
            services.AddScoped<IDestinationMasterRepository, DestinationMasterRepository>();
            services.AddScoped<IDriverSalaryStmtRepository, DriverSalaryStmtRepository>();
            services.AddScoped<IDriverSalaryStmtBusiness, DriverSalaryStmtBusiness>();
            services.AddScoped<IFinAccountsMasterBusiness, FinAccountsMasterBusiness>();
            services.AddScoped<IFinAccountsMasterRepository, FinAccountsMasterRepository>();
            services.AddScoped<IFinGroupMasterBusiness, FinGroupMasterBusiness>();
            services.AddScoped<IFinGroupMasterRepository, FinGroupMasterRepository>();
            services.AddScoped<IOpBrsEntryBusiness, OpBrsEntryBusiness>();
            services.AddScoped<IOpBrsEntryRepository, OpBrsEntryRepository>();
            services.AddScoped<IOpeningBalanceMasterBusiness, OpeningBalanceMasterBusiness>();
            services.AddScoped<IOpeningBalanceMasterRepository, OpeningBalanceMasterRepository>();
            services.AddScoped<IConsignmentBusiness, ConsignmentBusiness>();
            services.AddScoped<IConsignmentRepository, ConsignmentRepository>();
            services.AddScoped<IChequeAllotmentDtlBusiness, ChequeAllotmentDtlBusiness>();
            services.AddScoped<IChequeAllotmentDtlRepository, ChequeAllotmentDtlRepository>();
            services.AddScoped<IChequeAllotmentMstBusiness, ChequeAllotmentMstBusiness>();
            services.AddScoped<IChequeAllotmentMstRepository, ChequeAllotmentMstRepository>();
            services.AddScoped<IDocRenewalMasterBusiness, DocRenewalMasterBusiness>();
            services.AddScoped<IDocRenewalMasterRepository, DocRenewalMasterRepository>();
            services.AddScoped<IBrandMasterBusiness, BrandMasterBusiness>();
            services.AddScoped<IBrandMasterRepository, BrandMasterRepository>();
            services.AddScoped<IFreightRatesMstBusiness, FreightRatesMstBusiness>();
            services.AddScoped<IFreightRatesMstRepository, FreightRatesMstRepository>();
            services.AddScoped<IDriverMasterRepository, DriverMasterRepository>();
            services.AddScoped<IDriverMasterBusiness, DriverMasterBusiness>();
            services.AddScoped<IExpensesTypeMasterRepository, ExpensesTypeMasterRepository>();
            services.AddScoped<IExpensesTypeMasterBusiness, ExpensesTypeMasterBusiness>();
            services.AddScoped<IDistanceMasterFrtRepository, DistanceMasterFrtRepository>();
            services.AddScoped<IDistanceMasterFrtBusiness, DistanceMasterFrtBusiness>();
            services.AddScoped<IDistanceMasterTripRepository, DistanceMasterTripRepository>();
            services.AddScoped<IDistanceMasterTripBusiness, DistanceMasterTripBusiness>();
            services.AddScoped<ICashReceiptPaymentsBusiness, CashReceiptPaymentsBusiness>();
            services.AddScoped<ICashReceiptPaymentsRepository, CashReceiptPaymentsRepository>();
            services.AddScoped<IGstPurchaseMstRepository, GstPurchaseMstRepository>();
            services.AddScoped<IGstPurchaseMstBusiness, GstPurchaseMstBusiness>();
            services.AddScoped<IBankReconcilationRepository, BankReconcilationRepository>();
            services.AddScoped<IBankReconcilationBusiness, BankReconcilationBusiness>();
            services.AddScoped<IBillStatementRepository, BillStatementRepository>();
            services.AddScoped<IBillStatementBusiness, BillStatementBusiness>();
            services.AddScoped<IBillsTypeRepository, BillsTypeRepository>();
            services.AddScoped<IBillsTypeBusiness, BillsTypeBusiness>();
            services.AddScoped<ISparesLubesMasterRepository, SparesLubesMasterRepository>();
            services.AddScoped<ISparesLubesMasterBusiness, SparesLubesMasterBusiness>();
            services.AddScoped<ITyreModelRepository, TyreModelRepository>();
            services.AddScoped<ITyreModelBusiness, TyreModelBusiness>();
            services.AddScoped<IRoleMasterBusiness, RoleMasterBusiness>();
            services.AddScoped<IRoleMasterRepository, RoleMasterRepository>();
            services.AddScoped<IHrMasterBusiness, HrMasterBusiness>();
            services.AddScoped<IHrMasterRepository, HrMasterRepository>();
            services.AddScoped<IPtSlabMasterBusiness, PtSlabMasterBusiness>();
            services.AddScoped<IPtSlabmasterRepository, PtSlabmasterRepository>();
            services.AddScoped<IMenuFormTypesBusiness, MenuFormTypesBusiness>();
            services.AddScoped<IMenuFormTypesRepository, MenuFormTypesRepository>();
            services.AddScoped<IEmpMasterBusiness, EmpMasterBusiness>();
            services.AddScoped<IEmpMasterRepository, EmpMasterRepository>();
            services.AddScoped<IFinScheduleMasterBusiness, FinScheduleMasterBusiness>();
            services.AddScoped<IFinScheduleMasterRepository, FinScheduleMasterRepository>();
            services.AddScoped<IProductGroupMasterRepository, ProductGroupMasterRepository>();
            services.AddScoped<IBranchMasterBusiness, BranchMasterBusiness>();
            services.AddScoped<IBranchMasterRepository, BranchMasterRepository>();
            services.AddScoped<IFleetCardMasterBusiness, FleetCardMasterBusiness>();
            services.AddScoped<IFleetCardMasterRepository, FleetCardMasterRepository>();
            services.AddScoped<IProductGroupMasterBusiness, ProductGroupMasterBusiness>();
            services.AddScoped<IVehicleTypeGroupMasterRepository, VehicleTypeGroupMasterRepository>();
            services.AddScoped<IVehicleTypeGroupMasterBusiness, VehicleTypeGroupMasterBusiness>();
            services.AddScoped<IVehicleTypeMasterRepository, VehicleTypeMasterRepository>();
            services.AddScoped<IVehicleTypeMasterBusiness, VehicleTypeMasterBusiness>();
            services.AddScoped<IVehicleFltMasterRepository, VehicleFltMasterRepository>();
            services.AddScoped<IVehicleFltMasterBusiness, VehicleFltMasterBusiness>();
            services.AddScoped<IProductMasterRepository, ProductMasterRepository>();
            services.AddScoped<IProductMasterBusiness, ProductMasterBusiness>();
            services.AddScoped<IClassificationMasterRepository, ClassificationMasterRepository>();
            services.AddScoped<IClassificationMasterBusiness, ClassificationMasterBusiness>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserBusiness, UserBusiness>();
            services.AddScoped<ILR_Bill_SeriesRepository, LR_Bill_SeriesRepository>();
            services.AddScoped<ILR_Bill_SeriesBusiness, LR_Bill_SeriesBusiness>();
            services.AddScoped<ITyrePositionMasterRepository, TyrePositionMasterRepository>();
            services.AddScoped<ITyrePositionMasterBusiness, TyrePositionMasterBusiness>();
            services.AddScoped<IRatetypesRepository, RatetypesRepository>();
            services.AddScoped<IRatetypesBusiness, RatetypesBusiness>();
            services.AddScoped<IConsigneeMasterRepository, ConsigneeMasterRepository>();
            services.AddScoped<IConsigneeMasterBusiness, ConsigneeMasterBusiness>();
            services.AddScoped<ITripPaymentsRepository, TripPaymentsRepository>();
            services.AddScoped<ITripPaymentsBusiness, TripPaymentsBusiness>();
            services.AddScoped<ICustWizardRepository, CustWizardRepository>();
            services.AddScoped<ICustWizardBusiness, CustWizardBusiness>();
            services.AddScoped<IDocRenewalEntryRepository, DocRenewalEntryRepository>();
            services.AddScoped<IDocRenewalEntryBusiness, DocRenewalEntryBusiness>();
            services.AddScoped<ITripMasterRepository, TripMasterRepository>();
            services.AddScoped<ITripMasterBusiness, TripMasterBusiness>();
            services.AddScoped<ITruckMasterRepository, TruckMasterRepository>();
            services.AddScoped<ITruckMasterBusiness, TruckMasterBusiness>();
            services.AddScoped<ITransportMasterRepository, TransportMasterRepository>();
            services.AddScoped<ITransportMasterBusiness, TransportMasterBusiness>();
            services.AddScoped<IDieselStatementRepository, DieselStatementRepository>();
            services.AddScoped<IDieselStatementBusiness, DieselStatementBusiness>(); 
            services.AddScoped<IBillStatementRepository, BillStatementRepository>();
            services.AddScoped<IBillStatementBusiness, BillStatementBusiness>();
            services.AddScoped<IEwayBillRepository, EwayBillRepository>();
            services.AddScoped<IEwayBillBusiness, EwayBillBusiness>();
            services.AddScoped<IRolePrivilegesRepository, RolePrivilegesRepository>();
            services.AddScoped<IRolePrivilegesBusiness, RolePrivilegesBusiness>();
            services.AddScoped<IExpTruckArrRptRepository, ExpTruckArrRptRepository>();
            services.AddScoped<IExpTruckArrRptBusiness, ExpTruckArrRptBusiness>();
            services.AddScoped<IDocRenewalRptRepository, DocRenewalRptRepository>();
            services.AddScoped<IDocRenewalRptBusiness, DocRenewalRptBusiness>();
            services.AddScoped<ITripPaymentsRptRepository, TripPaymentsRptRepository>();
            services.AddScoped<ITripPaymentsRptBusiness, TripPaymentsRptBusiness>();
            services.AddScoped<ITripStatusRptRepository, TripStatusRptRepository>();
            services.AddScoped<ITripStatusRptBusiness, TripStatusRptBusiness>();
            services.AddScoped<IDieselStatementRptRepository, DieselStatementRptRepository>();
            services.AddScoped<IDieselStatementRptBusiness, DieselStatementRptBusiness>();
            services.AddScoped<IDistanceMasterFrtRptRepository, DistanceMasterFrtRptRepository>();
            services.AddScoped<IDistanceMasterFrtRptBusiness, DistanceMasterFrtRptBusiness>();
            services.AddScoped<IDistanceMasterTripRptRepository, DistanceMasterTripRptRepository>();
            services.AddScoped<IDistanceMasterTripRptBusiness, DistanceMasterTripRptBusiness>();
            services.AddScoped<IDriverLicRptBusiness, DriverLicRptBusiness>();
            services.AddScoped<IDriverLicRptRepository, DriverLicRptRepository>();
            services.AddScoped<IGstSalesRegisterRptRepository, GstSalesRegisterRptRepository>();
            services.AddScoped<IGstSalesRegisterRptBusiness, GstSalesRegisterRptBusiness>();
            services.AddScoped<IEmpSalaryBusiness, EmpSalaryBusiness>();
            services.AddScoped<IEmpSalaryRepository, EmpSalaryRepository>();
            services.AddScoped<IVehiEmiBusiness, VehiEmiBusiness>();
            services.AddScoped<IVehiEmiRepository, VehiEmiRepository>();
            services.AddScoped<ILoanBusiness, LoanBusiness>();
            services.AddScoped<ILoanRepository, LoanRepository>();
            services.AddScoped<IEmpSalaryCalcBusiness, EmpSalaryCalcBusiness>();
            services.AddScoped<IEmpSalaryCalcRepository, EmpSalaryCalcRepository>();
            services.AddScoped<IDailyLoadingRptBusiness, DailyLoadingRptBusiness>();
            services.AddScoped<IDailyLoadingRptRepository, DailyLoadingRptRepository>();
            services.AddScoped<ILedgerRptBusiness, LedgerRptBusiness>();
            services.AddScoped<ILedgerRptRepository, LedgerRptRepository>();
            services.AddScoped<IBankBookRptBusiness, BankBookRptBusiness>();
            services.AddScoped<IBankBookRptRepository, BankBookRptRepository>();
            services.AddScoped<IEwayBillExpRptBusiness, EwayBillExpRptBusiness>();
            services.AddScoped<IEwayBillExpRptRepository, EwayBillExpRptRepository>();
            services.AddScoped<IDprBusiness, DprBusiness>();
            services.AddScoped<IDprRepository, DprRepository>();
            services.AddScoped<IDeliveryAckPodBusiness, DeliveryAckPodBusiness>();
            services.AddScoped<IDeliveryAckPodRepository, DeliveryAckPodRepository>();
            services.AddScoped<IChallanMasterBusiness, ChallanMasterBusiness>();
            services.AddScoped<IChallanMasterRepository, ChallanMasterRepository>();
            services.AddScoped<IBillsMasterBusiness, BillsMasterBusiness>();
            services.AddScoped<IBillsMasterRepository, BillsMasterRepository>();
            services.AddScoped<IDprVehiPlacedBusiness, DprVehiPlacedBusiness>();
            services.AddScoped<IDprVehiPlacedRepository, DprVehiPlacedRepository>();
            services.AddScoped<IGenerateTempGcBusiness, GenerateTempGcBusiness>();
            services.AddScoped<IGenerateTempGcRepository, GenerateTempGcRepository>();
            services.AddScoped<IPayGenerationBusiness, PayGenerationBusiness>();
            services.AddScoped<IPayGenerationRepository, PayGenerationRepository>();
            services.AddScoped<IPaySheetRptBusiness, PaySheetRptBusiness>();
            services.AddScoped<IPaySheetRptRepository, PaySheetRptRepository>();
            services.AddScoped<IDocumentAllotmentBusiness, DocumentAllotmentBusiness>();
            services.AddScoped<IDocumentAllotmentRepository, DocumentAllotmentRepository>();
            services.AddScoped<ILorryHireBusiness, LorryHireBusiness>();
            services.AddScoped<ILorryHireRepository, LorryHireRepository>();
            services.AddScoped<ILorryHireReqBusiness, LorryHireReqBusiness>();
            services.AddScoped<ILorryHireReqRepository, LorryHireReqRepository>();
            services.AddScoped<ILorryHireAprvBusiness, LorryHireAprvBusiness>();
            services.AddScoped<ILorryHireAprvRepository, LorryHireAprvRepository>();
            services.AddScoped<IMaintanenceMasterBusiness, MaintanenceMasterBusiness>();
            services.AddScoped<IMaintanenceMasterRepository, MaintanenceMasterRepository>();
            services.AddScoped<ITyrePurchaseMasterBusiness, TyrePurchaseMasterBusiness>();
            services.AddScoped<ITyrePurchaseMasterRepository, TyrePurchaseMasterRepository>();
            services.AddScoped<ITyreActivateMasterBusiness, TyreActivateMasterBusiness>();
            services.AddScoped<ITyreActivateMasterRepository, TyreActivateMasterRepository>();
            services.AddScoped<ITyreDeActivateMasterBusiness, TyreDeActivateMasterBusiness>();
            services.AddScoped<ITyreDeActivateMasterRepository, TyreDeActivateMasterRepository>();
            services.AddScoped<ITyreRegroupIssueMasterBusiness, TyreRegroupIssueMasterBusiness>();
            services.AddScoped<ITyreRegroupIssueMasterRepository, TyreRegroupIssueMasterRepository>();
            services.AddScoped<ITyreRegroupRecdMasterBusiness, TyreRegroupRecdMasterBusiness>();
            services.AddScoped<ITyreRegroupRecdMasterRepository, TyreRegroupRecdMasterRepository>();
            services.AddScoped<IBalanceBusiness, BalanceBusiness>();
            services.AddScoped<IBalanceRepository, BalanceRepository>();
            services.AddScoped<IVehicleInstPmtBusiness, VehicleInstPmtBusiness>();
            services.AddScoped<IVehicleInstPmtRepository, VehicleInstPmtRepository>();
            services.AddScoped<ICompanyInfoBusiness, CompanyInfoBusiness>();
            services.AddScoped<ICompanyInfoRepository, CompanyInfoRepository>();
            services.AddScoped<IMrBusiness, MrBusiness>();
            services.AddScoped<IMrRepository, MrRepository>();
            services.AddScoped<IVehiEmiBusiness, VehiEmiBusiness>();
            services.AddScoped<IVehiEmiRepository, VehiEmiRepository>();
            services.AddScoped<IFleetLoadEntryBusiness, FleetLoadEntryBusiness>();
            services.AddScoped<IFleetLoadEntryRepository, FleetLoadEntryRepository>();
            services.AddScoped<ITyreSalesMasterBusiness, TyreSalesMasterBusiness>();
            services.AddScoped<ITyreSalesMasterRepository, TyreSalesMasterRepository>();
            services.AddScoped<IVehicleRepMaintMasterBusiness, VehicleRepMaintMasterBusiness>();
            services.AddScoped<IVehicleRepMaintMasterRepository, VehicleRepMaintMasterRepository>();
            services.AddScoped<ILhpmSlabMasterBusiness, LhpmSlabMasterBusiness>();
            services.AddScoped<ILhpmSlabMasterRepository, LhpmSlabMasterRepository>();
            services.AddScoped<ISparesPurchaseMasterBusiness, SparesPurchaseMasterBusiness>();
            services.AddScoped<ISparesPurchaseMasterRepository, SparesPurchaseMasterRepository>();
            services.AddScoped<ITripExpTypeBusiness, TripExpTypeBusiness>();
            services.AddScoped<ITripExpTypeRepository, TripExpTypeRepository>();
            services.AddScoped<IBookingRegisterRptBusiness, BookingRegisterRptBusiness>();
            services.AddScoped<IBookingRegisterRptRepository, BookingRegisterRptRepository>();
            services.AddScoped<ILRWithOutChallanRptBusiness, LRWithOutChallanRptBusiness>();
            services.AddScoped<ILRWithOutChallanRptRepository, LRWithOutChallanRptRepository>();
            services.AddScoped<IUnBilledRptBusiness, UnBilledRptBusiness>();
            services.AddScoped<IUnBilledRptRepository, UnBilledRptRepository>();
            services.AddScoped<ITyreMgntRptBusiness, TyreMgntRptBusiness>();
            services.AddScoped<ITyreMgntRptRepository, TyreMgntRptRepository>();
            services.AddScoped<IVehicleAdvBalReceiptMstBusiness, VehicleAdvBalReceiptMstBusiness>();
            services.AddScoped<IVehicleAdvBalReceiptMstRepository, VehicleAdvBalReceiptMstRepository>();
            services.AddScoped<IChallanRegisterRptBusiness, ChallanRegisterRptBusiness>();
            services.AddScoped<IChallanRegisterRptRepository, ChallanRegisterRptRepository>();
            services.AddScoped<ISparesPurchaseRptBusiness, SparesPurchaseRptBusiness>();
            services.AddScoped<ISparesPurchaseRptRepository, SparesPurchaseRptRepository>();
            services.AddScoped<IChallanRegisterRptBusiness, ChallanRegisterRptBusiness>();
            services.AddScoped<IChallanRegisterRptRepository, ChallanRegisterRptRepository>();
            services.AddScoped<ILhPayableStatusRptBusiness, LhPayableStatusRptBusiness>();
            services.AddScoped<ILhPayableStatusRptRepository, LhPayableStatusRptRepository>();
            services.AddScoped<IVehicleRepairsRptBusiness, VehicleRepairsRptBusiness>();
            services.AddScoped<IVehicleRepairsRptRepository, VehicleRepairsRptRepository>();
            services.AddScoped<IBillRegisterRptBusiness, BillRegisterRptBusiness>();
            services.AddScoped<IBillRegisterRptRepository, BillRegisterRptRepository>();
            services.AddScoped<IMRRegisterRptBusiness, MRRegisterRptBusiness>();
            services.AddScoped<IMRRegisterRptRepository, MRRegisterRptRepository>();
            services.AddScoped<IBeneficiaryMasterBusiness, BeneficiaryMasterBusiness>();
            services.AddScoped<IBeneficiaryMasterRepository, BeneficiaryMasterRepository>();
            services.AddScoped<ILHPMVarianceRptBusiness, LHPMVarianceRptBusiness>();
            services.AddScoped<ILHPMVarianceRptRepository, LHPMVarianceRptRepository>();
            services.AddScoped<IGSTRegisterRptBusiness, GSTRegisterRptBusiness>();
            services.AddScoped<IGSTRegisterRptRepository, GSTRegisterRptRepository>();
            services.AddScoped<ICnorCneeGstBusiness, CnorCneeGstBusiness>();
            services.AddScoped<ICnorCneeGstRepository, CnorCneeGstRepository>();
            services.AddScoped<IDieselStmtRptBusiness, DieselStmtRptBusiness>();
            services.AddScoped<IDieselStmtRptRepository, DieselStmtRptRepository>();
            services.AddScoped<IExpenseBudgetsBusiness, ExpenseBudgetsBusiness>();
            services.AddScoped<IExpenseBudgetsRepository, ExpenseBudgetsRepository>();
            services.AddScoped<IMonthlyStatementsBusiness, MonthlyStatementsBusiness>();
            services.AddScoped<IMonthlyStatementsRepository, MonthlyStatementsRepository>();
            services.AddScoped<IPartyGroupMasterBusiness, PartyGroupMasterBusiness>();
            services.AddScoped<IPartyGroupMasterRepository, PartyGroupMasterRepository>();
            services.AddScoped<IVehicleFrtOutstandingRptBusiness, VehicleFrtOutstandingRptBusiness>();
            services.AddScoped<IVehicleFrtOutstandingRptRepository, VehicleFrtOutstandingRptRepository>();
            services.AddScoped<ILHExtraPmtReconRptBusiness, LHExtraPmtReconRptBusiness>();
            services.AddScoped<ILHExtraPmtReconRptRepository, LHExtraPmtReconRptRepository>();
            services.AddScoped<ISubLedgerMasterBusiness, SubLedgerMasterBusiness>();
            services.AddScoped<ISubLedgerMasterRepository, SubLedgerMasterRepository>();
            services.AddScoped<ITripOutstandingRptRepository, TripOutstandingRptRepository>();
            services.AddScoped<ITripOutstandingRptBusiness, TripOutstandingRptBusiness>();
            services.AddScoped<IBillSubmitMstBusiness, BillSubmitMstBusiness>();
            services.AddScoped<IBillSubmitMstRepository, BillSubmitMstRepository>();
            services.AddScoped<IAdditionalCostRecMasterBusiness, AdditionalCostRecMasterBusiness>();
            services.AddScoped<IAdditionalCostRecMasterRepository, AdditionalCostRecMasterRepository>();
            services.AddScoped<IBillOutstandingRptBusiness, BillOutstandingRptBusiness>();
            services.AddScoped<IBillOutstandingRptRepository, BillOutstandingRptRepository>();
            services.AddScoped<ILRCostingRptBusiness, LRCostingRptBusiness>();
            services.AddScoped<ILRCostingRptRepository, LRCostingRptRepository>();
            services.AddScoped<ITripSummaryRptRepository, TripSummaryRptRepository>();
            services.AddScoped<ITripSummaryRptBusiness, TripSummaryRptBusiness>();
            services.AddScoped<IOnAccountMRStatusRptBusiness, OnAccountMRStatusRptBusiness>();
            services.AddScoped<IOnAccountMRStatusRptRepository, OnAccountMRStatusRptRepository>();
            services.AddScoped<IAddCostRecBusiness, AddCostRecBusiness>();
            services.AddScoped<IAddCostRecRepository, AddCostRecRepository>();
            services.AddScoped<IFastTagBusiness, FastTagBusiness>();
            services.AddScoped<IFastTagRepository, FastTagRepository>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["Jwt:Audience"],
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FCUBEAPI", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FCUBEAPI v1"));
            //}

            app.UseCors(builder => builder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed((host) => true)
            .AllowCredentials());

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
