
import React, { useState, useEffect } from "react";
import {
    Routes,
    Route,
    NavLink,
    Link
} from "react-router-dom";
import "./App.css";

// HOME PAGE
function Home({ welcomeMessage }) {
    return (
        <>
            <section className="welcome-banner">
                <h2>{welcomeMessage}</h2>
                <p>
                    Manage student registration, view student information,
                    and find students easily.
                </p>
            </section>

            <section className="page-card">
                <h1>Welcome to Student Portal</h1>
                <p>
                    Your simple system for registering and managing students.
                </p>
                <Link to="/register" className="button-link">
                    Register a Student
                </Link>
            </section>
        </>
    );
}

// REGISTRATION PAGE
function Register({ addStudent }) {
    // useState manages the registration form inputs
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!name.trim() || !age || !course) {
            setMessage("Please fill in all fields.");
            return;
        }

        addStudent({
            id: `${Date.now()}-${Math.random()}`,
            name: name.trim(),
            age,
            course
        });

        setName("");
        setAge("");
        setCourse("");
        setMessage("Student registered successfully!");
    }

    return (
        <section className="page-card">
            <h1>Register a Student</h1>
            <p>Enter the student's information below.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="studentName">Student Name</label>
                <input
                    id="studentName"
                    type="text"
                    placeholder="Enter student name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <label htmlFor="studentAge">Age</label>
                <input
                    id="studentAge"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Enter age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    required
                />

                <label htmlFor="studentCourse">Course</label>
                <select
                    id="studentCourse"
                    value={course}
                    onChange={(event) => setCourse(event.target.value)}
                    required
                >
                    <option value="">Select a course</option>
                    <option value="Software Development">
                        Software Development
                    </option>
                    <option value="Computer Systems">
                        Computer Systems
                    </option>
                    <option value="Networking">Networking</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Other">Other</option>
                </select>

                <button type="submit">Register Student</button>
            </form>

            {message && (
                <p className="form-message" role="status">
                    {message}
                </p>
            )}
        </section>
    );
}

// STUDENTS PAGE WITH SEARCH
function Students({ students }) {
    // useState manages the search input
    const [search, setSearch] = useState("");

    // Find students whose names match the search
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <section className="page-card">
            <h1>Registered Students</h1>
            <p>Search for a student by name.</p>

            <label htmlFor="studentSearch">Search Student</label>
            <input
                id="studentSearch"
                type="search"
                placeholder="Type a student's name..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <p className="student-count">
                Students found: {filteredStudents.length}
            </p>

            {students.length === 0 ? (
                <p>No students registered yet. Register a student first.</p>
            ) : filteredStudents.length === 0 ? (
                <p>No student found matching "{search}".</p>
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Course</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                    <td>{student.course}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

// ABOUT PAGE
function About() {
    return (
        <section className="page-card">
            <h1>About Student Portal</h1>
            <p>
                Student Portal is a React application that helps users
                register students, view student information, and search
                for registered students by name.
            </p>
        </section>
    );
}

// MAIN APPLICATION
export default function App() {
    // useState manages all registered student information
    const [students, setStudents] = useState([]);

    // useState manages the welcome message
    const [welcomeMessage, setWelcomeMessage] = useState("");

    // useEffect displays the welcome message when the app loads
    useEffect(() => {
        setWelcomeMessage("Welcome to Student Portal!");
    }, []);

    function addStudent(student) {
        setStudents((previousStudents) => [
            ...previousStudents,
            student
        ]);
    }

    return (
        <div className="app">
            {/* Navigation bar */}
            <nav className="navbar">
                <Link to="/" className="logo">
                    Student Portal
                </Link>

                <div className="nav-links">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/students">Students</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </nav>

            {/* Page content */}
            <main className="container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home welcomeMessage={welcomeMessage} />
                        }
                    />

                    <Route
                        path="/register"
                        element={<Register addStudent={addStudent} />}
                    />

                    <Route
                        path="/students"
                        element={<Students students={students} />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="*"
                        element={
                            <section className="page-card">
                                <h1>Page Not Found</h1>
                                <Link to="/">Return to Home</Link>
                            </section>
                        }
                    />
                </Routes>
            </main>

            <footer>
                Student Registration System | Built with React
            </footer>
        </div>
    );
}
