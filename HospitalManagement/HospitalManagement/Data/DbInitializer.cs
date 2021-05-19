﻿using HospitalManagement.Models;
using HospitalManagement.Services;
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

            //InitializePatientTable(context);
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
            UserService userService = new UserService(context);

            String hashedPassword = userService.hashPassword("00001", null, false);
            var users = new User[]
            {
              
            new User{Username="Carson",Password=hashedPassword,Name = "ABC",IsAdmin = false},
            new User{Username="Meredith",Password=hashedPassword,Name = "ABC",IsAdmin = false},
            new User{Username="Arturo",Password=hashedPassword,Name = "ABC",IsAdmin = true},
            new User{Username="Gytis",Password=hashedPassword,Name = "ABC",IsAdmin = false},
            new User{Username="Yan",Password=hashedPassword,Name = "ABC",IsAdmin = false},
            new User{Username="Peggy",Password=hashedPassword,Name = "ABC",IsAdmin = false},
            new User{Username="Laura",Password=hashedPassword,Name = "ABC",IsAdmin = false},
            new User{Username="Nino",Password=hashedPassword,Name = "ABC",IsAdmin = false}
            };
            foreach (User u in users)
            {
                context.Users.Add(u);
            }
            //InitializeUserTable(context);
            context.SaveChanges();



        }
    }
}
