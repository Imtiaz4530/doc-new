// import { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Container,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// const AppointmentDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axiosInstance.get(
//           "/api/appointments/patient/me"
//         );
//         setAppointments(response.data);
//       } catch (err) {
//         setError("Failed to fetch appointments.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);
//   console.log(appointments);
//   if (loading)
//     return (
//       <Container>
//         <CircularProgress />
//         <Typography>Loading appointments...</Typography>
//       </Container>
//     );

//   if (error)
//     return (
//       <Container>
//         <Alert severity="error">{error}</Alert>
//       </Container>
//     );

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Your Appointments
//       </Typography>
//       <Grid container spacing={3}>
//         {appointments.length > 0 ? (
//           appointments.map((appointment) => (
//             <Grid item xs={12} sm={6} md={4} key={appointment._id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">
//                     {appointment?.doctor?.name}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Date: {new Date(appointment?.date).toLocaleDateString()}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Time: {appointment?.time}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Status: {appointment?.status}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Reason: {appointment?.reason}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography>No appointments found.</Typography>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default AppointmentDashboard;

import { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";

const statusStyles = {
  pending: {
    borderLeft: "5px solid orange",
  },
  confirmed: {
    borderLeft: "5px solid green",
  },
  completed: {
    borderLeft: "5px solid blue",
  },
  cancelled: {
    borderLeft: "5px solid red",
  },
};

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Alert,
  Divider,
  Box,
  Button,
} from "@mui/material";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const setChatParticipants = useStoreActions(
    (actions) => actions.chat.setChatParticipants
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/appointments/patient/me"
        );
        setAppointments(response.data);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to fetch appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStartChat = (userId, doctorId) => {
    setChatParticipants({ userId, doctorId });
    navigate("/chat");
  };

  if (loading)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );

  if (error)
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Appointments
      </Typography>
      {
        <Box maxHeight="60vh" overflow="auto">
          {appointments.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              You have no appointments.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {appointments.map((appointment) => (
                <Grid item xs={12} key={appointment._id}>
                  <Card elevation={3} style={statusStyles[appointment?.status]}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <AssignmentIndIcon
                          color="primary"
                          style={{ marginRight: 8 }}
                        />
                        <Typography variant="h6">
                          {appointment?.doctor?.name}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <CalendarTodayIcon
                          color="action"
                          style={{ marginRight: 8 }}
                        />
                        <Typography variant="body2">
                          {`Date: ${new Date(
                            appointment?.date
                          ).toLocaleDateString()}`}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <AccessTimeIcon
                          color="action"
                          style={{ marginRight: 8 }}
                        />
                        <Typography variant="body2">
                          {`Time: ${appointment?.time}`}
                        </Typography>
                      </Box>
                      <Typography variant="body2">{`Status: ${appointment?.status}`}</Typography>
                      <Divider sx={{ mt: 2 }} />

                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleStartChat(
                              appointment?.patient,
                              appointment?.doctor?._id
                            )
                          }
                        >
                          Start Chat
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      }
    </Container>
  );
};

export default AppointmentDashboard;
