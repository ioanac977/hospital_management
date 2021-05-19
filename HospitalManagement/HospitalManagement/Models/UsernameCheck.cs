using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagement.Models
{
    public class UsernameCheck
    {
        [Required]
        [MinLength(3)]
        public string Username { get; set; }
    }
}
