﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using DAL.Models;

namespace ScrumMaker
{
    public class EdmModelBuilder
    {
        private static IEdmModel _model;

        public static IEdmModel GetEdmModel()
        {
            if (_model == null)
            {
                var builder = new ODataConventionModelBuilder();
                builder.EntitySet<Sprint>("Sprints").EntityType.HasKey(s => s.Id);
                builder.EntitySet<SprintStagesHistory>("SprintStagesHistory").EntityType.HasKey(s => s.Id);
                builder.EntitySet<Team>("Teams").EntityType.HasKey(t => t.Id);
                builder.EntitySet<User>("Users").EntityType.HasKey(u => u.UserId);
                builder.EntitySet<Role>("Roles").EntityType.HasKey(r => r.RoleId);
                builder.EntitySet<Feature>("Feature").EntityType.HasKey(f => f.Id);
                builder.EntitySet<Story>("Stories").EntityType.HasKey(k => k.Id);
                builder.EntitySet<Defect>("Defects").EntityType.HasKey(k => k.DefectId);
                builder.EntitySet<ScrumTask>("Tasks").EntityType.HasKey(k => k.TaskId);
                builder.EntitySet<Calendar>("Calendar").EntityType.HasKey(c => c.CalendarId);
                builder.EntitySet<SprintReview>("SprintReview").EntityType.HasKey(k => k.Id);
                builder.EntitySet<DailyStandUp>("DailyStandUp").EntityType.HasKey(k => k.Id);
                _model = builder.GetEdmModel();
            }

            return _model;
        }
    }
}
