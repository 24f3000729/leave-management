const express = require("express");
const { parseISO, isWithinInterval, format } = require("date-fns");
const router = express.Router();
let { staff, leaves } = require("./data");

// Helper function to check if a leave overlaps with a date range
function isLeaveInDateRange(leave, fromDate, toDate) {
  try {
    const start = parseISO(leave.startDate);
    const end = parseISO(leave.endDate);
    const rangeStart = parseISO(fromDate);
    const rangeEnd = parseISO(toDate);

    // Overlap condition: leave.startDate <= rangeEnd && leave.endDate >= rangeStart
    return start <= rangeEnd && end >= rangeStart;
  } catch (error) {
    return false;
  }
}

// -------------------------------------------------------------
// Manager Dashboard API (with date range support)
// GET /api/manager/dashboard-stats?from=YYYY-MM-DD&to=YYYY-MM-DD
// -------------------------------------------------------------
router.get("/dashboard-stats", (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "Please provide both 'from' and 'to' date parameters." });
  }

  // Calculate staff counts (total/active/inactive static list context)
  const totalStaffCount = staff.length;
  const activeCount = staff.filter((s) => s.status === "Active").length;
  const inactiveCount = staff.filter((s) => s.status === "Inactive").length;

  // Filter leaves that fall into this date range
  const filteredLeaves = leaves.filter((leave) => isLeaveInDateRange(leave, from, to));

  // Pending approvals (all-time or in range, standard is all-time for pending task list, but range filtering applied here)
  const pendingApprovalsCount = filteredLeaves.filter((l) => l.status === "Pending").length;
  const approvedLeavesCount = filteredLeaves.filter((l) => l.status === "Approved").length;

  // Calculate current active leaves
  const onLeaveStaffCount = staff.filter((s) => s.status === "On Leave").length;

  // Build daily analytics map for the dashboard chart within the range
  // We can group approved leaves by appliedDate or startDate
  const analyticsMap = {};
  filteredLeaves.forEach((leave) => {
    const dateKey = leave.appliedDate || leave.startDate;
    if (dateKey >= from && dateKey <= to) {
      analyticsMap[dateKey] = (analyticsMap[dateKey] || 0) + 1;
    }
  });

  const analytics = Object.keys(analyticsMap).map((date) => ({
    date,
    leaves: analyticsMap[date],
  })).sort((a, b) => a.date.localeCompare(b.date));

  // Leave distribution by type within range
  const typeMap = {};
  filteredLeaves.forEach((l) => {
    typeMap[l.type] = (typeMap[l.type] || 0) + 1;
  });
  const leaveByType = Object.keys(typeMap).map((type) => ({
    name: type,
    value: typeMap[type],
  }));

  res.json({
    totalStaff: totalStaffCount,
    activeStaff: activeCount,
    inactiveStaff: inactiveCount,
    onLeaveStaff: onLeaveStaffCount,
    totalLeavesInRange: filteredLeaves.length,
    pendingApprovals: pendingApprovalsCount,
    approvedLeaves: approvedLeavesCount,
    analytics,
    leaveByType,
    recentLeaves: filteredLeaves.slice(0, 5), // Return up to 5 filtered leaves
  });
});

// -------------------------------------------------------------
// Manager Employees CRUD APIs
// -------------------------------------------------------------

// GET /api/manager/employees
router.get("/employees", (req, res) => {
  const { search, status } = req.query;
  let result = [...staff];

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.id.toLowerCase().includes(term) ||
        m.designation.toLowerCase().includes(term)
    );
  }

  if (status && status !== "All") {
    result = result.filter((m) => m.status === status);
  }

  res.json(result);
});

// GET /api/manager/employees/:id
router.get("/employees/:id", (req, res) => {
  const employee = staff.find((m) => m.id === req.params.id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found." });
  }
  res.json(employee);
});

// POST /api/manager/employees
router.post("/employees", (req, res) => {
  const { name, department, designation, email, phone, status } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required fields." });
  }

  const newId = `EMP${String(staff.length + 1).padStart(3, "0")}`;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const newEmployee = {
    id: newId,
    name,
    avatar: initials || "EE",
    role: "Employee",
    department: department || "General",
    designation: designation || "Staff",
    email,
    phone: phone || "",
    status: status || "Active",
    joinedDate: format(new Date(), "yyyy-MM-dd"),
  };

  staff.unshift(newEmployee);
  res.status(201).json(newEmployee);
});

// PUT /api/manager/employees/:id
router.put("/employees/:id", (req, res) => {
  const index = staff.findIndex((m) => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found." });
  }

  const updatedEmployee = {
    ...staff[index],
    ...req.body,
    // ID and Role should not be modified by edit
    id: staff[index].id,
    role: staff[index].role,
  };

  staff[index] = updatedEmployee;
  res.json(updatedEmployee);
});

// DELETE /api/manager/employees/:id
router.delete("/employees/:id", (req, res) => {
  const index = staff.findIndex((m) => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found." });
  }

  const deletedEmployee = staff[index];
  staff = staff.filter((m) => m.id !== req.params.id);
  res.json({ message: "Employee successfully deleted.", employee: deletedEmployee });
});

module.exports = router;
