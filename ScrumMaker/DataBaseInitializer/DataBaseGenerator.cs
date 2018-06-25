using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Access;
using Microsoft.EntityFrameworkCore;

namespace DataBaseInitializer
{
    public static class DataBaseGenerator
    {
        static DbContext _context;
        static IRepository<Role> _dbRoles;
        static IRepository<User> _dbUsers;
        static IRepository<Team> _dbTeams;
        static IRepository<DailyScrumInfo> _dbDailyInfo;
        static IRepository<Defect> _dbDefects;
        static IRepository<Story> _dbStories;
        static IRepository<ScrumTask> _dbTasks;
        static IRepository<Feature> _dbFeatures;
        static IRepository<SprintStagesHistory> _dbHisories;
        static IRepository<Sprint> _dbSprints;

        static Random _rand = new Random(1);


        static List<string> _names = new List<string>()
                {
                    "First", "Second", "Main", "Core", "TestName", "Poker", "Mouse", "Unicorns", "Party", "Movie"
                };

        // generated 
        public static void FillDataBase(DbContext context)
        {
            _context = context;

            FillRolesData();
            FillUsersData();
            FillTeamsData();
            FillDailyScrumData();
            FillDefectsData();
            FillStoriesData();
            FillTasksData();
            FillFeaturesData();
            FillSprintStagesData();
            FillSprintsData();
        }

        public static void FillRolesData()
        {
            _dbRoles = new Repository<Role>(_context);

            if (_dbRoles.GetAll().Count() == 0)
            {
                Role[] roles = new Role[]
                {
                    new Role() {Name = "Admin"},
                    new Role() {Name = "ScrumMaster"},
                    new Role() {Name = "User"},
                };

                foreach (var role in roles)
                {
                    _dbRoles.Create(role);
                }

                _dbRoles.Save();
            }
        }

        public static void FillUsersData()
        {
            _dbUsers = new Repository<User>(_context);

            if (_dbUsers.GetAll().Count() == 0)
            {
                User[] users = new User[]
                {
                    new User()
                    {
                        Role = _dbRoles.GetById(1),
                        Activity = true,
                        Login = "admin@gmail.com",
                        Password = "admin123"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(2),
                        Activity = true,
                        Login = "scrumMaster@gmail.com",
                        Password = "scrumMaster123"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "user@gmail.com",
                        Password = "user123"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "user@gmail.com",
                        Password = "user456"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "user@gmail.com",
                        Password = "user789"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "user@gmail.com",
                        Password = "user101"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "user@gmail.com",
                        Password = "user222"
                    },


                    new User()
                    {
                        Role = _dbRoles.GetById(1),
                        Activity = true,
                        Login = "hello@com",
                        Password = "admin123"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(2),
                        Activity = true,
                        Login = "scrumgmail.",
                        Password = "Master123"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(1),
                        Activity = true,
                        Login = "user@ukr.com",
                        Password = "321user123"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "ermailcom",
                        Password = "ffer456"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "usoFrm",
                        Password = "user789"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Worldmail.nom",
                        Password = "useror101"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "userator",
                        Password = "usrrr222"
                    },


                };

                foreach (var user in users)
                {
                    _dbUsers.Create(user);
                }

                _dbUsers.Save();
            }
        }


        public static void FillTeamsData()
        {

            _dbTeams = new Repository<Team>(_context);

            if (_dbTeams.GetAll().Count() != 0)
                return;


            List<User> users = _dbUsers.GetAll().ToList();


            List<Team> teams = new List<Team>();
            
            for (int i = 0; i < 4; i++)
            {
                var team = new Team()
                {
                    Name = _names[_rand.Next(_names.Count)],
                };
                teams.Add(team);

                var members = GetRandomCollection(users, _rand, 4, 8);
                foreach (var item in members)
                {
                    _dbUsers.GetById(item.UserId).Team = team;
                }    
            }
            foreach (var item in teams)
            {
                _dbTeams.Create(item);
            }

            _dbTeams.Save();
        }



