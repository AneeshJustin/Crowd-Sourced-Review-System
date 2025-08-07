import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Button } from '@mui/material';

const ProfilePage = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ width: 350, padding: 3, textAlign: 'center' }}>
          <Avatar
            alt="User Avatar"
            src="/profile.jpg"
            sx={{ width: 100, height: 100, margin: '0 auto', marginBottom: 2 }}
          />
          <CardContent>
            <Typography variant="h5">ANEESH</Typography>
            <Typography variant="body2" color="textSecondary">
              Aneeshjustinoo7@gmial.com
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Software Developer passionate about building amazing user interfaces and solving problems with code.
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
