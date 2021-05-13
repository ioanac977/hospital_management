using HospitalManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagement.Data
{
    public class DbInitializer
    {
        public static void Initialize(HospitalContext context)
        {
            context.Database.EnsureCreated();

            // Look for any 
            if (context.Patients.Any())
            {
                return;   // DB has been seeded
            }

            var patients = new Patient[]
            {
            new Patient{Name="Carson",DateOfBirth=DateTime.Parse("2005-09-01"),Hospital = "ABC"},
            new Patient{Name="Meredith",DateOfBirth=DateTime.Parse("2002-09-01"),Hospital = "ABC"},
            new Patient{Name="Arturo",DateOfBirth=DateTime.Parse("2003-09-01"),Hospital = "ABC"},
            new Patient{Name="Gytis",DateOfBirth=DateTime.Parse("2002-09-01"),Hospital = "ABC"},
            new Patient{Name="Yan",DateOfBirth=DateTime.Parse("2002-09-01"),Hospital = "ABC"},
            new Patient{Name="Peggy",DateOfBirth=DateTime.Parse("2001-09-01"),Hospital = "ABC"},
            new Patient{Name="Laura",DateOfBirth=DateTime.Parse("2003-09-01"),Hospital = "ABC"},
            new Patient{Name="Nino",DateOfBirth=DateTime.Parse("2005-09-01"),Hospital = "ABC"}
            };
            foreach (Patient p in patients)
            {
                context.Patients.Add(p);
            }
            context.SaveChanges();

        }
    }
}
