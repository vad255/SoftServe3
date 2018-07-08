using System;
using System.Collections.Generic;
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

namespace BL.Chatting
{
    public class GlobalChatManager : IGlobalChatManager
    {
        public const string ROOM_NAME = "ScrumMakerGlobalChat";

        private IRepository<ChatRoom> _chats;
        private IRepository<Message> _msgs;
        //private HttpContext _context;
        private ChatRoom _room;


        public GlobalChatManager(IRepository<ChatRoom> chats, IRepository<Message> msgs)
        {
            _chats = chats;
            _msgs = msgs;
            //_context = context;
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


        public virtual Message AddMessage(string text)
        {
            ClaimsIdentity identity = User?.Identity as ClaimsIdentity;
            int authorId = -1;

            if (identity != null)
            {
                string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;
                int.TryParse(idFromClaims, out authorId);
            }

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

        public IQueryable<Message> GetHistory(int skip = -1, int top = -1)
        {
            if (skip > 0 && top > 0)
                return _msgs.GetAll().
                    Where(m => m.ChatId == _room.Id).
                    OrderBy(m => m.Sent).
                    Include(m => m.Author).
                    Skip(skip).Take(top);

            return _msgs.GetAll().
                OrderBy(m => m.Sent).
                Include(m => m.Author);
        }

        public IQueryable<Message> GetHistory()
        {
            return GetHistory(-1,-1);
        }
    }
}
