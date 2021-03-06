﻿Game.Options = [
    new Nucleus.GameOption(
        "Keyboard Player",
        "The player that will be playing on keyboard and mouse (if any)",
        Nucleus.KeyboardPlayer.NoKeyboardPlayer,
        "KeyboardPlayer"),
    new Nucleus.GameOption(
        "Save ID - Player 1",
        "Save ID to use for Player 1 (default 0)",
        0,
        "saveid0"),
    new Nucleus.GameOption(
        "Save ID - Player 2",
        "Save ID to use for Player 2 (default 1)",
        1,
        "saveid1"),
    new Nucleus.GameOption(
        "Save ID - Player 3",
        "Save ID to use for Player 3 (default 2)",
        2,
        "saveid2"),
    new Nucleus.GameOption(
        "Save ID - Player 4",
        "Save ID to use for Player 4 (default 3)",
        3,
        "saveid3")
];
Game.KillMutex = [ // 2nd instance won't launch with these removed
    "hl2_singleton_mutex",
    "steam_singleton_mutext"
];
Game.SymlinkIgnore = [
    "video.txt"
];


Game.BinariesFolder = "";
Game.RootGameFolderPath = "";
Game.XInputFolder = "bin";
Game.ExecutablePath = "";

Game.Debug = true;
Game.SymlinkExe = false;
Game.SupportsKeyboard = true;
Game.ExecutableName = "left4dead2.exe";
Game.SteamID = "550";
Game.GUID = "550";
Game.GameName = "Left 4 Dead 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.NeedsSteamEmulation = true;
Game.LauncherTitle = "";
Game.SaveType = Nucleus.SaveType.CFG;
Game.SupportsPositioning = true;
Game.HideTaskbar = false;
Game.CustomXinput = true;
Game.StartArguments = "-novid -steam";
Game.XInputFiles = ["xinput1_3.dll", "x360ce.ini"];

Game.Play = function () {
    Context.ModifySave = [
        new Nucleus.CfgSaveInfo("VideoConfig", "setting.fullscreen", "0"),
        new Nucleus.CfgSaveInfo("VideoConfig", "setting.defaultres", Context.Width),
        new Nucleus.CfgSaveInfo("VideoConfig", "setting.defaultresheight", Context.Height),
        new Nucleus.CfgSaveInfo("VideoConfig", "setting.nowindowborder", "0"),
    ];

    Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\video.txt";

    if (Context.IsKeyboardPlayer) {
        Handler.StartPlayTick(1, function () {
            Handler.CenterCursor();
        });
    }
}