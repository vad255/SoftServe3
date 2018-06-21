using NLog;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Xml;

namespace ScrumMaker.Logger
{
    public class Logger
    {
        private static NLog.Logger log = NLog.LogManager.GetCurrentClassLogger();
       
        public static void LogFatal(string message)
        {
            log.Fatal(message);
        }

        public static void LogError(string message)
        {
            log.Error(message);
        }

        public static void LogWarn(string message)
        {
            log.Warn(message);
        }

        public static void LogInfo(string message)
        {
            log.Info(message);
        }

        public static void LogDebug(string message)
        {
            log.Debug(message);
        }
    }
}
