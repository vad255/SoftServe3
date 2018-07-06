using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Interface
{
    interface IEditUserManager
    {
        string GetLogin();

        User GetUser();

        void EditPhoto();

    }
}