        public static void FillDefectsData()
        {
            _dbDefects = new Repository<Defect>(_context);

            if (_dbDefects.GetAll().Count() == 0)
            {


                Defect[] defects = new Defect[]
                {
                    new Defect()
                    {
                        Description = "description",
                        ActualResults = "result",
                        Blocked = Blocked.No,
                        DefectName = "Defect Name",
                        AssignedTo = _dbUsers.GetById(5),
                        Priority = Priority.HighAttention
                        },
                    new Defect()
                    {
                        Description = "description2",
                        ActualResults = "result2",
                        Blocked = Blocked.No,
                        DefectName = "Defect Name2",
                        AssignedTo = _dbUsers.GetById(6),
                        Priority = Priority.Low
                    }
                };

                foreach (var defect in defects)
                {
                    _dbDefects.Create(defect);
                }

                _dbDefects.Save();
            }
        }


        public static void FillStoriesData()
        {
            _dbStories = new Repository<Story>(_context);
            if (_dbStories.GetAll().Count() == 0)
            {
                Story[] stories = new Story[]
                {
                    new Story()
                    {
                        Name = "StoryName",
                        Team = _dbTeams.GetById(1),
                        Description = "StoryDescription",
                        AssignedTo = _dbUsers.GetById(4),
                        Status = StoryStatus.InProgress,
                        Defects = _dbDefects.GetAll().ToList()
                    },
                    new Story()
                    {
                        Name = "StoryName1",
                        Team = _dbTeams.GetById(1),
                        Description = "StoryDescription",
                        AssignedTo = _dbUsers.GetById(3),
                        Status = StoryStatus.InProgress,
                        Defects = _dbDefects.GetAll().ToList()
                    },
                    new Story()
                    {
                        Name = "StoryName2",
                        Team = _dbTeams.GetById(1),
                        Description = "StoryDescription",
                        AssignedTo = _dbUsers.GetById(5),
                        Status = StoryStatus.InProgress,
                        Defects = _dbDefects.GetAll().ToList()
                    },
                    new Story()
                    { Name = "StoryName3",
                        Team = _dbTeams.GetById(1),
                        Description = "StoryDescription",
                        AssignedTo = _dbUsers.GetById(3),
                        Status = StoryStatus.InProgress,
                        Defects = _dbDefects.GetAll().ToList()
                    }
                };

                foreach (var story in stories)
                {
                    _dbStories.Create(story);
                }

                _dbStories.Save();
            }
        }


        public static void FillTasksData()
        {
            _dbTasks = new Repository<ScrumTask>(_context);
            if (_dbTasks.GetAll().Count() == 0)
            {


                ScrumTask[] tasks = new ScrumTask[]
                {
                    new ScrumTask()
                    {
                        Name = _dbStories.GetById(1),
                        Description = "TaskDescription",
                        AssignedTo = _dbUsers.GetById(2),
                        Blocked = "NO", ActualHours = 48,
                        PlannedHours = 72, RemainingHours = 96,
                        Type = "medium", State = "in progress",
                        WorkNotes = "This task should be done in 72 hours"
                    },
                    new ScrumTask()
                    {
                        Name = _dbStories.GetById(2),
                        Description = "TaskDescription",
                        AssignedTo = _dbUsers.GetById(3),
                        Blocked = "NO", ActualHours = 48,
                        PlannedHours = 72, RemainingHours = 96,
                        Type = "medium", State = "in progress",
                        WorkNotes = "This task should be done in 72 hours"
                    },
                    new ScrumTask()
                    {
                        Name = _dbStories.GetById(3),
                        Description = "TaskDescription",
                        AssignedTo = _dbUsers.GetById(4),
                        Blocked = "NO", ActualHours = 48,
                        PlannedHours = 72, RemainingHours = 96,
                        Type = "medium", State = "in progress",
                        WorkNotes = "This task should be done in 72 hours"
                    }
                };

                foreach (var task in tasks)
                {
                    _dbTasks.Create(task);
                }

                _dbTasks.Save();
            }
        }


