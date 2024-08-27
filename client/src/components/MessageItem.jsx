/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

const MessageItem = ({ message }) => {
  console.log(message);

  const isOwnMessage = true;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isOwnMessage ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          p: 2,
          borderRadius: 2,
          bgcolor: isOwnMessage ? "primary.main" : "grey.200",
          color: isOwnMessage ? "white" : "black",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {message?.sender?.name}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {message?.content}
        </Typography>
        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          {format(new Date(message?.createdAt), "PPPp")}
        </Typography>
      </Box>
    </Box>
  );
};

// MessageItem.propTypes = {
//   message: PropTypes.shape({
//     sender: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       isOwn: PropTypes.bool.isRequired,
//     }).isRequired,
//     content: PropTypes.string.isRequired,
//     timestamp: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default MessageItem;
