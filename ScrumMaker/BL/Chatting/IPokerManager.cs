using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Chatting
{
    public interface IPokerManager : IChatManager
    {

        IEnumerable<Story> GetStory();
        void UpdateStory(Story story);
        Story GetStoryById(int id);

    }
}
