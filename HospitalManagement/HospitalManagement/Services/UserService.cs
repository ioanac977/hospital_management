using HospitalManagement.Data;
using HospitalManagement.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;


namespace HospitalManagement.Services
{
    public class UserService
    {
        private readonly HospitalContext _context;

        public UserService(HospitalContext context)
        {
            _context = context;
        }
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }
        public async Task<User> GetUser([FromRoute] int id)
        {

            return await _context.Users.FindAsync(id);

        }
        public void AddUser(User user)
        {
            _context.Users.Add(user);
        }

        public void DeleteUser(User user)
        {
            _context.Users.Remove(user);

            //List<User> toBeDeleted = _context.Users.Where(e => e.Id > 8).ToList();

            //_context.Users.RemoveRange(toBeDeleted);
           
        }

        public void SetEntityState(User user, EntityState entityState)
        {
            _context.Entry(user).State = entityState;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        public string hashPassword(string password, byte[] salt = null, bool needsOnlyHash = false)
        {
            if (salt == null || salt.Length != 16)
            {
                // generate a 128-bit salt using a secure PRNG
                salt = new byte[128 / 8];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(salt);
                }
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            if (needsOnlyHash) return hashed;
            // password will be concatenated with salt using ':'
            return $"{hashed}:{Convert.ToBase64String(salt)}";
        }

        public async Task<User> editUserAsync(UserInfo userInfo,int id)
        {
            User user = await GetUser(id);
            if (userInfo?.Password != null)
            {
                user.Password = hashPassword(userInfo.Password, null, false);
            }
            else
            {
                user.Name = userInfo.Name;
                user.Username = userInfo.Username;
                user.IsAdmin = userInfo.IsAdmin;

            }
            return user;
        }

        public bool VerifyPassword(string hashedPasswordWithSalt, string passwordToCheck)
        {
            // retrieve both salt and password from 'hashedPasswordWithSalt'
            var passwordAndHash = hashedPasswordWithSalt.Split(':');
            if (passwordAndHash == null || passwordAndHash.Length != 2)
                return false;
            var salt = Convert.FromBase64String(passwordAndHash[1]);
            if (salt == null)
                return false;
            // hash the given password
            var hashOfpasswordToCheck = hashPassword(passwordToCheck, salt, true);
            // compare both hashes
            if (String.Compare(passwordAndHash[0], hashOfpasswordToCheck) == 0)
            {
                return true;
            }
            return false;
        }
    }
}
