import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface IProps {
  title: string;
  open: boolean;
  setOpen: (status: boolean) => void;
  onConfirm: (...args: any[]) => void;
  children?: any;
}

const ConfirmDialog: React.FC<IProps> = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby='confirm-dialog'>
      <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => setOpen(false)} color='primary'>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color='error'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
