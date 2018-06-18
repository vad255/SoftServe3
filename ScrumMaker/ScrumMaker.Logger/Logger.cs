using NLog;
using System;
using System.IO;
using System.Reflection;
using System.Xml;

namespace ScrumMaker.Logger
{
    public class Logger
    {
        private static NLog.Logger log = NLog.LogManager.GetCurrentClassLogger();

        public static void LogFatal(string massage)
        {
            log.Fatal(massage);
        }

        public static void LogError(string massage)
        {
            log.Error(massage);
        }

        public static void LogWarn(string massage)
        {
            log.Warn(massage);
        }

        public static void LogInfo(string massage)
        {
            log.Info(massage);
        }

        public static void LogDebug(string massage)
        {
            log.Debug(massage);
        }
    }
}
