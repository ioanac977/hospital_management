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
        public async Task<Patient> GetPatient([FromRoute] int id)
        {

            return await _context.Patients.FindAsync(id);

        }
        public void AddPatient(Patient patient)
        {
            _context.Patients.Add(patient);
        }

        public void DeletePatient(Patient patient)
        {
            _context.Patients.Remove(patient);
        }

        public void SetEntityState(Patient patient, EntityState entityState)
        {
            _context.Entry(patient).State = entityState;
        }

        public async Task SaveChangesAsync()
        {
           await _context.SaveChangesAsync();
        }

        public bool PatientExists(int id)
        {
           return _context.Patients.Any(e => e.Id == id);
        }
        //_context.Patients.FindAsync(id);
    }
}
