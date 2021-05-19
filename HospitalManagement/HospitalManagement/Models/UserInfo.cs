using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagement.Models
{
    public class UserInfo
    {

        [MinLength(3)]
        public string Username { get; set; }
 
        [MinLength(3)]
        public string Name { get; set; }

        [MinLength(3)]
        public string Password { get; set; }

        public bool IsAdmin { get; set; }
    }
}
