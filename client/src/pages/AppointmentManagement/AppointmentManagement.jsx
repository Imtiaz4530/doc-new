import { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Alert,
  Divider,
  Box,
} from "@mui/material";

import axiosInstance from "../../api/axiosInstance";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

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

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(`/api/appointments/doctor/me`);
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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
        Appointments for Dr. {appointments[0]?.doctor?.name || "Loading..."}
      </Typography>
      {appointments.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No appointments found.
        </Typography>
      ) : (
        <Box maxHeight="60vh" overflow="auto">
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
                        {appointment?.patient?.name.toUpperCase()}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default AppointmentManagement;
