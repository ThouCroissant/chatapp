# chatapp - Anonymous Group Chat Room

## Project Overview
A fun, real-time group chat web app where anyone can join without signing up. Instead of usernames and passwords, each user picks a **3-letter word** (e.g. "fox", "sky", "ace") to identify themselves in the chat. Everyone who visits the site is connected to the same global chat room.

## Core Features
- **Room password** — a single shared password that anyone needs to enter to access the chat
- **No login required** — just enter the room password, pick a 3-letter word, and start chatting
- **Real-time messaging** — messages appear instantly for all connected users
- **Global chat room** — everyone on the site is in the same conversation
- **Simple and fun** — clean UI that anyone can use immediately

## Tech Stack
- **Frontend:** React + Vite
- **Real-time communication:** Socket.io (client)
- **Backend:** Node.js + Express + Socket.io (server)
- **Styling:** CSS or Tailwind CSS

## How It Works
1. User visits the site
2. A prompt asks them to enter the **room password**
3. If the password is correct they proceed to the next step
4. If the password is wrong they see an error and cannot continue
5. User picks or types a 3-letter word (e.g. "cat", "ray", "zen")
6. If the word is already taken by an active user, they must pick another
7. User enters the chat room and can send messages to everyone
8. Messages show the sender's 3-letter word + their message
9. When a user disconnects, their 3-letter word becomes available again

## Password Implementation Notes
- The room password should be stored as an environment variable on the server (e.g. `ROOM_PASSWORD` in a `.env` file)
- Password verification should happen on the **server side** via a Socket.io event, not the frontend
- Never expose the password in the client side code
- Add a `.env.example` file showing `ROOM_PASSWORD=yourpassword` so the owner knows how to set it
- Add `.env` to `.gitignore` so the password is never accidentally pushed to GitHub

## Project Structure
```
chatapp/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Chat.jsx           # Main chat room
│   │   │   ├── MessageList.jsx    # Scrollable message feed
│   │   │   ├── MessageInput.jsx   # Text input + send button
│   │   │   ├── NamePicker.jsx     # 3-letter word selection screen
│   │   │   └── PasswordScreen.jsx # Room password entry screen
│   │   └── main.jsx
├── server/          # Node.js + Express + Socket.io backend
│   ├── index.js     # Main server file
│   ├── .env         # Contains ROOM_PASSWORD (never commit this)
│   └── .env.example # Template showing required env variables
└── package.json
```

## Design Notes
- Keep the UI clean, minimal, and fun
- Show a list of currently active users (their 3-letter words) in a sidebar
- Show a system message when someone joins or leaves (e.g. "fox has joined the chat")
- Messages should have timestamps
- The name picker screen should validate that the word is exactly 3 letters
- Mobile friendly layout

## Development Notes
- Run the backend server and frontend dev server separately
- Backend runs on port 3001
- Frontend runs on port 5173
- Use Socket.io for all real-time communication between client and server
- Store the room password in a `.env` file and load it with the `dotenv` package

## Deployment

### Frontend → Vercel
1. Push the project to GitHub
2. Go to vercel.com and sign in with GitHub
3. Click New Project and import the chatapp repo
4. Set the root directory to `client`
5. Add environment variable: `VITE_SERVER_URL=<your Railway backend URL>`
6. Deploy — Vercel will give you a free URL like `chatapp.vercel.app`

### Backend → Railway
1. Go to railway.app and sign in with GitHub
2. Click New Project → Deploy from GitHub repo
3. Select the chatapp repo and set the root directory to `server`
4. Add environment variable: `ROOM_PASSWORD=yourpassword`
5. Railway will give you a public URL like `chatapp.up.railway.app`
6. Make sure the frontend's `VITE_SERVER_URL` points to this Railway URL

### Important
- Always deploy the backend first so you have the Railway URL ready for the frontend
- Update the Socket.io client in the frontend to connect to `VITE_SERVER_URL` in production
- Add `VITE_SERVER_URL` to `.env.example` so it's documented

## Instructions for Claude Code
If asked to update this file, Claude Code should:
- Add new features or requirements under the relevant existing section
- Add new sections at the bottom if the topic doesn't fit anywhere else
- Never remove existing content unless explicitly asked to
- Keep formatting consistent with the rest of the file
- Update the Project Structure tree if new files or folders are added
