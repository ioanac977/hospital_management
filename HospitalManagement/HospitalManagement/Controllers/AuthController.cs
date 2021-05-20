using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HospitalManagement.Data;
using HospitalManagement.Models;
using HospitalManagement.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("ReactPolicy")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService userService;
        private readonly AuthService authService;

        public AuthController(HospitalContext context)
        {
            userService = new UserService(context);
            authService = new AuthService(context);

        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody]User userDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            userService.AddUser(userDetails);
            await userService.SaveChangesAsync();


            return Ok(new { Message = "User Registration Successful" });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody]UserCredentials credentials)
        {

            User authUser = authService.getAuthUser(credentials.Username);
           
            if (authUser == null)
                return new BadRequestObjectResult(new { Message = "Login failed" });

            var isPasswordValid = userService.VerifyPassword(authUser.Password, credentials.Password);

            if (!isPasswordValid)
                return new BadRequestObjectResult(new { Message = "Login failed" });

            var userClaim = new List<Claim> { new Claim("IsAdmin", authUser.IsAdmin.ToString())};
          

            var claimsIdentity = new ClaimsIdentity(
                userClaim, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));

            return Ok(authUser);
        }

        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { Message = "You are logged out" });
        }

        [HttpPost]
        [Route("CheckUsername")]
        public IActionResult CheckIfUsernameIsUnique([FromBody] UsernameCheck account)
        {

            return Ok(authService.checkUsername(account.Username));
        }

    }
}