using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BL
{
    public class FeaturesManager: IFeaturesManager
    {
        public IUnitOfWork _unit;

        public FeaturesManager(IUnitOfWork uof)
        {
            _unit = uof;
        }

        public void Create(Feature feature)
        {
            _unit.Features.Create(feature);
            _unit.Commit();
        }

        public void Delete(int id)
        {
            _unit.Features.Delete(id);
            _unit.Commit();
        }

        public Feature Get(int id)
        {
            return _unit.Features.GetById(id);
        }

        public IQueryable<Feature> GetAll()
        {
            return _unit.Features.GetAll();
        }

        public void Update(Feature feature)
        {
            _unit.Features.Update(feature);
            _unit.Commit();
            UpdateFeatureStories(feature);
        }

        private void UpdateFeatureStories(Feature featureWithStories)
        {
            foreach (var story in featureWithStories.Stories)
            {
                story.Feature = featureWithStories;
                _unit.Stories.Update(story);
            }

            _unit.Commit();
        }
    }
}
