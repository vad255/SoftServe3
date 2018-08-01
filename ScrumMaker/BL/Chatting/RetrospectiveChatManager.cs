using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Collections.ObjectModel;
using System.Text;
using DAL.Chatting;
using System.Linq;
using System.Net;
using DAL.Access;
using DAL.Models;
using DAL;
using Microsoft.AspNetCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Security;
using ScrumMaker.Logger;
using System.Net.Mail;

namespace BL.Chatting
{
    public class UserInfo
    {
        public User User { get; set; }
        public int SprintId { get; set; }
    }

    public class RetrospectiveChatManager : IRetrospectiveChatMananger
    {
        public const string ROOM_NAME = "RetrospectiveRoom";
        private static List<User> _authorizedGuests = new List<User>();
        private static int _totalGuestsCount;
        private static List<UserInfo> _usersInfo = new List<UserInfo>();

        private readonly IRepository<ChatRoom> _chats;
        private readonly IRepository<Message> _msgs;
        private readonly IRepository<User> _users;
        private readonly IRepository<RetrospectiveMessage> _rmsgs;
        private readonly ChatRoom _room;
        private readonly IRepository<Sprint> _sprints;
        public int SprintId { get; set; }


        public RetrospectiveChatManager(IRepository<ChatRoom> chats, IRepository<Message> msgs, IRepository<User> users, IRepository<RetrospectiveMessage> rmsgs, IRepository<Sprint> sprints)
        {
            _sprints = sprints;
            _chats = chats;
            _msgs = msgs;
            _rmsgs = rmsgs;
            _users = users;
            _room = _chats.GetAll().Where(c => c.Name == ROOM_NAME).FirstOrDefault();

            if (_room != null)
                return;

            _room = new ChatRoom() { Name = ROOM_NAME };
            _chats.Create(_room);
            _chats.Save();
        }

        public ClaimsPrincipal User { get; set; }

        public string GetGroupIdentifier
        {
            get
            {
                return ROOM_NAME;
            }
        }

        public User Connect()
        {
            int userId = GetCurrentUserId();

            User user = _users.GetAll().FirstOrDefault(u => u.UserId == userId);

            if (user != null)
            {
                int target = _authorizedGuests.FindIndex(u => u.UserId == userId);
                if (target == -1)
                {
                    _authorizedGuests.Add(_users.GetById(userId));
                    _usersInfo.Add(new UserInfo() { User = _users.GetById(userId), SprintId = this.SprintId });
                }
                else
                {
                    Logger.LogWarn("Double connectiong");
                }
            }

            _totalGuestsCount++;

            return user;
        }

        public User Disconnect()
        {
            int userId = GetCurrentUserId();
            User user = null;
            if (userId > 0)
            {
                int target = _authorizedGuests.FindIndex(u => u.UserId == userId);
                if (target != -1)
                {
                    user = _authorizedGuests[target];
                    _authorizedGuests.RemoveAt(target);
                    _usersInfo.RemoveAt(target);
                }
                else
                {
                    Logger.LogWarn("Double disconnecting !?!?");
                }
            }

            _totalGuestsCount--;

            return user;
        }

        public void AddRetrospectiveMessage(RetrospectiveMessage message)
        {
            message.ChatId = _room.Id;
            _rmsgs.Create(message);
            _rmsgs.Save();

            if (SprintId >= 0)
            {
                var sprint = _sprints.GetById(SprintId);
                sprint.Retrospective += message.UserName + " (" +
                                       message.SendingDate.ToShortDateString() + ") " +
                                       "went well: " + message.WentWell + " " +
                                       "improve to doing: " + message.CouldBeImproved + " " +
                                       "commit to next sprint: " + message.CommitToDoing + Environment.NewLine;
                _sprints.Update(sprint);
                _sprints.Save();
            }
        }

        public virtual Message AddMessage(string text)
        {
            return new Message();
        }

        public virtual IEnumerable<UserInfo> GetOnlineUsersInfo()
        {
            return _usersInfo;
        }

        public virtual IEnumerable<User> GetOnlineUsers()
        {
            return _authorizedGuests;
        }

        public IQueryable<Message> GetHistory(int skip = -1, int top = -1)
        {
            if (skip > 0 && top > 0)
                return _msgs.GetAll().
                    Where(m => m.ChatId == _room.Id).
                    OrderBy(m => m.Sent).
                    Include(m => m.Author).
                    Skip(skip).Take(top);

            return _msgs.GetAll().
                Where(m => m.ChatId == _room.Id).
                OrderBy(m => m.Sent).
                Include(m => m.Author);
        }

        public IQueryable<Message> GetHistory()
        {
            return GetHistory(-1, -1);
        }


        public int GetCurrentUserId()
        {
            ClaimsIdentity identity = User?.Identity as ClaimsIdentity;

            if (identity == null)
                return -1;

            int authorId = -1;
            string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;
            int.TryParse(idFromClaims, out authorId);

            return authorId;
        }


        public DateTime GetCurrentDate()
        {
            return DateTime.Now;
        }

        public string GetCurrentUserName()
        {
            int userId = GetCurrentUserId();
            User user = _users.GetAll().FirstOrDefault(u => u.UserId == userId);
            if (user != null)
            {
                return user.Login;
            }

            return "Anonim";
        }
    }
}