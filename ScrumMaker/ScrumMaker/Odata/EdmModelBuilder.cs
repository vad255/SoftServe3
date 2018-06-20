using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using DAL.Models;

namespace ScrumMaker.Odata
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
                builder.EntitySet<SprintStagesHistory>("SprintStagesLog").EntityType.HasKey(s => s.Id);
                builder.EntitySet<Team>("Teams").EntityType.HasKey(t => t.Id);
                builder.EntitySet<User>("Users");
                
                _model = builder.GetEdmModel();
            }

            return _model;
        }
    }
}
