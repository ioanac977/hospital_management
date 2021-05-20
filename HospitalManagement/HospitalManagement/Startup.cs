using System;
using HospitalManagement.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HospitalManagement
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
        {  //Add Db Context
            services.AddDbContext<HospitalContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //Add Authentication Cookie
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
               .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
               {
                   options.SlidingExpiration = true;
                   options.ExpireTimeSpan = new TimeSpan(1, 0, 0);
               });
            //Add Authorization 
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireClaim("IsAdmin","True"));
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            //Enable CORS for development use  
            services.AddCors(o => o.AddPolicy("ReactPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            }));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseMvc();
            app.UseAuthentication();


            app.UseCors("ReactPolicy");
        }
    }
}
