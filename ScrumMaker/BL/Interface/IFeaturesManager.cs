using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BL
{
    public interface IFeaturesManager
    {
        IQueryable<Feature> GetAll();
        Feature Get(int id);
        void Update(Feature feature);
        void Create(Feature feature);
        void Delete(int id);
    }
}
