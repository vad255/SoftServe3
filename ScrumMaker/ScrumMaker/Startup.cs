using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.OData.Edm;

using DAL;
using DAL.Access;
using DAL.Models;
using ScrumMaker.Controllers.Chatting;
using BL;
using BL.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using BL.Chart;
using Microsoft.Extensions.FileProviders;
using System.IO;
using BL.Interface;

namespace ScrumMaker
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddAuthentication(x =>
            {
                x.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                x.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                x.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = AuthOptions.ISSUER,
                    ValidateAudience = true,
                    ValidAudience = AuthOptions.AUDIENCE,
                    ValidateLifetime = true,
                    IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true
                };
            });

            string connectionStr = Configuration.GetConnectionString("Viktor");


            services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionStr, b => b.UseRowNumberForPaging()));


            ConfigureDI(services);

            services.AddOData();

            services.AddMvc().
                // Represent enums in Json as string
                AddJsonOptions(options =>
                {
                    options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                    options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
                }).
                SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSignalR();

            services.AddDistributedMemoryCache();
            services.AddSession();

            services.AddSingleton<IFileProvider>(
                new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")));

        }

        private static void ConfigureDI(IServiceCollection services)
        {
            services.AddScoped(typeof(DbContext), typeof(DataContext));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped(typeof(ISprintManager), typeof(SprintManager));
            services.AddScoped(typeof(IFeaturesManager), typeof(FeaturesManager));
            services.AddScoped(typeof(IDefectsManager), typeof(DefectsManager));
            services.AddScoped(typeof(IUserManager), typeof(UserManager));
            services.AddScoped(typeof(ITasksManager), typeof(TasksManager));
            services.AddScoped(typeof(IStoriesManager), typeof(StoriesManager));
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped(typeof(ITeamsManager), typeof(TeamsManager));
            services.AddScoped(typeof(IChartManager), typeof(ChartManager));
            services.AddScoped(typeof(ISprintReviewManager), typeof(SprintReviewManager));
            services.AddScoped(typeof(BL.Chatting.IGlobalChatManager), typeof(BL.Chatting.GlobalChatManager));
            services.AddScoped(typeof(BL.Chatting.IRetrospectiveChatMananger), typeof(BL.Chatting.RetrospectiveChatManager));
            services.AddScoped(typeof(BL.Chatting.IPokerManager), typeof(BL.Chatting.PokerManager));

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSession();


            app.LoadTokenDataToContext();
            app.UseAuthentication();


            app.UseSignalR(routes =>
            {
                routes.MapHub<GlobalChat>("/chat");
                routes.MapHub<RetrospectiveHub>("/retrospective/chat");
                routes.MapHub<PokerHub>("/pokerRoom");

            });

            app.UseMvc(routes =>
            {
                routes.Select().Expand().Filter().OrderBy().MaxTop(100).Count();

                routes.MapODataServiceRoute("odata", "odata", EdmModelBuilder.GetEdmModel());
                
                ///!!!!
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

        }
    }
}
