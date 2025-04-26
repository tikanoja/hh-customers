import { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  TextField,
  Stack
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Customer } from '../api/types';
import { apiClient } from '../api/apiclient';

interface AddTrainingForCustomerProps {
  customer: Customer;
  onTrainingAdded: () => void;
}

export const AddTrainingForCustomer = ({ customer, onTrainingAdded }: AddTrainingForCustomerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [duration, setDuration] = useState<number>(60);
  const [activity, setActivity] = useState<string>('');
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSave = () => {
    if (!date || !activity || duration <= 0) {
      alert('Please fill all required fields');
      return;
    }
    
    const training: any = {
      date: date.toISOString(),
      activity,
      duration,
      customer: customer._links?.self.href
    };
    
    apiClient.post<Training>('trainings', training)
      .then(() => {
        handleClose();
        onTrainingAdded();
        resetForm();
      })
      .catch(err => console.error('Error saving training:', err));
  };
  
  const resetForm = () => {
    setDate(dayjs());
    setDuration(60);
    setActivity('');
  };

  return (
    <>
      <Button 
        size="small" 
        color="primary" 
        onClick={handleOpen}
      >
        Add Training
      </Button>
      
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add Training for {customer.firstname} {customer.lastname}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date and Time"
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
            
            <TextField
              label="Activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              fullWidth
            />
            
            <TextField
              label="Duration (minutes)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};