
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function App() {
    // Manage registration form information
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");

    // Manage registered students
    const [students, setStudents] = useState([]);

    // Manage search and navigation
    const [search, setSearch] = useState("");
    const [page, setPage] = useState("Home");
    const [welcome, setWelcome] = useState("");

    // Display welcome message when the app loads
    useEffect(() => {
        setWelcome("Welcome! Your Student Portal is ready.");
    }, []);

    // Register a student
    function handleRegister(event) {
        event.preventDefault();

        if (!name.trim() || !age || !course.trim()) {
            alert("Please complete all fields.");
            return;
        }

        const newStudent = {
            id: Date.now(),
            name: name.trim(),
            age: Number(age),
            course: course.trim(),
        };

        setStudents((previous) => [...previous, newStudent]);

        setName("");
        setAge("");
        setCourse("");
        setSearch("");
        setPage("Students");
    }

    // Find students by name
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <>
            <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f3f6fc;
          color: #172554;
        }

        button, input {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          background: #172554;
          color: white;
          padding: 14px 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          box-shadow: 0 4px 15px #17255420;
        }

        .brand {
          font-size: 25px;
          font-weight: 800;
          letter-spacing: -0.7px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .nav-button {
          border: none;
          background: transparent;
          color: #e2e8f0;
          padding: 12px 17px;
          border-radius: 9px;
          font-weight: 600;
          transition: 0.2s;
        }

        .nav-button:hover,
        .nav-button.active {
          background: #2563eb;
          color: white;
        }

        .main {
          width: min(1050px, 90%);
          margin: 38px auto;
          flex: 1;
        }

        .page-heading {
          margin-bottom: 22px;
        }

        .page-heading h1 {
          font-size: clamp(25px, 4vw, 34px);
          margin: 0 0 12px;
          color: #172554;
        }

        .page-heading p {
          color: #64748b;
          line-height: 1.7;
          margin: 0;
        }

        .welcome {
          background: #e0f2fe;
          color: #075985;
          border: 1px solid #bae6fd;
          border-radius: 10px;
          padding: 13px 16px;
          margin: 22px 0;
          line-height: 1.5;
        }

        .card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: clamp(22px, 4vw, 38px);
          margin-top: 22px;
          box-shadow: 0 12px 35px #1725540c;
        }

        .hero {
          padding: clamp(28px, 6vw, 55px);
          background: linear-gradient(135deg, #ffffff, #eaf1ff);
        }

        .hero-label {
          color: #2563eb;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1.5px;
        }

        .hero h2 {
          font-size: clamp(30px, 5vw, 43px);
          line-height: 1.2;
          margin: 15px 0;
          color: #172554;
        }

        .hero p {
          color: #64748b;
          line-height: 1.8;
          max-width: 600px;
        }

        .primary-button {
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 9px;
          padding: 14px 21px;
          font-weight: 700;
          margin-top: 12px;
          transition: 0.2s;
        }

        .primary-button:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .section-title {
          margin-top: 0;
          margin-bottom: 8px;
          font-size: 23px;
        }

        .muted {
          color: #64748b;
          line-height: 1.7;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 25px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        .field label {
          font-weight: 700;
          font-size: 14px;
          color: #334155;
        }

        .field input, .search-input {
          width: 100%;
          padding: 14px 15px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          outline: none;
          background: white;
          color: #172554;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .field input:focus, .search-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px #2563eb20;
        }

        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .secondary-button {
          padding: 13px 19px;
          border: 1px solid #cbd5e1;
          background: white;
          color: #334155;
          border-radius: 9px;
          font-weight: 600;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 22px;
        }

        .stat {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 22px;
          border-radius: 14px;
        }

        .stat strong {
          display: block;
          color: #2563eb;
          font-size: 28px;
          margin-bottom: 7px;
        }

        .stat span {
          color: #64748b;
          font-size: 13px;
        }

        .search-box {
          margin: 22px 0;
        }

        .table-wrap {
          overflow-x: auto;
          margin-top: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 450px;
        }

        th {
          background: #eff4ff;
          color: #334155;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        th, td {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        tbody tr:hover {
          background: #f8faff;
        }

        .student-name {
          font-weight: 700;
          color: #172554;
        }

        .empty {
          padding: 28px;
          text-align: center;
          background: #f8fafc;
          border-radius: 12px;
          color: #64748b;
          line-height: 1.7;
        }

        .footer {
          margin-top: 30px;
          background: #172554;
          color: #e2e8f0;
          padding: 25px 15px;
          text-align: center;
          line-height: 1.8;
        }

        .footer small {
          color: #b8c5e0;
        }

        @media (max-width: 650px) {
          .navbar {
            justify-content: center;
            text-align: center;
          }

          .nav-links {
            justify-content: center;
          }

          .nav-button {
            padding: 10px 12px;
          }

          .main {
            margin: 27px auto;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .field.full, .form-actions {
            grid-column: auto;
          }

          .stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

            <div className="app">
                {/* Navigation */}
                <nav className="navbar">
                    <div className="brand">Student Portal</div>

                    <div className="nav-links">
                        {["Home", "Register", "Students", "About"].map((item) => (
                            <button
                                key={item}
                                className={`nav-button ${page === item ? "active" : ""}`}
                                onClick={() => setPage(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Page content */}
                <main className="main">
                    <header className="page-heading">
                        <h1>
                            {page === "Home" && "Welcome to Student Portal!"}
                            {page === "Register" && "Student Registration"}
                            {page === "Students" && "Manage Students"}
                            {page === "About" && "About Student Portal"}
                        </h1>

                        <p>
                            Manage student registration, view student information,
                            and find students easily.
                        </p>
                    </header>

                    {welcome && (
                        <div className="welcome" role="status">
                            <strong>✓ </strong>{welcome}
                        </div>
                    )}

                    {/* Home page */}
                    {page === "Home" && (
                        <>
                            <section className="card hero">
                                <span className="hero-label">Simple · Organized · Efficient</span>
                                <h2>Welcome to Student Portal</h2>
                                <p>
                                    Your simple system for registering and managing students.
                                    Keep student information organized and find records quickly
                                    using the search feature.
                                </p>

                                <button
                                    className="primary-button"
                                    onClick={() => setPage("Register")}
                                >
                                    + Register a Student
                                </button>
                            </section>

                            <section className="stats">
                                <div className="stat">
                                    <strong>{students.length}</strong>
                                    <span>Registered Students</span>
                                </div>

                                <div className="stat">
                                    <strong>3</strong>
                                    <span>Student Information Fields</span>
                                </div>

                                <div className="stat">
                                    <strong>24/7</strong>
                                    <span>Portal Availability</span>
                                </div>
                            </section>
                        </>
                    )}

                    {/* Registration page */}
                    {page === "Register" && (
                        <section className="card">
                            <h2 className="section-title">Register a New Student</h2>
                            <p className="muted">
                                Enter the student's details in the form below.
                            </p>

                            <form className="form-grid" onSubmit={handleRegister}>
                                <div className="field full">
                                    <label htmlFor="name">Student Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="e.g. Alex Johnson"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="age">Student Age</label>
                                    <input
                                        id="age"
                                        type="number"
                                        placeholder="Enter age"
                                        min="1"
                                        max="120"
                                        value={age}
                                        onChange={(event) => setAge(event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="course">Course / Department</label>
                                    <input
                                        id="course"
                                        type="text"
                                        placeholder="e.g. Software Development"
                                        value={course}
                                        onChange={(event) => setCourse(event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-actions">
                                    <button className="primary-button" type="submit">
                                        Register Student
                                    </button>

                                    <button
                                        className="secondary-button"
                                        type="button"
                                        onClick={() => {
                                            setName("");
                                            setAge("");
                                            setCourse("");
                                        }}
                                    >
                                        Clear Form
                                    </button>
                                </div>
                            </form>
                        </section>
                    )}

                    {/* Students and search page */}
                    {page === "Students" && (
                        <section className="card">
                            <h2 className="section-title">Student Directory</h2>
                            <p className="muted">
                                Search by full name or type only part of a name.
                            </p>

                            <div className="search-box">
                                <input
                                    className="search-input"
                                    type="search"
                                    placeholder="🔍  Search students by name..."
                                    aria-label="Search students by name"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                            </div>

                            <p className="muted">
                                Showing {filteredStudents.length} of {students.length} students
                            </p>

                            {filteredStudents.length === 0 ? (
                                <div className="empty">
                                    <h3>
                                        {students.length === 0
                                            ? "No students registered yet"
                                            : "No matching students found"}
                                    </h3>
                                    <p>
                                        {students.length === 0
                                            ? "Register a student to see their information here."
                                            : "Try another name or clear your search."}
                                    </p>

                                    {students.length === 0 && (
                                        <button
                                            className="primary-button"
                                            onClick={() => setPage("Register")}
                                        >
                                            Register First Student
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="table-wrap">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Full Name</th>
                                                <th>Age</th>
                                                <th>Course</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredStudents.map((student) => (
                                                <tr key={student.id}>
                                                    <td className="student-name">{student.name}</td>
                                                    <td>{student.age}</td>
                                                    <td>{student.course}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    )}

                    {/* About page */}
                    {page === "About" && (
                        <section className="card">
                            <h2 className="section-title">About This Project</h2>
                            <p className="muted">
                                Student Portal is a React-based student registration
                                application designed to make student information easier
                                to manage.
                            </p>

                            <h3>Features</h3>
                            <p>✓ Register students with their name, age, and course.</p>
                            <p>✓ View registered student records.</p>
                            <p>✓ Search for students by name.</p>
                            <p>✓ Navigate between Home, Register, Students, and About.</p>

                            <p className="muted">
                                Technologies: React, JavaScript, HTML, and CSS.
                            </p>
                        </section>
                    )}
                </main>

                {/* Footer */}
                <footer className="footer">
                    <strong>Student Portal</strong>
                    <br />
                    Student Registration System | Built with React
                    <br />
                    <small>Learning project · Manage students with ease</small>
                </footer>
            </div>
        </>
    );
}

createRoot(document.getElementById("root")).render(<App />);
