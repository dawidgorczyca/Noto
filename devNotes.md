# Technical plan
## TODO:
1. TO BE RESEARCHED: How to communicate between two renderer processes?
2. Backend plan:
* Daemon - module used for spawning node processes and handling their communication
* Storage - module for saving user configs, app data
3. Ipc Layer definitions:
  1. Event object:
  `{
    topic: sting,
    payload: object/void,
  }`
  2. Typical payload:
  `{
    client: string,
    data: object
  }`
  3. TOPIC = COMMUNICATION CHANNEL NAME
2. Prepare wireframes
3. Prepare visual design
## DONE:
* How to include processes to spawn with parcel? DONE:
  1. Pack it with parcel, define it in package.json
  2. Target it properly using path.join in main.ts
  3. Use it
* Communication by IPC DONE:
  1. Main.ts is the main bridge of communication between all processes
* Use renderers to spawn backend processes instead of spawning? DONE:
  Instead of using renderer process i'm just forking processes
