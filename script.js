// Load saved test cases from localStorage or start fresh
var testCases = JSON.parse(localStorage.getItem("testCases")) || [];

// DOM references
const form = document.getElementById("testCaseForm");
const tbody = document.getElementById("testCases");

// Render all test cases into the table
function renderTestCases() {
  tbody.innerHTML = "";

  testCases.forEach((tc, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${tc.id}</td>
      <td>${tc.title}</td>
      <td>
        <span class="badge bg-${
          tc.priority === "High"
            ? "danger"
            : tc.priority === "Medium"
            ? "warning"
            : "secondary"
        }">
          ${tc.priority}
        </span>
      </td>
      <td>
        <span class="badge bg-${
          tc.status === "Pass"
            ? "success"
            : tc.status === "Fail"
            ? "danger"
            : "warning"
        }">
          ${tc.status}
        </span>
      </td>
      <td>
        <button class="btn btn-success btn-sm me-1"
          onclick="updateStatus(${index}, 'Pass')">Pass</button>
        <button class="btn btn-danger btn-sm"
          onclick="updateStatus(${index}, 'Fail')">Fail</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  // Persist data
  localStorage.setItem("testCases", JSON.stringify(testCases));
}

// Update test status
function updateStatus(index, status) {
  testCases[index].status = status;
  renderTestCases();
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const testCase = {
    id: `TC-${testCases.length + 1}`,
    title: title.value,
    steps: steps.value,
    expected: expected.value,
    priority: priority.value,
    status: "Not Run",
  };

  testCases.push(testCase);
  form.reset();
  renderTestCases();
});

// Initial render
renderTestCases();