        public static void FillFeaturesData()
        {
            _dbFeatures = new Repository<Feature>(_context);

            if (_dbFeatures.GetAll().Count() == 0)
            {


                Feature[] features = new Feature[]
                {
                    new Feature()
                    {
                        Description = "FeatureDescription",
                        Blocked = false, State = FeatureState.Accepted,
                        FeatureName = "Feature name",
                        Stories = _dbStories.GetAll().ToList()
                    },
                    new Feature()
                    {
                        Description = "FeatureDescription1",
                        Blocked = false, State = FeatureState.InProgress,
                        FeatureName = "Feature name1",
                        Stories = _dbStories.GetAll().ToList()
                    },
                    new Feature()
                    {
                        Description = "FeatureDescription2",
                        Blocked = false,
                        State = FeatureState.PendingApproval,
                        FeatureName = "Feature name2",
                        Stories = _dbStories.GetAll().ToList()
                    },
                    new Feature()
                    {
                        Description = "FeatureDescription3",
                        Blocked = false, State = FeatureState.TestComplete,
                        FeatureName = "Feature name3",
                        Stories = _dbStories.GetAll().ToList()
                    }
                };

                foreach (var feature in features)
                {
                    _dbFeatures.Create(feature);
                }

                _dbFeatures.Save();
            }
        }

        public static void FillSprintStagesData()
        {
            _dbHisories = new Repository<SprintStagesHistory>(_context);

            if (_dbHisories.GetAll().Count() == 0)
            {

                SprintStagesHistory[] sprintStagesHistories = new SprintStagesHistory[]
                {

                    new SprintStagesHistory()
                    {
                        Begined = DateTime.Today - new TimeSpan(10,0,0,0),
                        Planned =  DateTime.Today - new TimeSpan(30,0,0,0),
                        Initiated =  DateTime.Today - new TimeSpan(20,0,0,0),
                        RetrospectiveDone =  DateTime.Today + new TimeSpan(14,0,0,0),
                        ReviewDone =  DateTime.Today + new TimeSpan(10,0,0,0)
                    }
                };

                foreach (var sprintStagesHistory in sprintStagesHistories)
                {
                    _dbHisories.Create(sprintStagesHistory);
                }

                _dbHisories.Save();
            }
        }

        public static void FillSprintsData()
        {
            _dbSprints = new Repository<Sprint>(_context);

            if (_dbSprints.GetAll().Count() != 0)
                return;


            var teams = _dbTeams.GetAll().ToList();
            var logs = _dbHisories.GetAll().ToList();
            var defectsRep = _dbDefects.GetAll().ToList();
            var scrums = _dbDailyInfo.GetAll().ToList();
            var stories = _dbStories.GetAll().ToList();

            List<Sprint> sprints = new List<Sprint>();

            for (int i = 0; i < 20; i++)
            {
                var sprint = new Sprint()
                {
                    Team = teams[_rand.Next(teams.Count)],
                    Name = _names[_rand.Next(_names.Count)],
                    Retrospective = "Sprint Retrospective " + _names[_rand.Next(_names.Count)] + " " + _names[_rand.Next(_names.Count)],
                    Review = "Sprint Review" + _names[_rand.Next(_names.Count)] + " " + _names[_rand.Next(_names.Count)],
                    Stage = (SprintStage)_rand.Next(Enum.GetValues(typeof(SprintStage)).Length),
                    History = logs[_rand.Next(logs.Count)]
                };

                sprints.Add(sprint);
            }



            foreach (var sprint in sprints)
            {
                _dbSprints.Create(sprint);
            }

            _dbSprints.Save();

        }

        public static void FillDailyScrumData()
        {
            _dbDailyInfo = new Repository<DailyScrumInfo>(_context);
            _dbSprints = new Repository<Sprint>(_context);

            if (_dbDailyInfo.GetAll().Count() != 0)
                return;


            foreach (var item in _dbSprints.GetAll())
            {
                List<DailyScrumInfo> infos = new List<DailyScrumInfo>()
                {
                    new DailyScrumInfo()
                    {
                        Description = "DailyDescription1",
                        Сonducted = DateTime.Now - new TimeSpan(48,0,0)
                    },
                    new DailyScrumInfo()
                    {
                        Description = "DailyDescription2",
                        Сonducted = DateTime.Now - new TimeSpan(24,0,0)
                    },
                    new DailyScrumInfo()
                    {
                        Description = "DailyDescription3",
                        Сonducted = DateTime.Now
                    }

                };
                item.DailyScrums = infos;
            }
            
            _dbSprints.Save();
            
        }

        static List<T> GetRandomCollection<T>(IEnumerable<T> source, Random rand, int minElems, int maxElems)
        {
            List<T> result = new List<T>(source);
            result.Sort((a, b) => rand.Next(3) - 1);
            return result.GetRange(0, minElems + rand.Next(maxElems - minElems));
        }
    }
}
