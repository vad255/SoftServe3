using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public static void FillDataBase(DbContext context)
        {
            _context = context;

            FillRolesData();
            ShowStatus(10);
            FillUsersData();
            ShowStatus(20);
            FillTeamsData();
            ShowStatus(30);
            FillDailyScrumData();
            ShowStatus(40);
            FillDefectsData();
            ShowStatus(50);
            FillStoriesData();
            ShowStatus(60);
            FillTasksData();
            ShowStatus(70);
            FillFeaturesData();
            ShowStatus(80);
            FillSprintStagesData();
            ShowStatus(90);
            FillSprintsData();
            ShowStatus(100);
        }

        public static void FillRolesData()
        {
            _dbRoles = new Repository<Role>(_context);


            Role[] roles = new Role[]
            {
                    new Role() {Name = "Admin"},
                    new Role() {Name = "ScrumMaster"},
                    new Role() {Name = "User"},
            };

            AddToDatabase(roles, _dbRoles);
        }

        public static void FillUsersData()
        {
            _dbUsers = new Repository<User>(_context);

            User[] users = new User[]
            {
                    new User()
                    {
                        Role = _dbRoles.GetById(1),
                        Activity = true,
                        Login = "admin",
                        Password = "admin"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(1),
                        Activity = true,
                        Login = "Ivan.Nesterenko@gmail.com",
                        Password = "INadmin2018"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(2),
                        Activity = true,
                        Login = "Oleksandr.Petrov@gmail.com",
                        Password = "OPscrumMaster13"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Nataliya.Kozachenko@ukr.net",
                        Password = "uSdsger74"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Viktor.Andrushenko@mail.ru",
                        Password = "gnfdA456"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Mykola.Kropyvnytskiy@gmail.com",
                        Password = "usfmf1243"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Yuriy.Savchuk@gmail.com",
                        Password = "uerthQQr101"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Roman.Danylenko@gmail.com",
                        Password = "vzsd234D2"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Anastasiya.Zelenska@gmail.com",
                        Password = "vGHlhD2"
                    },


                    new User()
                    {
                        Role = _dbRoles.GetById(2),
                        Activity = true,
                        Login = "Andriy.Herula@com",
                        Password = "xdsfhgin123"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Ihor.Verbenets@ukr.net",
                        Password = "M4ybfrh"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Iryna.Revus@mail.ru",
                        Password = "321usgm56667"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Myhailo.Andruchvych@gmail.com",
                        Password = "ffer456"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Maksym.Pereima@mail.ru",
                        Password = "user789"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Oleg.Mykytyn@gmail.com",
                        Password = "bxcdfn4564QW"
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Ulyana.Nazaruk@mail.ru",
                        Password = "qwerty222"
                    },
                new User()
                {
                    Role = _dbRoles.GetById(2),
                    Activity = true,
                    Login = "Andriy.Herula@com",
                    Password = "xdsfhgin123"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ihor.Verbenets@ukr.net",
                    Password = "M4ybfrh"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Iryna.Revus@mail.ru",
                    Password = "321usgm56667"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Myhailo.Andruchvych@gmail.com",
                    Password = "ffer456"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Maksym.Pereima@mail.ru",
                    Password = "user789"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Oleg.Mykytyn@gmail.com",
                    Password = "bxcdfn4564QW"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ulyana.Nazaruk@mail.ru",
                    Password = "qwerty222"
                },
                new User()
                {
                    Role = _dbRoles.GetById(2),
                    Activity = true,
                    Login = "Andriy.Herula@com",
                    Password = "xdsfhgin123"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ihor.Verbenets@ukr.net",
                    Password = "M4ybfrh"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Iryna.Revus@mail.ru",
                    Password = "321usgm56667"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Myhailo.Andruchvych@gmail.com",
                    Password = "ffer456"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Maksym.Pereima@mail.ru",
                    Password = "user789"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Oleg.Mykytyn@gmail.com",
                    Password = "bxcdfn4564QW"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ulyana.Nazaruk@mail.ru",
                    Password = "qwerty222"
                },
                new User()
                {
                    Role = _dbRoles.GetById(2),
                    Activity = true,
                    Login = "Andriy.Herula@com",
                    Password = "xdsfhgin123"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ihor.Verbenets@ukr.net",
                    Password = "M4ybfrh"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Iryna.Revus@mail.ru",
                    Password = "321usgm56667"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Myhailo.Andruchvych@gmail.com",
                    Password = "ffer456"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Maksym.Pereima@mail.ru",
                    Password = "user789"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Oleg.Mykytyn@gmail.com",
                    Password = "bxcdfn4564QW"
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ulyana.Nazaruk@mail.ru",
                    Password = "qwerty222"
                }
            };

            AddToDatabase(users, _dbUsers);
        }

        public static void FillTeamsData()
        {

            _dbTeams = new Repository<Team>(_context);

            Team[] teams = new Team[]
            {
                new Team()
                {
                    Name = "ScrumMakerTeam",
                    Members = _dbUsers.GetAll().Where(u => u.UserId >= 2 && u.UserId <= 8).ToList()
                },
                new Team()
                {
                  Name  = "LP-1Team",
                  Members = _dbUsers.GetAll().Where(u => u.UserId >= 9 && u.UserId <= 15).ToList()
                },
                new Team()
                {
                    Name  = "LV-234Team",
                    Members = _dbUsers.GetAll().Where(u => u.UserId >= 16 && u.UserId <= 22).ToList()
                },
                new Team()
                {
                    Name  = "LV-123Team",
                    Members = _dbUsers.GetAll().Where(u => u.UserId >= 23 && u.UserId <= 29).ToList()
                },
                new Team()
                {
                    Name  = "LV-441Team",
                    Members = _dbUsers.GetAll().Where(u => u.UserId >= 30 && u.UserId <= 36).ToList()
                }
            };

            AddToDatabase(teams, _dbTeams);
        }

        public static void FillDefectsData()
        {
            _dbDefects = new Repository<Defect>(_context);

            Defect[] defects = new Defect[]
            {
                    new Defect()
                    {
                        Description = "The button doesn't work while clicking",
                        ActualResults = "almost done",
                        FixResults = "button has to work",
                        Blocked = Blocked.No,
                        DefectName = "Broken button 'Send'",
                        AssignedTo = _dbUsers.GetById(2),
                        Priority = DefectPriority.HighAttention,
                        State = DefectState.Active,
                        Status = DefectStatus.Open
                    },
                    new Defect()
                    {
                        Description = "Searching by name doesn't work correctly in Story Table",
                        ActualResults = "in process",
                        Blocked = Blocked.No,
                        DefectName = "Bug in Serach input",
                        AssignedTo = _dbUsers.GetById(3),
                        Priority = DefectPriority.Normal,
                        State = DefectState.InWork,
                        Status = DefectStatus.Open,
                        FixResults = "fixed result"
                        },
                    new Defect()
                {
                    Description = "when gotten all data teable doesn't show it correctly",
                    ActualResults = "result",
                    Blocked = Blocked.No,
                    DefectName = "TableSprintBug",
                    AssignedTo = _dbUsers.GetById(4),
                    Priority = DefectPriority.Normal,
                    State = DefectState.Postponed,
                    Status = DefectStatus.Open,
                    FixResults = "still fixing"
                    },
                new Defect()
                {
                    Description = "some problems with getting data from database",
                    ActualResults = "in process",
                    Blocked = Blocked.No,
                    DefectName = "Getting data bug",
                    AssignedTo = _dbUsers.GetById(5),
                    Priority = DefectPriority.ResolveImmediately,
                    State = DefectState.PendingTest,
                    Status = DefectStatus.Open,
                    FixResults = "fixed"

                },
                new Defect()
                {
                    Description = "Link in navigation menu desn't redirect to home page",
                    ActualResults = "in process",
                    Blocked = Blocked.No,
                    DefectName = "Link to home page is not working",
                    AssignedTo = _dbUsers.GetById(6),
                    Priority = DefectPriority.HighAttention,
                    State = DefectState.PendingTest,
                    Status = DefectStatus.Open,
                    FixResults = "still fixing"

                },
                new Defect()
                {
                    Description = "it's possible to insert an email that doesn't match the sample",
                    ActualResults = "in process",
                    Blocked = Blocked.No,
                    DefectName = "checking email",
                    AssignedTo = _dbUsers.GetById(7),
                    Priority = DefectPriority.Low,
                    State = DefectState.Active,
                    Status = DefectStatus.Open,
                    FixResults = "fixing"

                },
                new Defect()
                {
                    Description = "the width of input is too small.",
                    ActualResults = "in process",
                    Blocked = Blocked.No,
                    DefectName = "too small input",
                    AssignedTo = _dbUsers.GetById(8),
                    Priority = DefectPriority.HighAttention,
                    State = DefectState.Active,
                    Status = DefectStatus.Open,
                    FixResults = "fixing"

                },
                new Defect()
                {
                    Description = "The tax calculator gives wrong avarage result.",
                    ActualResults = "in process",
                    Blocked = Blocked.No,
                    DefectName = "wrong avarage result",
                    AssignedTo = _dbUsers.GetById(9),
                    Priority = DefectPriority.Low,
                    State = DefectState.Postponed,
                    Status = DefectStatus.Open,
                    FixResults = "fixing"

                },
                new Defect()
                {
                    Description = "While starting an app, the main windows doesn't show all members correctly.",
                    ActualResults = "almost finished",
                    Blocked = Blocked.No,
                    DefectName = "Main windows not showing all members",
                    AssignedTo = _dbUsers.GetById(10),
                    Priority = DefectPriority.Normal,
                    State = DefectState.Fixed,
                    Status = DefectStatus.Close,
                    FixResults = "fixed"

                },
                new Defect()
                {
                    Description = "Dont have a response when clicking on the Clients button",
                    ActualResults = "in process",
                    Blocked = Blocked.No,
                    DefectName = "Response getting bug",
                    AssignedTo = _dbUsers.GetById(11),
                    Priority = DefectPriority.Low,
                    State = DefectState.InWork,
                    Status = DefectStatus.Open,
                    FixResults = "fixing"

                },
                new Defect()
                {
                    Description = "the app doesn't insert data in the database when adding a new Client",
                    ActualResults = "in rocess",
                    Blocked = Blocked.No,
                    DefectName = "data saving problem",
                    AssignedTo = _dbUsers.GetById(12),
                    Priority = DefectPriority.ResolveImmediately,
                    State = DefectState.PendingTest,
                    Status = DefectStatus.Open,
                    FixResults = "fixing"
                },
                new Defect()
                {
                    Description = "Buttons don't change a color when pointing by mouse",
                    ActualResults = "some result",
                    Blocked = Blocked.No,
                    DefectName = "buttons don't change the color",
                    AssignedTo = _dbUsers.GetById(13),
                    Priority = DefectPriority.Low,
                    State = DefectState.Active,
                    Status = DefectStatus.Open,
                    FixResults = "fixing"
                },
                new Defect()
                {
                    Description = "Add bootstrap styles for tables",
                    ActualResults = "result",
                    Blocked = Blocked.No,
                    DefectName = "girid styles",
                    AssignedTo = _dbUsers.GetById(14),
                    Priority = DefectPriority.HighAttention,
                    State = DefectState.Fixed,
                    Status = DefectStatus.Close,
                    FixResults = "fixed"

                },
                new Defect()
                {
                    Description = "there is some bug with Home controller",
                    ActualResults = "",
                    Blocked = Blocked.No,
                    DefectName = "can't get an Index view",
                    AssignedTo = _dbUsers.GetById(15),
                    Priority = DefectPriority.Low,
                    State = DefectState.Active,
                    Status = DefectStatus.Open,
                    FixResults = "fixing"
                }
            };

            AddToDatabase(defects, _dbDefects);
        }

        public static void FillStoriesData()
        {
            _dbStories = new Repository<Story>(_context);

            Story[] stories = new Story[]
            {
                    new Story()
                    {
                        Name = "Grids",
                        Team = _dbTeams.GetById(1),
                        Description = "create grids for all models. Each grid should have columns described in the model. Also add bootstrap styles",
                        AssignedTo = _dbUsers.GetById(2),
                        Status = StoryStatus.InProgress,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList()
        },
                    new Story()
                    {
                        Name = "Login page",
                        Team = _dbTeams.GetById(2),
                        Description = "login page has inputs for login and password, an image on backgroud, sign in and sign up buttons",
                        AssignedTo = _dbUsers.GetById(9),
                        Status = StoryStatus.ReadyToStart,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList()
                    },
                    new Story()
                    {
                        Name = "DataBase",
                        Team = _dbTeams.GetById(3),
                        Description = "Sql database with code first model.",
                        AssignedTo = _dbUsers.GetById(3),
                        Status = StoryStatus.Accepted,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList()
                    },
                    new Story()
                    { Name = "Clients page",
                        Team = _dbTeams.GetById(4),
                        Description = "This page should show all clients with possibilities add new client, delete some client",
                        AssignedTo = _dbUsers.GetById(10),
                        Status = StoryStatus.PendingApproval,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList()
                    },
                new Story()
                {
                    Name = "Taxes page",
                    Team = _dbTeams.GetById(5),
                    Description = "This page has info about client's taxes.",
                    AssignedTo = _dbUsers.GetById(4),
                    Status = StoryStatus.InProgress,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList()
                },
                new Story()
                {
                    Name = "Odata",
                    Team = _dbTeams.GetById(1),
                    Description = "Every api controller has to use odata requests",
                    AssignedTo = _dbUsers.GetById(5),
                    Status = StoryStatus.TestComplete,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList()
                },
                new Story()
                {
                    Name = "Main window View",
                    Team = _dbTeams.GetById(2),
                    Description = "Cantains home page with general description of application and main links.",
                    AssignedTo = _dbUsers.GetById(11),
                    Status = StoryStatus.Accepted,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList()
                },
                new Story()
                {
                    Name = "Navigation Menu",
                    Team = _dbTeams.GetById(3),
                    Description = "Should be a popup menu, with main button and links inside",
                    AssignedTo = _dbUsers.GetById(6),
                    Status = StoryStatus.InProgress,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList()
                },
                new Story()
                {
                    Name = "User Error Page",
                    Team = _dbTeams.GetById(4),
                    Description = "contains a link to the home page",
                    AssignedTo = _dbUsers.GetById(12),
                    Status = StoryStatus.PendingApproval,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList()
                },
                new Story()
                {
                    Name = "Exporting json file",
                    Team = _dbTeams.GetById(5),
                    Description = "there should be a possibility to get json file in client page. It will contain info about client.",
                    AssignedTo = _dbUsers.GetById(7),
                    Status = StoryStatus.DevComplete,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList()
                }
            };

            AddToDatabase(stories, _dbStories);
        }

        public static void FillTasksData()
        {
            _dbTasks = new Repository<ScrumTask>(_context);

            ScrumTask[] tasks = new ScrumTask[]
            {
                    new ScrumTask()
                    {
                        Name = "Add bootstrap styles to all buttons",
                        Description = "Add bootstrap styles to all buttons",
                        AssignedTo = _dbUsers.GetById(2),
                        Blocked = "NO", ActualHours = 48,
                        PlannedHours = 72, RemainingHours = 96,
                        Type = "medium", State = "in progress",
                        WorkNotes = "This task should be done in 72 hours"
                    },
                    new ScrumTask()
                    {
                        Name = "Add filters to all columns in grids",
                        Description = "Add filters to all columns in grids",
                        AssignedTo = _dbUsers.GetById(9),
                        Blocked = "NO", ActualHours = 48,
                        PlannedHours = 72, RemainingHours = 96,
                        Type = "medium", State = "in progress",
                        WorkNotes = "This task should be done in 48 hours"
                    },
                    new ScrumTask()
                    {
                        Name = "Add new Button to save data",
                        Description = "Add new Button to save data",
                        AssignedTo = _dbUsers.GetById(3),
                        Blocked = "NO", ActualHours = 48,
                        PlannedHours = 72, RemainingHours = 96,
                        Type = "medium", State = "in progress",
                        WorkNotes = "This task should be done in 24 hours"
                    },
                      new ScrumTask()
                     {
                        Name = "Change background image",
                        Description = "Change background image",
                        AssignedTo = _dbUsers.GetById(10),
                        Blocked = "NO", ActualHours = 48,
                        PlannedHours = 72, RemainingHours = 96,
                     Type = "medium", State = "in progress",
                      WorkNotes = "This task should be done in 48 hours"
                      },
                       new ScrumTask()
                       {
                       Name = "write a class that checks the connection string",
                       Description = "write a class that checks the connection string",
                       AssignedTo = _dbUsers.GetById(4),
                       Blocked = "NO", ActualHours = 48,
                       PlannedHours = 72, RemainingHours = 96,
                       Type = "medium", State = "in progress",
                       WorkNotes = "This task should be done in 72 hours"
                       }
            };

            AddToDatabase(tasks, _dbTasks);

        }

        public static void FillFeaturesData()
        {
            _dbFeatures = new Repository<Feature>(_context);
            var firstUser = _dbUsers.GetAll().FirstOrDefault();
            var users = _dbUsers.GetAll().ToList();
            var counter = users.Count() - 1;

            Feature[] features = new Feature[]
            {
                    new Feature()
                    {
                        Description = "Login page cantains buttons: sign in, sign up, fields to type data.",
                        Blocked = false, State = FeatureState.Accepted,
                        FeatureName = "Login Page",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 2).ToList(),
                        Owner = users[counter],
                        ProgramIncrement = "Login and registration page",
                        OwnerUserId = 2
                    },
                    new Feature()
                    {
                        Description = "Contains the description about the company with photos",
                        Blocked = false, State = FeatureState.InProgress,
                        FeatureName = "Home Page",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 4 && s.Id > 2).ToList(),
                        Owner = users[counter-1],
                        ProgramIncrement = "Home page",
                        OwnerUserId = 3
                    },
                    new Feature()
                    {
                        Description = "Contains has elements to manage client data",
                        Blocked = false,
                        State = FeatureState.PendingApproval,
                        FeatureName = "Client Page",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 6 && s.Id > 4).ToList(),
                        Owner = users[counter-2],
                        ProgramIncrement = "Home and client page",
                        OwnerUserId = 6
                    },
                    new Feature()
                    {
                        Description = "there is all contact info and links ",
                        Blocked = false, State = FeatureState.TestComplete,
                        FeatureName = "Footer",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 8 && s.Id > 6).ToList(),
                        Owner = users[counter-3],
                        ProgramIncrement = "Site with footer",
                        OwnerUserId = 1
                    },
                    new Feature()
                    {
                        Description = "There is a navigation menu with links to all pages",
                        Blocked = false, State = FeatureState.TestComplete,
                        FeatureName = "Header",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 10 && s.Id > 8).ToList(),
                        Owner = users[counter-4],
                        ProgramIncrement = "Site with header",
                        OwnerUserId = 4
                    },
                    new Feature()
                    {
                        Description = "Create SCRUM dashboard",
                        Blocked = false, State = FeatureState.TestComplete,
                        FeatureName = "Board",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 10 && s.Id > 8).ToList(),
                        Owner = users[counter-5],
                        ProgramIncrement = "SCRUMBoard",
                        OwnerUserId = 31
                    }
            };

            AddToDatabase(features, _dbFeatures);
        }

        public static void FillSprintStagesData()
        {
            _dbHisories = new Repository<SprintStagesHistory>(_context);

            SprintStagesHistory[] sprintStagesHistories = new SprintStagesHistory[]
            {

                    new SprintStagesHistory()
                    {
                        Begined = DateTime.Today - new TimeSpan(10,0,0,0),
                        Ended =  DateTime.Today + new TimeSpan(31,0,0,0)
                    }
            };

            AddToDatabase(sprintStagesHistories, _dbHisories);
        }

        public static void FillSprintsData()
        {
            _dbSprints = new Repository<Sprint>(_context);


            Sprint[] sprints = new Sprint[]
            {

                new Sprint()
                {
                    Team = _dbTeams.GetById(1),
                    Name = "Sprint 1",
                    Retrospective = " What went well in the Sprint: command work. What could be improved: Speed of development. What will we commit to improve in the next Sprint: icrease development speed",
                    Review = "",
                    Stage = SprintStage.Progress,
                    History = _dbHisories.GetById(1)
                },
                new Sprint()
                {
                    Team =  _dbTeams.GetById(2),
                    Name = "Sprint 2",
                    Retrospective = "",
                    Review = "",
                    Stage = SprintStage.Planning,
                    History = _dbHisories.GetById(1)
                },
                new Sprint()
                {
                    Team =  _dbTeams.GetById(3),
                    Name = "Sprint 3",
                    Retrospective = " What went well in the Sprint: finished in time. What could be improved: the code review. What will we commit to improve in the next Sprint: give more time for code review.",
                    Review = " all stories and tasks has been done. We are planning to do: ",
                    Stage = SprintStage.Review,
                    History = _dbHisories.GetById(1)
                },
                new Sprint()
                {
                    Team = _dbTeams.GetById(4),
                    Name = "Sprint 4",
                    Retrospective = " What went well in the Sprint: finished all stories and tasks in right way. What could be improved: Sprint was not finished. What will we commit to improve in the next Sprint: monitor timely for performance of all tasks.",
                    Review = "",
                    Stage = SprintStage.Retrospective,
                    History = _dbHisories.GetById(1)
                },new Sprint()
                {
                    Team = _dbTeams.GetById(5),
                    Name = "Sprint 5",
                    Retrospective = " What went well in the Sprint: all tasks were done. What could be improved: communication skiils with client. What will we commit to improve in the next Sprint: improve communcation skills",
                    Review = "all planned tasks have been done except: database",
                    Stage = SprintStage.Finished,
                    History =_dbHisories.GetById(1)
                }

            };

            AddToDatabase(sprints, _dbSprints);

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

        public static void ShowStatus(int percentsDone)
        {
            Console.Clear();
            Console.WriteLine("{0} % done", percentsDone);
        }

        public static void AddToDatabase<T>(T[] array, IRepository<T> repository) where T : class
        {
            if (repository.GetAll().Count() != 0)
            {
                return;
            }
            else
            {
                foreach (T element in array)
                {
                    repository.Create(element);
                }

                repository.Save();
            }
        }
    }
}
