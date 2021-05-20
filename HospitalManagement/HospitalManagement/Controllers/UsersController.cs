using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Data;
using HospitalManagement.Models;
using HospitalManagement.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("ReactPolicy")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService userService;

        public UsersController(HospitalContext context)
        {
            userService = new UserService(context);

        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public IEnumerable<User> GetUsers()
        {
            return userService.GetUsers();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userService.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("UserInfo/{id}")]
        public async Task<IActionResult> EditUserInfo([FromRoute] int id, [FromBody] UserInfo userInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = await userService.editUserAsync(userInfo,id);
            
            userService.SetEntityState(user, EntityState.Modified);

            try
            {
                await userService.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userService.UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            user.Password = userService.hashPassword(user.Password);
            userService.AddUser(user);
            await userService.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }

            userService.DeleteUser(user);
            await userService.SaveChangesAsync();

            return Ok(user);
        }
      

    }
}