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

namespace OmkarFCUBEAPI
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
            //services.AddScoped<IDriverSalaryStatementRepository, DriverSalaryStatementRepository>();
            //  services.AddScoped<IDriverSalaryStatementBusiness, DriverSalaryStatementBusiness>();
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
            services.AddScoped<IRoleMasterBusiness, RoleMasterBusiness>();
            services.AddScoped<IRoleMasterRepository, RoleMasterRepository>();
            services.AddScoped<IHrMasterBusiness, HrMasterBusiness>();
            services.AddScoped<IHrMasterRepository, HrMasterRepository>();
            services.AddScoped<IPtSlabMasterBusiness, PtSlabMasterBusiness>();
            services.AddScoped<IPtSlabmasterRepository, PtSlabmasterRepository>();
            services.AddScoped<IMenuFormTypesBusiness, MenuFormTypesBusiness>();
            services.AddScoped<IMenuFormTypesRepository, MenuFormTypesRepository>();
            services.AddScoped<IHRMasterBusiness, HRMasterBusiness>();
            services.AddScoped<IHRMasterRepository, HRMasterRepository>();
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
            services.AddScoped<IDocRenewalEntryRepository, DocRenewalEntryRepository>();
            services.AddScoped<IDocRenewalEntryBusiness, DocRenewalEntryBusiness>();
            services.AddScoped<ITripMasterRepository, TripMasterRepository>();
            services.AddScoped<ITripMasterBusiness, TripMasterBusiness>();
            services.AddScoped<IDieselStatementRepository, DieselStatementRepository>();
            services.AddScoped<IDieselStatementBusiness, DieselStatementBusiness>(); 
            services.AddScoped<IBillStatementRepository, BillStatementRepository>();
            services.AddScoped<IBillStatementBusiness, BillStatementBusiness>();
            services.AddScoped<IEwayBillRepository, EwayBillRepository>();
            services.AddScoped<IEwayBillBusiness, EwayBillBusiness>();
            services.AddScoped<IRolePrivilegesRepository, RolePrivilegesRepository>();
            services.AddScoped<IRolePrivilegesBusiness, RolePrivilegesBusiness>();

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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "OmkarFCUBEAPI", Version = "v1" });
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
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OmkarFCUBEAPI v1"));
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
