﻿using DAL.Models;
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
        static IRepository<DailyStandUp> _dbDailyInfo;
        static IRepository<Defect> _dbDefects;
        static IRepository<Story> _dbStories;
        static IRepository<ScrumTask> _dbTasks;
        static IRepository<Feature> _dbFeatures;
        static IRepository<SprintStagesHistory> _dbHisories;
        static IRepository<Sprint> _dbSprints;
        static IRepository<SprintReview> _dbSprintsReviews;
        static IRepository<Meetings> _meetings;
        private const string HASH_ADMIN = "sha1:64000:18:IKGrJDSsv5EkBegDsKvNI6fS7DyN44MP:NxzGLNDkRwyUTXoQ0gDpOsy7";

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
            ShowStatus(95);
            FillSprintReviewsData();
            FillMeetingsData();
            ShowStatus(100);
        }

        public static void FillMeetingsData()
        {
            _meetings = new Repository<Meetings>(_context);

            Meetings[] meetings = new Meetings[]
            {
                new Meetings() { MeetingName = "Poker Planning", Description = "wqer" },
                new Meetings() { MeetingName = "Retrospective", Description = "wqer" },
                new Meetings() { MeetingName = "Daily Stand Up", Description = "wqer" }
            };

            AddToDatabase(meetings, _meetings);
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
                        Email = "admin@admin.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(1),
                        Activity = true,
                        Login = "Ivan",
                        Email = "Ivan.Nesterenko@gmail.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(2),
                        Activity = true,
                        Login = "Oleksandr",
                        Email = "Oleksandr.Petrov@gmail.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Nataliya",
                        Email = "Nataliya.Kozachenko@ukr.net",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Viktor",
                        Email = "Viktor.Andrushenko@mail.ru",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Mykola",
                        Email = "Mykola.Kropyvnytskiy@gmail.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Yuriy",
                        Email = "Yuriy.Savchuk@gmail.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Roman",
                        Email = "Roman.Danylenko@gmail.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Anastasiya",
                        Email = "Anastasiya.Zelenska@gmail.com",
                        Password = HASH_ADMIN
                    },


                    new User()
                    {
                        Role = _dbRoles.GetById(2),
                        Activity = true,
                        Login = "Andriy23",
                        Email = "Andriy.Herula@com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Ihor12",
                        Email = "Ihor.Verbenets@ukr.net",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Iryna4",
                        Email = "Iryna.Revus@mail.ru",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Myhailo0",
                        Email = "Myhailo.Andruchvych@gmail.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Maksym0",
                        Email = "Maksym.Pereima@mail.ru",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Oleg8",
                        Email = "Oleg.Mykytyn@gmail.com",
                        Password = HASH_ADMIN
                    },
                    new User()
                    {
                        Role = _dbRoles.GetById(3),
                        Activity = true,
                        Login = "Ulyana4",
                        Email = "Ulyana.Nazaruk@mail.ru",
                        Password = HASH_ADMIN
                    },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Andriy8",
                    Email = "Andriy.H@com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ihor5",
                    Email = "Ihor.V@ukr.net",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Iryna1",
                    Email = "Iryna.Re.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Myhailo2",
                    Email = "Myhailo.An@gmail.com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Maksym2",
                    Email = "Maksym.Pe@mail.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Oleg1",
                    Email = "Oleg.Myk@gmail.com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ulyana1",
                    Email = "Ulyana.Na@mail.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(2),
                    Activity = true,
                    Login = "Andriy",
                    Email = "Andriy.Herula123@com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ihor",
                    Email = "Ihor.Verbenets1423@ukr.net",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Iryna",
                    Email = "Iryna.Revus123@mail.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Myhailo1",
                    Email = "Myhailo.Andrucychwwrf@gmail.com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Maksym1",
                    Email = "Maksym.reima@mail.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Oleg12",
                    Email = "Oleg.Mytyn@gmail.com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ulyana2",
                    Email = "Ulyana.aruk@mail.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(2),
                    Activity = true,
                    Login = "Andriy873",
                    Email = "Andriy.rula@com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ihor32",
                    Email = "Ihor.Venets@ukr.net",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Iryna32",
                    Email = "Iryna.Rs@mail.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Myhailo",
                    Email = "Myhailo.Aruchv574ych@gmail.com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Maksym",
                    Email = "Maksym.Pe67ima@mail.ru",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Oleg",
                    Email = "Oleg.Myky325n@gmail.com",
                    Password = HASH_ADMIN
                },
                new User()
                {
                    Role = _dbRoles.GetById(3),
                    Activity = true,
                    Login = "Ulyana3",
                    Email = "Ulyana.564aruk@mail.ru",
                    Password = HASH_ADMIN
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
                        DefectName = "Broken button 'send'",
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
                        User = _dbUsers.GetById(2),
                        Status = StoryStatus.InProgress,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList(),
                        Sprint = _dbSprints.GetById(1),
        },
                    new Story()
                    {
                        Name = "Login page",
                        Team = _dbTeams.GetById(2),
                        Description = "login page has inputs for login and password, an image on backgroud, sign in and sign up buttons",
                        User = _dbUsers.GetById(9),
                        Status = StoryStatus.ReadyToStart,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                        Sprint = _dbSprints.GetById(2),
                    },
                    new Story()
                    {
                        Name = "DataBase",
                        Team = _dbTeams.GetById(3),
                        Description = "Sql database with code first model.",
                        User = _dbUsers.GetById(3),
                        Status = StoryStatus.Accepted,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList(),
                        Sprint = _dbSprints.GetById(1),
                    },
                    new Story()
                    { Name = "Clients page",
                        Team = _dbTeams.GetById(4),
                        Description = "This page should show all clients with possibilities add new client, delete some client",
                        User = _dbUsers.GetById(10),
                        Status = StoryStatus.PendingApproval,
                        Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                        Sprint = _dbSprints.GetById(1),
                    },
                new Story()
                {
                    Name = "Taxes page",
                    Team = _dbTeams.GetById(5),
                    Description = "This page has info about client's taxes.",
                    User = _dbUsers.GetById(4),
                    Status = StoryStatus.InProgress,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList(),
                    Sprint = _dbSprints.GetById(2),
                },
                new Story()
                {
                    Name = "Odata",
                    Team = _dbTeams.GetById(1),
                    Description = "Every api controller has to use odata requests",
                    User = _dbUsers.GetById(5),
                    Status = StoryStatus.TestComplete,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                    Sprint = _dbSprints.GetById(1),
                },
                new Story()
                {
                    Name = "Main window View",
                    Team = _dbTeams.GetById(2),
                    Description = "Cantains home page with general description of application and main links.",
                    User = _dbUsers.GetById(11),
                    Status = StoryStatus.Accepted,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList(),
                    Sprint = _dbSprints.GetById(2),
                },
                new Story()
                {
                    Name = "Navigation Menu",
                    Team = _dbTeams.GetById(3),
                    Description = "Should be a popup menu, with main button and links inside",
                    User = _dbUsers.GetById(6),
                    Status = StoryStatus.InProgress,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                    Sprint = _dbSprints.GetById(3),
                },
                new Story()
                {
                    Name = "User Error Page",
                    Team = _dbTeams.GetById(4),
                    Description = "contains a link to the home page",
                    User = _dbUsers.GetById(12),
                    Status = StoryStatus.PendingApproval,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId < 8).ToList(),
                    Sprint = _dbSprints.GetById(3),
                },
                new Story()
                {
                    Name = "Exporting json file",
                    Team = _dbTeams.GetById(5),
                    Description = "there should be a possibility to get json file in client page. It will contain info about client.",
                    User = _dbUsers.GetById(7),
                    Status = StoryStatus.DevComplete,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                    Sprint = null,
                },
                 new Story()
                {
                    Name = "Adding of goods",
                    Team = _dbTeams.GetById(6),
                    Description = "Implement adding of goods to shopping cart.",
                    User = _dbUsers.GetById(7),
                    Status = StoryStatus.Accepted,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                    Sprint = _dbSprints.GetById(4),
                },
                 new Story()
                {
                    Name = "Deleting of goods",
                    Team = _dbTeams.GetById(6),
                    Description = "Implement deleting of goods from shopping cart.",
                    User = _dbUsers.GetById(8),
                    Status = StoryStatus.Accepted,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                    Sprint = _dbSprints.GetById(4),
                },
                 new Story()
                {
                    Name = "Changing price",
                    Team = _dbTeams.GetById(6),
                    Description = "Implement checking of price when new goods are recieved. Add changing of the price if it's need.",
                    User = _dbUsers.GetById(9),
                    Status = StoryStatus.Accepted,
                    Defects = _dbDefects.GetAll().Where(d => d.DefectId > 7).ToList(),
                    Sprint = _dbSprints.GetById(4),
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
                        Summary = "SVN, Project Page",
                        Story = _dbStories.GetById(1),
                        Description = "Set-up SVN, project folders, SharePoint, project page",
                        User = _dbUsers.GetById(5),
                        Blocked =  false,
                        PlannedHours = 72,
                        RemainingHours = 72,
                        ActualHours = 0,
                        Started = new DateTime(2018,7,6,12,45,30),
                        Completed = new DateTime(2018,8,8,20,45,30),
                        Type = TaskType.Analyses, State = TaskState.ToDo,
                        WorkNotes = "This task should be done in 72 hours"
                    },
                    new ScrumTask()
                    {
                        Summary = "Validating entity classes",
                        Story = _dbStories.GetById(2),
                        Description = "Add validation to entity classes",
                        User = _dbUsers.GetById(13),
                        Blocked =  false,
                        PlannedHours = 72,
                        RemainingHours = 48,
                        ActualHours = 24,
                        Started = new DateTime(2018,7,6,12,45,30),
                        Completed = new DateTime(2018,7,3,20,45,30),
                        Type = TaskType.Coding, State = TaskState.InProgress,
                        WorkNotes = "This task should be done in 72 hours"
                    },
                    new ScrumTask()
                    {
                        Summary = "Manual tests",
                        Story = _dbStories.GetById(7),
                        Description = "Run manual tests",
                        User = _dbUsers.GetById(16),
                        Blocked =  false,
                        PlannedHours = 26,
                        RemainingHours = 0,
                        ActualHours = 24,
                        Started = new DateTime(2018,7,6,12,45,30),
                        Completed =new DateTime(2018,8,7,12,45,30),
                        Type =TaskType.Documentation, State = TaskState.Done,
                        WorkNotes = "This task should be done in 26 hours"
                    },
                      new ScrumTask()
                     {
                        Summary = "User docment draft review",
                        Story = _dbStories.GetById(8),
                        Description = "User docment draft review",
                        User = _dbUsers.GetById(17),
                        Blocked =  false,
                        PlannedHours = 56,
                        RemainingHours = 8,
                        ActualHours = 48,
                        Started = new DateTime(2018,7,6,12,45,30),
                        Completed = new DateTime(2018,7,8,20,45,30),
                        Type = TaskType.Documentation, State = TaskState.InProgress,
                        WorkNotes = "This task should be done in 56 hours"
                      },
                       new ScrumTask()
                       {
                       Summary = "Automated tests",
                       Story = _dbStories.GetById(9),
                       Description = "Create automated tests",
                       User = _dbUsers.GetById(23),
                       Blocked =  false,
                       PlannedHours = 72,
                       RemainingHours = 0,
                       ActualHours = 56,
                       Started = new DateTime(2018,7,6,12,45,30),
                       Completed =new DateTime(2018,7,8,20,45,30),
                       Type = TaskType.Testing, State = TaskState.Done,
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
                        OwnerUserId = users[counter].UserId,
                        ProgramIncrement = "Login and registration page"
                    },
                    new Feature()
                    {
                        Description = "Contains the description about the company with photos",
                        Blocked = false, State = FeatureState.InProgress,
                        FeatureName = "Home Page",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 4 && s.Id > 2).ToList(),
                        Owner = users[counter-1],
                        OwnerUserId = users[counter-1].UserId,
                        ProgramIncrement = "Home page"
                    },
                    new Feature()
                    {
                        Description = "Contains has elements to manage client data",
                        Blocked = false,
                        State = FeatureState.PendingApproval,
                        FeatureName = "Client Page",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 6 && s.Id > 4).ToList(),
                        Owner = users[counter-2],
                        OwnerUserId = users[counter-2].UserId,
                        ProgramIncrement = "Home and client page"
                    },
                    new Feature()
                    {
                        Description = "there is all contact info and links ",
                        Blocked = false, State = FeatureState.TestComplete,
                        FeatureName = "Footer",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 8 && s.Id > 6).ToList(),
                        Owner = users[counter-3],
                        OwnerUserId = users[counter-3].UserId,
                        ProgramIncrement = "Site with footer"
                    },
                    new Feature()
                    {
                        Description = "There is a navigation menu with links to all pages",
                        Blocked = false, State = FeatureState.TestComplete,
                        FeatureName = "Header",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 10 && s.Id > 8).ToList(),
                        Owner = users[counter-4],
                        OwnerUserId = users[counter-4].UserId,
                        ProgramIncrement = "Site with header"
                    },
                    new Feature()
                    {
                        Description = "Create SCRUM dashboard",
                        Blocked = false, State = FeatureState.TestComplete,
                        FeatureName = "Board",
                        Stories = _dbStories.GetAll().Where(s => s.Id <= 10 && s.Id > 8).ToList(),
                        Owner = users[counter-5],
                        OwnerUserId = users[counter-5].UserId,
                        ProgramIncrement = "SCRUMBoard"
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
                        Begined = new DateTime(2018,06,01),
                        Ended =  new DateTime(2018,06,15)
                    },

                     new SprintStagesHistory()
                    {
                        Begined = new DateTime(2018,06,16),
                        Ended =  new DateTime(2018,06,30)
                    },

                      new SprintStagesHistory()
                    {
                        Begined = new DateTime(2018,07,01),
                        Ended =  new DateTime(2018,07,13)
                    },

                       new SprintStagesHistory()
                    {
                        Begined = new DateTime(2018,07,14),
                        Ended =  new DateTime(2018,07,28)
                    },

                        new SprintStagesHistory()
                    {
                        Begined = new DateTime(2018,07,29),
                        Ended =  new DateTime(2018,08,17)
                    },

                         new SprintStagesHistory()
                    {
                        Begined = new DateTime(2018,08,18),
                        Ended =  new DateTime(2018,08,30)
                    },
            };

            AddToDatabase(sprintStagesHistories, _dbHisories);
        }

        public static void FillSprintsData()
        {
            _dbSprints = new Repository<Sprint>(_context);
            var stories = _dbStories.GetAll().ToList();
            var counter = stories.Count() - 1;

            Sprint[] sprints = new Sprint[]
            {

                new Sprint()
                {
                    Team = _dbTeams.GetById(1),
                    Name = "Sprint 1",
                    Retrospective = " What went well in the Sprint: command work. What could be improved: Speed of development. What will we commit to improve in the next Sprint: icrease development speed",
                    Goal = "Create mockud for grids. Add grids which will be responsive in different types of screens.",
                    Stage = SprintStage.InProgress,
                    History = _dbHisories.GetById(1),
                    Backlog = new List<Story>
                    {
                        stories[counter-10],
                        stories[counter-11],
                        stories[counter-12],
                    }
                },
                new Sprint()
                {
                    Team =  _dbTeams.GetById(2),
                    Name = "Sprint 2",
                    Retrospective = "",
                    Goal = "Develop the checkout process: pay for an order, pick shipping, order gift wrapping.",
                    Stage = SprintStage.Planning,
                    History = _dbHisories.GetById(2),
                    Backlog = _dbStories.GetAll().Where(s => s.Id <= 4).ToList()
                },
                                new Sprint()
                {
                    Team =  _dbTeams.GetById(3),
                    Name = "Sprint 3",
                    Retrospective = " What went well in the Sprint: finished in time. What could be improved: the code review. What will we commit to improve in the next Sprint: give more time for code review.",
                    Goal = "Implement basic shopping cart functionality including add, remove, and update quantities.",
                    Stage = SprintStage.Review,
                    History = _dbHisories.GetById(3),
                    Backlog = new List<Story>
                    {
                        stories[counter],
                        stories[counter-1],
                        stories[counter-2],
                        stories[counter-3],
                    }
                },
                new Sprint()
                {
                    Team = _dbTeams.GetById(4),
                    Name = "Sprint 4",
                    Retrospective = " What went well in the Sprint: finished all stories and tasks in right way. What could be improved: Sprint was not finished. What will we commit to improve in the next Sprint: monitor timely for performance of all tasks.",
                    Goal = " All stories and tasks need to be done.",
                    Stage = SprintStage.Retrospective,
                    History = _dbHisories.GetById(4),
                    Backlog = new List<Story>
                    {
                        stories[counter-4],
                        stories[counter-5],
                        stories[counter-6],
                    }
                },
                new Sprint()
                {
                    Team = _dbTeams.GetById(5),
                    Name = "Sprint 5",
                    Retrospective = " What went well in the Sprint: all tasks were done. What could be improved: communication skiils with client. What will we commit to improve in the next Sprint: improve communcation skills",
                    Goal = "All planned tasks need to be done except: database",
                    Stage = SprintStage.Finished,
                    History =_dbHisories.GetById(5),
                    Backlog = new List<Story>
                    {
                        stories[counter],
                        stories[counter-8],
                        stories[counter-7],
                        stories[counter-8],
                    }
                },
                new Sprint()
                {
                    Team = _dbTeams.GetById(5),
                    Name = "Sprint 6",
                    Retrospective = "What went well in the Sprint: all tasks were done. What could be improved: communication skiils with client. What will we commit to improve in the next Sprint: improve communcation skills",
                    Goal = "Implement login page.",
                    Stage = SprintStage.Review,
                    History = _dbHisories.GetById(6),
                    Backlog = new List<Story>
                    {
                        stories[counter-3],
                        stories[counter-4],
                        stories[counter-5],
                    }
                }

            };

            AddToDatabase(sprints, _dbSprints);

        }

        public static void FillDailyScrumData()
        {
            _dbDailyInfo = new Repository<DailyStandUp>(_context);
            _dbSprints = new Repository<Sprint>(_context);

            if (_dbDailyInfo.GetAll().Count() != 0)
                return;


            foreach (var item in _dbSprints.GetAll())
            {
                List<DailyStandUp> infos = new List<DailyStandUp>()
                {
                    new DailyStandUp()
                    {
                        Description = "DailyDescription1",
                        Сonducted = DateTime.Now - new TimeSpan(48,0,0)
                    },
                    new DailyStandUp()
                    {
                        Description = "DailyDescription2",
                        Сonducted = DateTime.Now - new TimeSpan(24,0,0)
                    },
                    new DailyStandUp()
                    {
                        Description = "DailyDescription3",
                        Сonducted = DateTime.Now
                    }

                };

                item.DailyScrums = infos;
            }

            _dbSprints.Save();

        }

        private static void FillSprintReviewsData()
        {
            _dbSprintsReviews = new Repository<SprintReview>(_context);
            var sprints = _dbSprints.GetAll().ToList();
            var firstSprint = sprints.FirstOrDefault();
            var counter = sprints.Count() - 1;

            SprintReview[] sprintReviews = new SprintReview[]
            {
                new SprintReview() { IsGoalAchived = false, Sprint = sprints[counter-1], SprintId = sprints[counter-1].Id},
                new SprintReview() { IsGoalAchived = false, Sprint = sprints[counter-2], SprintId = sprints[counter-2].Id},
                new SprintReview() { IsGoalAchived = false, Sprint = sprints[counter-3], SprintId = sprints[counter-3].Id}
            };

            AddToDatabase(sprintReviews, _dbSprintsReviews);
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
