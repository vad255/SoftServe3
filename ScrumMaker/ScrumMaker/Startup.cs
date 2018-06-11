using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.AspNetCore.Http;
using System.Text;
using DAL;
using DAL.Access;
using DAL.Access.IRepositoryImplementation;
using DAL.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace ScrumMaker
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
            string connectionStr = Configuration.GetConnectionString("Default");
            //connectionStr = "Server=.\\SQLEXPRESS;Database=ScrumMaker;Trusted_Connection=True;MultipleActiveResultSets=true";
            services.AddDbContext<DAL.DataContext>(options => options.UseSqlServer(connectionStr, b => b.UseRowNumberForPaging()));
            services.AddScoped(typeof(DbContext), typeof(DAL.DataContext));
            services.AddScoped(typeof(IRepository<>),typeof(Repository<>));
            //services.Configure<DatabaseOptions>(Configuration.GetSection("Data:Default"));

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
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

            app.UseStaticFiles();

            app.Use(async (context, next) =>
            {
                var color = ConsoleColor.DarkMagenta;
                Write("Hello from 1st MW", color);
                await next.Invoke();
                Write("Goodbye from 1st MW", color);

            });



            app.Use(async (context, next) =>
            {
                var color = ConsoleColor.DarkCyan;
                Write("Hello from 2nt MW", color);
                await next.Invoke();
                Write("Goodbye from 2nd MW", color);

            });


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

        }

        private static void Write(string message, ConsoleColor color = ConsoleColor.Gray)
        {
            lock (typeof(Console))
            {
                var temp = Console.ForegroundColor;

                Console.ForegroundColor = color;
                Console.WriteLine(message);
                Console.ForegroundColor = temp;
            }

        }


    }
}
