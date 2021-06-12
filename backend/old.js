const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "live_chat",
});
app.use("/chat_messages", (req, res) => {
  db.query("SELECT * FROM chat_messages", (error, messages) => {
    res.end();
  });
});
app.use(express.static(path.join(__dirname, "public")));
const botName = "Admin";
io.on("connection", socket => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    db.query("INSERT INTO users (username) VALUES (' " + username + " ')");
    socket.join(user.room);
    socket.emit(
      "message",
      formatMessage(
        botName,
        `${username} you're welcome to laronshalley customer support`
      )
    );
    // broadcast a message when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(
          botName,
          ` ${user.username} has connected to the live chat`
        )
      );
    // get room users
    // io.to(user.room).emit("rootUsers", {
    //   room: user.room,
    //   users: getRoomUsers(room),
    // });
  });
  // listen for events from the client
  socket.on("chatMessage", msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
    db.query("INSERT INTO chat_messages (messages) VALUES (' " + msg + " ')");
  });
  // disconnects when a user closes the tab
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `oops ${user.username} is disconnected`)
      );
    }
    // // get room users
    // io.to(user.room).emit("rootUsers", {
    //   room: user.room,
    //   users: getRoomUsers(room),
    // });
  });
});
const PORT = 5000 || process.env.PORT;
http.listen(PORT, () => console.log("server is listening on port 5000"));