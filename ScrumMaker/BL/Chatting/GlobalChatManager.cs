using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Text;
using DAL.Chatting;
using System.Linq;
using DAL.Access;
using DAL.Models;
using DAL;
using Microsoft.AspNetCore;

using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using ScrumMaker.Logger;

namespace BL.Chatting
{
    public class GlobalChatManager : IGlobalChatManager
    {
        public const string ROOM_NAME = "ScrumMakerGlobalChat";
        private static List<User> _authorizedGuests = new List<User>();
        private static int _totalGuestsCount;

        private IRepository<ChatRoom> _chats;
        private IRepository<Message> _msgs;
        private IRepository<User> _users;
        private ChatRoom _room;


        public GlobalChatManager(IRepository<ChatRoom> chats, IRepository<Message> msgs, IRepository<User> users)
        {
            _chats = chats;
            _msgs = msgs;
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

        /// <summary>
        /// !!! Not thread safe
        /// </summary>
        /// <param name="identifier"></param>
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
                }
                else
                {
                    Logger.LogWarn("Double connectiong");
                }
            }

            _totalGuestsCount++;

            return user;
        }
        /// <summary>
        /// !!! Not thread safe
        /// </summary>
        /// <param name="identifier"></param>
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
                }
                else
                {
                    Logger.LogWarn("Double disconnecting !?!?");
                }
            }

            _totalGuestsCount--;

            return user;
        }

        public virtual Message AddMessage(string text)
        {
            int authorId = GetCurrentUserId();

            Message msg = new Message()
            {
                AuthorId = authorId > 0 ? (int?)authorId : null,
                ChatId = _room.Id,
                Sent = DateTime.UtcNow,
                Text = text
            };

            _msgs.Create(msg);
            _msgs.Save();

            return _msgs.GetAll().Where(m => m.Id == msg.Id).Include(m => m.Author).FirstOrDefault();
        }


        public virtual IEnumerable<User> GetOnlineUsers()
        {
            return _authorizedGuests;
        }

        public IQueryable<Message> GetHistory(int skip = -1, int top = -1)
        {
            if (skip >= 0 && top >= 0)
                return _msgs.GetAll().
                    Where(m => m.ChatId == _room.Id).
                    Include(m => m.Author).
                    OrderBy(m => m.Sent).
                    Skip(skip).Take(top);

            return _msgs.GetAll().
                Where(m => m.ChatId == _room.Id).
                Include(m => m.Author).
                OrderBy(m => m.Sent);
        }

        public IQueryable<Message> GetHistory()
        {
            return GetHistory(-1, -1);
        }


        private int GetCurrentUserId()
        {
            ClaimsIdentity identity = User?.Identity as ClaimsIdentity;

            if (identity == null)
                return -1;

            int authorId = -1;
            string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;
            int.TryParse(idFromClaims, out authorId);

            return authorId;
        }

    }
}
