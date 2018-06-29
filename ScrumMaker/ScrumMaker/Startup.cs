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
using BL;
using BL.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

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
            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,options=> {
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

            string connectionStr = Configuration.GetConnectionString("Pasha");


            services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionStr, b => b.UseRowNumberForPaging()));
            services.AddScoped(typeof(DbContext), typeof(DataContext));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped(typeof(ISprintManager), typeof(SprintManager));
            services.AddScoped(typeof(IFeaturesManager), typeof(FeaturesManager));
            services.AddScoped(typeof(IDefectsManager), typeof(DefectsManager));
            services.AddScoped(typeof(IUserManager), typeof(UserManager));
            services.AddScoped(typeof(ITasksManager), typeof(TasksManager));
            services.AddScoped(typeof(IStoriesManager), typeof(StoriesManager));

            services.AddOData();

            services.AddMvc().
                // Represent enums in Json as string
                AddJsonOptions(options =>
                {
                    options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                    options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                }).
                //for OData
                SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
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

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.Select().Expand().Filter().OrderBy().MaxTop(100).Count();

                routes.MapODataServiceRoute("odata", "odata", EdmModelBuilder.GetEdmModel());

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
