# Technical plan
## TODO:
* Splash screen - animation then take it to the main screen
* Frontend implementation:
  1. Base interface
  2. Main scren viewer/editor:
    
## DONE:
* How to include processes to spawn with parcel? DONE:
  1. Pack it with parcel, define it in package.json
  2. Target it properly using path.join in main.ts
  3. Use it
  4. In dev mode is important to set subfolders in parcel directory, without it you might run into problems with directory usage
* Communication by IPC DONE:
  1. Main.ts is the place that starts all main processes
* Use renderers to spawn backend processes instead of spawning? DONE:
  Instead of using renderer process i'm just forking processes
* How to communicate between two renderer processes? You can use literally anything you want. I've went with websockets to keep it completly separated from Electron process.
* Basic visual design DONE:
  Inspired by old amber colored monitors and terminal applications
* Renderers/Forked Processes/Main Process communication DONE:
  Everything works on websockets, renderers and forked processes need to setup a ws client and just use it. The only sideway from this rule is the rednerer.handler which passes the events targeting it from events to the main process to assume control of targeted renderer.
  Besides that, the topic is the most important part of the event. It defines the targeted events group, the data object and the method requested.