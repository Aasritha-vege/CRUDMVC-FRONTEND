import React, { useState } from 'react';
import { Card, TextField, Button, Typography, Box, Divider } from '@mui/material';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');
    const [editingIndex, setEditingIndex] = useState(null); // Track the student being edited

    const handleAddStudent = () => {
        if (name && age && grade) {
            const newStudent = { name, age, grade };
            setStudents([...students, newStudent]);
            setName('');
            setAge('');
            setGrade('');
        }
    };

    const handleDelete = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
        const student = students[index];
        setName(student.name);
        setAge(student.age);
        setGrade(student.grade);
        setEditingIndex(index); // Set the student index to be edited
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const updatedStudents = [...students];
            updatedStudents[editingIndex] = { name, age, grade };
            setStudents(updatedStudents);
            setName('');
            setAge('');
            setGrade('');
            setEditingIndex(null); // Reset editing
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#f5f5f5', // Light background color for the page
            }}
        >
            <Card
                sx={{
                    width: '500px',
                    padding: '20px',
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: 'center',
                    bgcolor: 'white', // Card background color
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Student Management System
                </Typography>

                <Typography variant="h6" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
                    Student List
                </Typography>

                <Box display="flex" gap="10px" mb="20px" justifyContent="center">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ width: '30%' }}
                    />
                    <TextField
                        label="Age"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        sx={{ width: '20%' }}
                    />
                    <TextField
                        label="Grade"
                        variant="outlined"
                        size="small"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        sx={{ width: '20%' }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={editingIndex !== null ? handleSaveEdit : handleAddStudent}
                        sx={{ textTransform: 'none', padding: '6px 12px' }}
                    >
                        {editingIndex !== null ? 'Save Edit' : 'Add Student'}
                    </Button>
                </Box>

                <Divider sx={{ marginBottom: '20px' }} />

                {students.map((student, index) => (
                    <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        padding="10px"
                        mb="8px"
                        borderRadius="5px"
                        bgcolor="#f9f9f9"
                        sx={{
                            boxShadow: 1,
                            '&:hover': {
                                backgroundColor: '#e0f7fa',
                            },
                        }}
                    >
                        <Typography variant="body1">
                            {student.name} - Age: {student.age}, Grade: {student.grade}
                        </Typography>
                        <Box display="flex" gap="10px">
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                size="small" 
                                onClick={() => handleEdit(index)} // Trigger edit on button click
                                sx={{ textTransform: 'none', minWidth: '60px' }}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                size="small" 
                                onClick={() => handleDelete(index)}
                                sx={{ textTransform: 'none', minWidth: '60px' }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Card>
        </Box>
    );
};

export default StudentList;