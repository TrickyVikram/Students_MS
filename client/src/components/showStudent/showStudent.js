import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: theme.spacing(2),
  },
}));

export default function ShowStudent() {
  const classes = useStyles();
  const [studentList, setStudentList] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    _id: '',
    regId: '',
    name: '',
    course: '',
    section: '',
  });

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  const updateStudent = () => {
    axios.put(`http://localhost:80/students/${selectedStudent._id}`, selectedStudent)
      .then(() => {
        setStudentList((prevList) => 
          prevList.map((student) =>
            student._id === selectedStudent._id ? selectedStudent : student
          )
        );
        handleClose();
      })
      .catch((err) => {
        setError('Failed to update student.');
      });
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:80/students/${id}`)
      .then(() => {
        setStudentList((prevList) => prevList.filter((student) => student._id !== id));
      })
      .catch((err) => {
        setError('Failed to delete student.');
      });
  };

  useEffect(() => {
    axios.get('http://localhost:80/students')
      .then((response) => {
        setStudentList(response.data);
        setError('');
      })
      .catch((err) => {
        setError('Failed to fetch student data.');
      });
  }, []);

  return (
    <>
      <h1>All Students</h1>
      {error && <div className={classes.error}>{error}</div>}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">RegId</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Course</TableCell>
              <TableCell align="center">Section</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No students available</TableCell>
              </TableRow>
            ) : (
              studentList.map((student) => (
                <TableRow key={student._id}>
                  <TableCell align="center">{student.regId}</TableCell>
                  <TableCell align="center">{student.name}</TableCell>
                  <TableCell align="center">{student.course}</TableCell>
                  <TableCell align="center">{student.section}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" onClick={() => handleOpen(student)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => deleteStudent(student._id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2>Edit Student</h2>
          <form noValidate autoComplete="off">
            <TextField
              label="RegId"
              name="regId"
              value={selectedStudent.regId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              name="name"
              value={selectedStudent.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Course"
              name="course"
              value={selectedStudent.course}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Section"
              name="section"
              value={selectedStudent.section}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={updateStudent}>
              Update Student
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
