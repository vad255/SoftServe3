using BL;
using DAL.Access;
using DAL.Chatting;
using DAL.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ScrumMaker.Logger;
using BL.Chatting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace ScrumMaker.Controllers.Chatting
{
    public class PokerHub : Hub
    {
        private IPokerManager _manager;
        private IRepository<Story> _story;

        public PokerHub(IPokerManager manager, IRepository<Story> story)
        {
            _story = story;
            _manager = manager;
        }

        public void TakeState(object history)
        {
            HttpContext context = Context.GetHttpContext();
        }

        public async Task SendStoryOnTable(int storyId)
        {
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveMessage", _manager.GetStoryById(storyId));
        }

        public async Task SendStartOrFinishPoker(bool startOrFinish)
        {
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveStartOfFinish", startOrFinish);
        }

        public async Task SendMark(object user)
        {
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receivePokerMark", user);
        }

        public async Task SendReviewPoints(bool reviewPoints, int finalMark, int storyId)
        {
            Story story = null;
            if (storyId != 0 && finalMark != -1)
            {
                story = _manager.GetStoryById(storyId);
                story.PokerMark = finalMark;
                _manager.UpdateStory(story);
            }

            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveReviewPoints", reviewPoints, story);
        }

        public async Task SendRec(bool rec)
        {
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveRec", rec);
        }

        public async Task SendActiveDisable(bool activeDisable)
        {
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveActiveDisable", activeDisable);
        }

        public async Task GetHistory()
        {
            var history = _manager.GetHistory().Select(m => m.ToJSON());


            foreach (var item in history)
                Console.WriteLine(item);

            await Clients.Caller.SendAsync("receiveHistory", history);
        }

        public async Task GetUsers()
        {
            await Clients.Caller.SendAsync("receiveUsers", _manager.GetOnlineUsers());
        }


        public override async Task OnConnectedAsync()
        {
            _manager.User = Context.User;
            DAL.Models.User user = _manager.Connect();

            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("userConnected", user);
            await Groups.AddToGroupAsync(Context.ConnectionId, _manager.GetGroupIdentifier);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _manager.User = Context.User;
            DAL.Models.User user = _manager.Disconnect();

            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("userDisconnect", user);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, _manager.GetGroupIdentifier);

            await base.OnDisconnectedAsync(exception);
        }
    }
}
