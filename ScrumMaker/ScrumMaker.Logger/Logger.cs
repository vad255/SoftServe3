using System;
using System.IO;
using System.Reflection;
using System.Xml;

namespace ScrumMaker.Logger
{
    public class Logger
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Logger));

        static Logger()
        {
            XmlDocument log4netConfig = new XmlDocument();
            log4netConfig.Load(File.OpenRead(Path.Combine(GetExecutenDirectory(), "log4net.config")));

            var repo = log4net.LogManager.CreateRepository(
                Assembly.GetEntryAssembly(), typeof(log4net.Repository.Hierarchy.Hierarchy));

            log4net.Config.XmlConfigurator.Configure(repo, log4netConfig["log4net"]);
        }

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

        private static string GetExecutenDirectory()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }
    }
}
