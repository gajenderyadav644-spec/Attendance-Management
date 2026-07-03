// Initial Data State
let students = [
  { id: 1, name: "Yuvraj", status: "Present" },
  { id: 2, name: "Saurav", status: "Absent" },
  { id: 3, name: "Bhoomika", status: "Late" },
  { id: 4, name: "Shivani", status: "Absent" },
];

// DOM Elements
const form = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const statusInput = document.getElementById('student-status');
const tableBody = document.getElementById('student-table-body');

const totalCount = document.getElementById('total-count');
const presentCount = document.getElementById('present-count');
const absentCount = document.getElementById('absent-count');
const lateCount = document.getElementById('late-count');

// ==========================================
// 1. READ: Display students in the table
// ==========================================
function renderStudents() {
  // Clear current table rows
  tableBody.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement('tr');

    // Determine color class for the dropdown text
    let statusClass = '';
    if (student.status === 'Present') statusClass = 'status-present';
    if (student.status === 'Absent') statusClass = 'status-absent';
    if (student.status === 'Late') statusClass = 'status-late';

    row.innerHTML = `
      <td>${student.name}</td>
      <td>
        <select class="status-select ${statusClass}" onchange="updateStudentStatus(${student.id}, this.value)">
          <option value="Present" ${student.status === 'Present' ? 'selected' : ''}>Present</option>
          <option value="Absent" ${student.status === 'Absent' ? 'selected' : ''}>Absent</option>
          <option value="Late" ${student.status === 'Late' ? 'selected' : ''}>Late</option>
        </select>
      </td>
      <td>
        <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });

  updateSummary();
}

// ==========================================
// 2. CREATE: Add a new student
// ==========================================
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page refresh

  const newName = nameInput.value.trim();
  const newStatus = statusInput.value;

  if (newName !== "") {
    const newStudent = {
      id: Date.now(), // Generate a unique ID
      name: newName,
      status: newStatus
    };

    students.push(newStudent);
    nameInput.value = ''; // Clear input field
    renderStudents(); // Re-render the UI
  }
});

// ==========================================
// 3. UPDATE: Change student status
// ==========================================
// Note: This is called via the inline 'onchange' attribute in the HTML string above
window.updateStudentStatus = function(id, newStatus) {
  // Find the student by ID and update their status
  const studentIndex = students.findIndex(student => student.id === id);
  if (studentIndex !== -1) {
    students[studentIndex].status = newStatus;
    renderStudents(); // Re-render to update colors and summary counters
  }
}

// ==========================================
// 4. DELETE: Remove a student
// ==========================================
// Note: This is called via the inline 'onclick' attribute in the HTML string above
window.deleteStudent = function(id) {
  // Filter out the student with the matching ID
  students = students.filter(student => student.id !== id);
  renderStudents(); // Re-render the UI
}

// ==========================================
// Helper: Update Summary Counters
// ==========================================
function updateSummary() {
  const total = students.length;
  const present = students.filter(s => s.status === 'Present').length;
  const absent = students.filter(s => s.status === 'Absent').length;
  const late = students.filter(s => s.status === 'Late').length;

  totalCount.textContent = total;
  presentCount.textContent = present;
  absentCount.textContent = absent;
  lateCount.textContent = late;
}

// Initialize the app on first load
renderStudents();