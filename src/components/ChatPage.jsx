import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("John Doe");

  const contacts = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Martin"];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", text: inputMessage },
      ]);
      setInputMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "20%", md: "25%" },
          borderRight: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Contacts
            </Typography>
          </Toolbar>
        </AppBar>

        <List>
          {contacts.map((contact, index) => (
            <ListItem
              button
              key={index}
              onClick={() => setSelectedUser(contact)}
              selected={selectedUser === contact}
            >
              <ListItemAvatar>
                <Avatar>{contact.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Window */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Chat with {selectedUser}
            </Typography>
            <IconButton color="inherit">
              {/* <MenuIcon /> */}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {messages.length === 0 ? (
            <Typography color="textSecondary" align="center">
              No messages yet. Start the conversation!
            </Typography>
          ) : (
            messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "You" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor:
                      message.sender === "You" ? "#3f51b5" : "#f0f0f0",
                    color: message.sender === "You" ? "#fff" : "#000",
                    borderRadius: 1,
                    maxWidth: "70%",
                  }}
                >
                  <Typography>{message.text}</Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Message Input */}
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            borderTop: "1px solid #ccc",
          }}
        >
          <InputBase
            placeholder="Type a message"
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            sx={{ flexGrow: 1, ml: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            // endIcon={<SendIcon />}
            onClick={handleSendMessage}
            sx={{ ml: 1 }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatApp;
