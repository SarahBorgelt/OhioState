
REM In windows, REM stands for remark and can be used to add commnets

REM "echo off" tells the command prompt not to display the commands themselves as they are executed. 
REM Normally, when you run a batch file, each line is printed to the terminal before it runs, 
REM which can look messy. Echo off hides that. Similarly, the @ symbol Prevents the command on that 
REM line itself from being printed. So @echo off hides the echo off command from showing in the terminal.
@echo off
REM =========================================
REM OSU Campus Map & Weather App Startup Script
REM =========================================

REM Navigate to the directory where the script is located. CD stands for change directory,
REM /d allows cd to switch drives if the target path is on a different drive than the current one.
REM %~dp0 is a special batch variable:
REM %0 → The full path and name of the batch file that is running.
REM ~dp → A modifier:
REM d → Drive letter of the batch file
REM p → Path (folder) of the batch file
REM 0 → Refers to the current batch file itself
cd /d %~dp0

REM Install dependencies if node_modules folder doesn't exist and inform the user
IF NOT EXIST "node_modules" (
     echo Installing dependencies...
     npm install
)

REM Start the Node.js server
echo Starting OhioStateWebsite on Windows...
npm start

REM Keep terminal open after execution
pause
