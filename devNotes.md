# Technical plan
## TODO:
2. Backend plan:
* Process Daemon - module used for spawning node processes and handling their communication
* Storage - module for saving user configs, app data
3. Process Communication Layer (PCL) definitions:
  1. Event object:
  `{
    eventId: string,
    topic: string,
    client: {
      name: string,
      id: string
    },
    payload: object/void,
  }`
  2. TOPIC = COMMUNICATION CHANNEL NAME/[SERVICE].[SERVICE_NAME].[SERVICE_METHOD]
  3. Client - client identification
4. Frontend communication
4. Prepare wireframes
5. Prepare visual design
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