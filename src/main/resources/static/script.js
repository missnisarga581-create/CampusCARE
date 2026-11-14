
const API_URL = "/complaints";

const complaintForm = document.getElementById("complaintForm");
const complaintList = document.getElementById("complaintList");

let allComplaints = [];

// Submit a new complaint
complaintForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const complaint = {
        studentName: document.getElementById("studentName").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        seriousIssue: document.getElementById("seriousIssue").checked
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(complaint)
        });

        if (!response.ok) {
            throw new Error("Failed to submit complaint");
        }

        alert("Complaint submitted successfully!");
        complaintForm.reset();
        loadComplaints();

    } catch (error) {
        alert(error.message);
    }
});

// Update dashboard statistics
function updateDashboard(complaints) {

    document.getElementById("totalCount").textContent =
        complaints.length;

    document.getElementById("pendingCount").textContent =
        complaints.filter(c => c.status === "Pending").length;

    document.getElementById("progressCount").textContent =
        complaints.filter(c => c.status === "In Progress").length;

    document.getElementById("resolvedCount").textContent =
        complaints.filter(c => c.status === "Resolved").length;
}

// Search and filter complaints
function filterComplaints() {

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const statusValue =
        document.getElementById("statusFilter").value;

    const categoryValue =
        document.getElementById("categoryFilter").value;

    const priorityValue =
        document.getElementById("priorityFilter").value;

    const filtered = allComplaints.filter(complaint => {

        const matchesSearch =
            (complaint.studentName || "").toLowerCase().includes(searchText) ||
            (complaint.description || "").toLowerCase().includes(searchText);

        const matchesStatus =
            !statusValue || complaint.status === statusValue;

        const matchesCategory =
            !categoryValue || complaint.category === categoryValue;

        const matchesPriority =
            !priorityValue ||
            (complaint.priority || "Medium") === priorityValue;

        return matchesSearch &&
               matchesStatus &&
               matchesCategory &&
               matchesPriority;
    });

    displayComplaints(filtered);
}

// Display complaints
function displayComplaints(complaints) {

    complaintList.replaceChildren();

    if (complaints.length === 0) {
        complaintList.textContent = "No matching complaints found.";
        return;
    }

    complaints.forEach(complaint => {

        const card = document.createElement("div");
        card.className = "complaint-card";

        const details = document.createElement("div");

        const fields = [
            `Complaint ID: ${complaint.id}`,
            `Student: ${complaint.studentName}`,
            `Category: ${complaint.category}`,
            `Description: ${complaint.description}`,
            `Priority: ${complaint.priority || "Medium"}`,
            `Serious Issue: ${complaint.seriousIssue ? "Yes" : "No"}`,
            `Submitted At: ${complaint.submittedAt || "Not available"}`,
            `Status: ${complaint.status}`
        ];

        fields.forEach(field => {
            const p = document.createElement("p");
            p.textContent = field;
            details.appendChild(p);
        });

        if (complaint.seriousIssue) {
            const warning = document.createElement("p");
            warning.textContent = "⚠ SERIOUS COMPLAINT";
            warning.style.color = "red";
            warning.style.fontWeight = "bold";
            details.appendChild(warning);
        }

        const statusSelect = document.createElement("select");

        ["Pending", "In Progress", "Resolved"].forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;

            if (status === complaint.status) {
                option.selected = true;
            }

            statusSelect.appendChild(option);
        });

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update Status";

        updateButton.addEventListener("click", () => {
            updateStatus(complaint.id, statusSelect.value);
        });

        card.appendChild(details);
        card.appendChild(statusSelect);
        card.appendChild(updateButton);

        complaintList.appendChild(card);
    });
}

// Retrieve all complaints
async function loadComplaints() {

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load complaints");
        }

        allComplaints = await response.json();

        updateDashboard(allComplaints);
        filterComplaints();

    } catch (error) {
        complaintList.textContent = error.message;
    }
}

// Update complaint status
async function updateStatus(id, status) {

    try {
        const response = await fetch(
            `${API_URL}/${id}/status?status=${encodeURIComponent(status)}`,
            { method: "PATCH" }
        );

        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        alert("Complaint status updated!");
        loadComplaints();

    } catch (error) {
        alert(error.message);
    }
}

// Activate search and filters
document.getElementById("searchInput")
    .addEventListener("input", filterComplaints);

document.getElementById("statusFilter")
    .addEventListener("change", filterComplaints);

document.getElementById("categoryFilter")
    .addEventListener("change", filterComplaints);

document.getElementById("priorityFilter")
    .addEventListener("change", filterComplaints);

// Load complaints when page opens
loadComplaints();

// Portal navigation
const homePage = document.getElementById("homePage");
const studentPage = document.getElementById("studentPage");
const adminPage = document.getElementById("adminPage");

document.getElementById("studentPortalButton")
    .addEventListener("click", function () {
        homePage.hidden = true;
        adminPage.hidden = true;
        studentPage.hidden = false;
    });

document.getElementById("adminPortalButton")
    .addEventListener("click", function () {
        homePage.hidden = true;
        studentPage.hidden = true;
        adminPage.hidden = false;
        loadComplaints();
    });

document.getElementById("studentBackButton")
    .addEventListener("click", function () {
        studentPage.hidden = true;
        homePage.hidden = false;
    });

document.getElementById("adminBackButton")
    .addEventListener("click", function () {
        adminPage.hidden = true;
        homePage.hidden = false;
    });

