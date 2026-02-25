import {
  Box, Typography, Grid, Paper,
  Avatar, Chip, Stack, LinearProgress
} from '@mui/material';
import {
  Science, LibraryBooks, CalendarToday,
  Devices, Handshake, TrendingUp,
  CheckCircle, Error, Warning,
  People, AttachMoney, BarChart
} from '@mui/icons-material';

const sidebarItems = [
  { label: "Lab Booking", count: 8, color: "#FF9800", icon: <CalendarToday /> },
  { label: "Equipment", count: 24, color: "#9C27B0", icon: <Devices /> },
  { label: "Collaboration", count: 12, color: "#E91E63", icon: <Handshake /> },
];

const labStatus = [
  { lab: "Chemistry Lab", status: "active", usage: 85, bookings: 3 },
  { lab: "Biology Lab", status: "active", usage: 70, bookings: 2 },
  { lab: "Physics Lab", status: "maintenance", usage: 40, bookings: 1 },
  { lab: "Computer Lab", status: "active", usage: 95, bookings: 5 },
];

const recentActivities = [
  { action: "New lab booking confirmed", time: "2 hours ago", icon: <CalendarToday /> },
  { action: "Equipment maintenance completed", time: "5 hours ago", icon: <Devices /> },
  { action: "Research paper published", time: "1 day ago", icon: <LibraryBooks /> },
  { action: "New collaboration started", time: "2 days ago", icon: <Handshake /> },
  { action: "Grant funding received", time: "3 days ago", icon: <AttachMoney /> },
];

const equipmentStatus = [
  { name: "Microscope", status: "available", lastUsed: "Today" },
  { name: "Centrifuge", status: "in-use", lastUsed: "Now" },
  { name: "PCR Machine", status: "maintenance", lastUsed: "2 days ago" },
  { name: "Spectrometer", status: "available", lastUsed: "Yesterday" },
  { name: "Incubator", status: "available", lastUsed: "Today" },
];

const weeklyUsage = [
  { day: "Mon", usage: 65 },
  { day: "Tue", usage: 80 },
  { day: "Wed", usage: 70 },
  { day: "Thu", usage: 90 },
  { day: "Fri", usage: 75 },
  { day: "Sat", usage: 40 },
  { day: "Sun", usage: 20 },
];

const Dashboard = () => {

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Lab Dashboard
        </Typography>
      </Box>

      {/* Top cards */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {sidebarItems.map((item, index) => (
            <Grid item key={index}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                minWidth: 100,
                cursor: 'pointer',
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: '#f0f2f5',
                  transform: 'translateY(-2px)'
                }
              }}>
                <Avatar sx={{ bgcolor: item.color, mb: 1 }}>
                  {item.icon}
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ color: item.color, fontWeight: 'bold', mt: 0.5 }}>
                  {item.count}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Science sx={{ fontSize: 40, color: '#3498db', mb: 2 }} />
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>5</Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>Active Labs</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <People sx={{ fontSize: 40, color: '#2ecc71', mb: 2 }} />
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>42</Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>Active Peoples</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <BarChart sx={{ fontSize: 40, color: '#e74c3c', mb: 2 }} />
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>85%</Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>Overall Usage</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <TrendingUp sx={{ fontSize: 40, color: '#9b59b6', mb: 2 }} />
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>23</Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>This Week</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center">

        {/* Lab Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
              Lab Status & Usage
            </Typography>
            <Stack spacing={2}>
              {labStatus.map((lab, index) => (
                <Box key={index} sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {lab.lab}
                    </Typography>
                    <Chip
                      label={lab.status}
                      size="small"
                      color={lab.status === 'active' ? 'success' : 'warning'}
                      icon={lab.status === 'active' ? <CheckCircle /> : <Warning />}
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        Usage: {lab.usage}%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        Bookings: {lab.bookings}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={lab.usage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#ecf0f1',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: lab.usage > 80 ? '#2ecc71' : lab.usage > 60 ? '#3498db' : '#f39c12'
                        }
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
              Recent Activities
            </Typography>
            <Stack spacing={2}>
              {recentActivities.map((activity, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  bgcolor: '#f8f9fa',
                  borderRadius: 2
                }}>
                  <Avatar sx={{
                    bgcolor: '#e3f2fd',
                    color: '#3498db',
                    mr: 2,
                    width: 40,
                    height: 40
                  }}>
                    {activity.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Equipment Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
              Equipment Status
            </Typography>
            <Grid container spacing={2}>
              {equipmentStatus.map((equip, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: equip.status === 'available' ? '#d5f4e6' :
                      equip.status === 'in-use' ? '#ffeaa7' : '#ffcccb',
                    bgcolor: equip.status === 'available' ? '#f8fff9' :
                      equip.status === 'in-use' ? '#fff9e6' : '#fff5f5',
                    borderRadius: 2
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {equip.status === 'available' ? (
                        <CheckCircle sx={{ color: '#2ecc71', mr: 1, fontSize: 20 }} />
                      ) : equip.status === 'in-use' ? (
                        <Warning sx={{ color: '#f39c12', mr: 1, fontSize: 20 }} />
                      ) : (
                        <Error sx={{ color: '#e74c3c', mr: 1, fontSize: 20 }} />
                      )}
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {equip.name}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{
                      color: equip.status === 'available' ? '#27ae60' :
                        equip.status === 'in-use' ? '#e67e22' : '#c0392b',
                      fontWeight: 'medium'
                    }}>
                      {(equip.status || "").toUpperCase()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5 }}>
                      Last used: {equip.lastUsed}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Weekly Usage */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
              Weekly Lab Usage
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 200, gap: 1 }}>
              {weeklyUsage.map((day, index) => (
                <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                  <Box sx={{
                    height: `${day.usage * 2}px`,
                    bgcolor: day.usage > 80 ? '#2ecc71' : day.usage > 60 ? '#3498db' : '#f39c12',
                    borderRadius: '4px 4px 0 0',
                    mb: 1,
                    position: 'relative',
                    transition: 'height 0.3s'
                  }}>
                    <Typography variant="caption" sx={{
                      position: 'absolute',
                      top: -25,
                      left: 0,
                      right: 0,
                      color: '#2c3e50',
                      fontWeight: 'bold'
                    }}>
                      {day.usage}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', fontWeight: 'medium' }}>
                    {day.day}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{
        mt: 3,
        p: 2,
        textAlign: 'center',
        bgcolor: '#2c3e50',
        color: 'white',
        borderRadius: 2
      }}>
        <Typography variant="body2">
          Lab Management System • Last updated: Today, 3:45 PM
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;