Game.Options = [
    new Nucleus.GameOption(
        "Keyboard Player",
        "The player that will be playing on keyboard and mouse (if any)",
        Nucleus.KeyboardPlayer.NoKeyboardPlayer,
        "KeyboardPlayer"),
];
Game.ExecutableContext = [
    "binkw32.dll"
];
Game.KillMutex = [
    "SR3"
];

Game.SymlinkExe = false;
Game.SupportsKeyboard = true;
Game.ExecutableName = "saintsrowthethird_dx11.exe";
Game.SteamID = "55230";
Game.GUID = "55230";
Game.GameName = "Saints Row 3 (DX11)";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = true;
Game.LauncherTitle = "";
Game.SaveType = Nucleus.SaveType.None;
Game.SupportsPositioning = true;
Game.HideTaskbar = false;
Game.CustomXinput = true;
Game.StartArguments = "-windowed -NoLauncher -nostartupmovies";
Game.HookNeeded = true;
Game.HookGameWindowName = "Saints Row: The Third";
Game.LauncherExe = "game_launcher.exe";

Game.Play = function () { }