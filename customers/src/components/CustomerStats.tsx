import { useState, useEffect } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { apiClient } from '../api/apiclient';
import { Customer, TrainingWithCustomer } from '../api/types';
import _ from 'lodash';

interface CustomerStatsProps {
  customer: Customer;
}

interface ActivityStat {
  activity: string;
  minutes: number;
}

export const CustomerStats = ({ customer }: CustomerStatsProps) => {
  if (!customer) {
    return <span>No data</span>;
  }
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<ActivityStat[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  
  const handleOpen = () => {
    setOpen(true);
    fetchTrainingStats();
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const fetchTrainingStats = async () => {
    setLoading(true);
    try {
      // fetch all trainings
      const trainings = await apiClient.get<TrainingWithCustomer[]>('gettrainings');
      
      // filter trainings for the specific customer
      const customerTrainings = trainings.filter(training => 
        training.customer && 
        training.customer.firstname === customer.firstname && 
        training.customer.lastname === customer.lastname
      );
      
      // sort by activity name and calculate total minutes
      const grouped = _.groupBy(customerTrainings, 'activity');
      const activityStats: ActivityStat[] = [];
      let total = 0;
      
      // we need to convert  the grouped data to array of objects
      Object.entries(grouped).forEach(([activity, trainings]) => {
        const minutes = _.sumBy(trainings, 'duration');
        activityStats.push({ activity, minutes });
        total += minutes;
      });
      
      const sortedStats = _.orderBy(activityStats, ['minutes'], ['desc']);
      
      setStats(sortedStats);
      setTotalMinutes(total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching training stats:', error);
      setLoading(false);
    }
  };
  
  return (
    <>
      <Button 
        size="small" 
        color="info" 
        onClick={handleOpen}
      >
        Stats
      </Button>
      
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Training Statistics: {customer.firstname} {customer.lastname}
        </DialogTitle>
        
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Total training minutes: {totalMinutes}
              </Typography>
              
              {stats.length > 0 ? (
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="activity" />
                      <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="minutes" name="Training Minutes" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Typography variant="body1">
                  No training data available for this customer.
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};