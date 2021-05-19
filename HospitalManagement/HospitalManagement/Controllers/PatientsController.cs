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
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("ReactPolicy")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly PatientService patientService;

        public PatientsController(HospitalContext context)
        {
            patientService = new PatientService(context);
            
        }

        // GET: api/Patients
        [HttpGet]
        public IEnumerable<Patient> GetPatients()
        {
            return  patientService.GetPatients();
        }


    }
}