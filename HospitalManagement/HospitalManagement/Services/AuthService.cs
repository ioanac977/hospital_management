using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalManagement.Data;
using HospitalManagement.Models;

namespace HospitalManagement.Services
{
    public class AuthService
    {
        private HospitalContext context;

        public AuthService(HospitalContext context)
        {
            this.context = context;
        }

        public bool checkCredentials(String username, String password)
        {
            return context.Users.Any(e => e.Username == username && e.Password == password);
        }
        public User getAuthUser(String username, String password)
        {
          
            return context.Users.Where(e => e.Username == username && e.Password == password).Single();

        }
    }
}
