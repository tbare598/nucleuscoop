﻿using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace Nucleus
{
    /// <summary>
    /// Util class for executing and reading output from the Nucleus.Coop.StartGame application
    /// </summary>
    public static class StartGameUtil
    {
        private static string lastLine;
        private static object locker = new object();

        public static string GetStartGamePath()
        {
            return Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "StartGame.exe");
        }

        public static string GetArguments(string pathToGame, string args, int waitTime, params string[] mutex)
        {
            string mu = "";
            for (int i = 0; i < mutex.Length; i++)
            {
                mu += mutex[i];

                if (i != mutex.Length - 1)
                {
                    mu += ";";
                }
            }

            return "\"" + pathToGame + "\" \"" + args + "\" \"" + waitTime + "\" \"" + mu + "\"";
        }

        public static bool KillMutex(Process p, string mutexName)
        {
            lock (locker)
            {
                bool mutexKilled = false;
                while (MutexExists(p, mutexName))
                {
                    ProcessUtil.KillMutex(p, mutexName);
                    mutexKilled = true;
                }
                return mutexKilled;

            }
        }

        public static bool MutexExists(Process p, string mutex)
        {
            lock (locker)
            {
                return ProcessUtil.MutexExists(p, mutex);
            }
        }

        /// <summary>
        /// NOT THREAD SAFE
        /// </summary>
        /// <param name="pathToGame"></param>
        /// <param name="args"></param>
        /// <param name="waitTime"></param>
        /// <param name="mutex"></param>
        /// <returns></returns>
        public static int StartGame(string pathToGame, string args)
        {
            lock (locker)
            {
                string startGamePath = GetStartGamePath();
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = startGamePath;

                startInfo.Arguments = "\"game:" + pathToGame + ";" + args + "\"";
                Console.WriteLine(startInfo.Arguments);
                startInfo.RedirectStandardOutput = true;
                startInfo.UseShellExecute = false;

                Process proc = Process.Start(startInfo);
                proc.OutputDataReceived += proc_OutputDataReceived;
                proc.BeginOutputReadLine();

                proc.WaitForExit();

                // parse the last line for the process ID
                return int.Parse(lastLine.Split(':')[1]);
            }
        }
        public static void proc_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            if (string.IsNullOrEmpty(e.Data))
            {
                return;
            }
            Console.WriteLine($"Redirected output: {e.Data}");
            lastLine = e.Data;
        }
    }
}
