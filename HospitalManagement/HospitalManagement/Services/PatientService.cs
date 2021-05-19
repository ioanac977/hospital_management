using HospitalManagement.Data;
using HospitalManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HospitalManagement.Services
{
    public class PatientService
    {
        private readonly HospitalContext _context;

        public PatientService(HospitalContext context)
        {
            _context = context;
        }
        public IEnumerable<Patient> GetPatients()
        {
            return _context.Patients;
        }
 
    }
}
