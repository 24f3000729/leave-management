"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  UserMinus,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { API_BASE_URL } from "@/constants";

export default function EmployeesPage() {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  // Modal states
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'view' | null
  const [selectedMember, setSelectedMember] = useState(null);

  // Form states for Add/Edit
  const [formState, setFormState] = useState({
    name: "",
    department: "",
    designation: "",
    email: "",
    phone: "",
    status: "Active",
  });

  // Fetch employees on search, status filter or general mount
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      if (statusFilter !== "All") queryParams.append("status", statusFilter);

      const res = await fetch(`${API_BASE_URL}/manager/employees?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setStaff(data);
      }
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [searchTerm, statusFilter]);

  // Derived stats (from the overall unfiltered/partially filtered dataset or fetch all)
  const totalStaffCount = staff.length;
  const activeCount = staff.filter((s) => s.status === "Active").length;
  const inactiveCount = staff.filter((s) => s.status === "Inactive").length;
  const onLeaveCount = staff.filter((s) => s.status === "On Leave").length;

  // Pagination
  const totalPages = Math.ceil(staff.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStaff = staff.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenAddModal = () => {
    setFormState({
      name: "",
      department: "",
      designation: "",
      email: "",
      phone: "",
      status: "Active",
    });
    setModalType("add");
  };

  const handleOpenEditModal = (member) => {
    setSelectedMember(member);
    setFormState({
      name: member.name,
      department: member.department,
      designation: member.designation,
      email: member.email,
      phone: member.phone,
      status: member.status,
    });
    setModalType("edit");
  };

  const handleOpenViewModal = (member) => {
    setSelectedMember(member);
    setModalType("view");
  };

  const handleDeleteMember = async (id) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      try {
        const res = await fetch(`${API_BASE_URL}/manager/employees/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchEmployees();
        }
      } catch (error) {
        console.error("Failed to delete staff member", error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        const res = await fetch(`${API_BASE_URL}/manager/employees`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });
        if (res.ok) {
          fetchEmployees();
        }
      } else if (modalType === "edit" && selectedMember) {
        const res = await fetch(`${API_BASE_URL}/manager/employees/${selectedMember.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });
        if (res.ok) {
          fetchEmployees();
        }
      }
    } catch (error) {
      console.error("Failed to save employee", error);
    }
    setModalType(null);
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Employee ID,Name,Department,Designation,Email,Phone,Status"]
        .concat(
          staff.map(
            (m) =>
              `"${m.id}","${m.name}","${m.department}","${m.designation}","${m.email}","${m.phone}","${m.status}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "staff_members.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-sans">Total Staff</h1>
          <p className="text-sm text-slate-500 mt-1 font-sans">
            Manage and view all employees in the organization.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-xs shrink-0 font-sans cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Staff
        </button>
      </div>

      {/* Counters Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Staff */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 font-sans">{totalStaffCount}</p>
            <p className="text-sm font-medium text-slate-500 mt-0.5 font-sans">Total Staff</p>
          </div>
        </div>

        {/* Active */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 font-sans">{activeCount}</p>
            <p className="text-sm font-medium text-slate-500 mt-0.5 font-sans">Active</p>
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 font-sans">{inactiveCount}</p>
            <p className="text-sm font-medium text-slate-500 mt-0.5 font-sans">Inactive</p>
          </div>
        </div>

        {/* On Leave */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <UserMinus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 font-sans">{onLeaveCount}</p>
            <p className="text-sm font-medium text-slate-500 mt-0.5 font-sans">On Leave</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Filters Header */}
        <div className="p-5 border-b border-slate-150 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-900 font-sans">All Staff Members</h2>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-80 md:flex-none">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff by name, email or ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50 text-slate-900"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-3.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer font-sans"
              >
                <Filter className="w-4 h-4 text-slate-500" />
                <span>Filter</span>
                {statusFilter !== "All" && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-1.5 py-0.5 rounded-full font-sans">
                    {statusFilter}
                  </span>
                )}
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-20">
                  {["All", "Active", "On Leave", "Inactive"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilterDropdown(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-all cursor-pointer font-sans ${
                        statusFilter === status
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "text-slate-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-3.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer font-sans"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-20 text-slate-400 font-sans">Loading staff members...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider font-sans">
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {paginatedStaff.length > 0 ? (
                  paginatedStaff.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-slate-600">
                        {member.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 shrink-0 font-sans">
                            {member.avatar}
                          </div>
                          <span className="font-semibold text-slate-900 font-sans">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-sans">{member.department}</td>
                      <td className="px-6 py-4 text-slate-600 font-sans">{member.designation}</td>
                      <td className="px-6 py-4 text-slate-500 font-sans">{member.email}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap font-sans">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-sans ${
                            member.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : member.status === "On Leave"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenViewModal(member)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-md transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(member)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-md transition-colors cursor-pointer"
                            title="Edit Details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-1.5 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-10 text-center text-slate-400 font-medium font-sans">
                      No staff members found matching the search or filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Pagination Footer */}
        <div className="p-5 border-t border-slate-150 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/25">
          <p className="text-sm text-slate-500 font-medium font-sans">
            Showing <span className="text-slate-800 font-semibold">{staff.length > 0 ? startIndex + 1 : 0}</span> to{" "}
            <span className="text-slate-800 font-semibold font-sans">
              {Math.min(startIndex + itemsPerPage, staff.length)}
            </span>{" "}
            of <span className="text-slate-800 font-semibold font-sans">{staff.length}</span> staff members
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer font-sans"
            >
              &larr; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg border text-sm font-medium transition-all cursor-pointer font-sans ${
                  currentPage === i + 1
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer font-sans"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Dialog Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-slate-100 overflow-hidden transform scale-100 transition-all duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-950 font-sans">
                {modalType === "add" ? "Add New Staff Member" : "Edit Staff Details"}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 font-sans">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rakesh Sharma"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-900 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 font-sans">
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Development"
                    value={formState.department}
                    onChange={(e) =>
                      setFormState({ ...formState, department: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-900 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 font-sans">
                    Designation
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend Developer"
                    value={formState.designation}
                    onChange={(e) =>
                      setFormState({ ...formState, designation: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-900 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 font-sans">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. name@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 font-sans">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 font-sans">
                  Status
                </label>
                <select
                  value={formState.status}
                  onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-900 font-sans"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg text-sm transition-all cursor-pointer font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-all shadow-xs cursor-pointer font-sans"
                >
                  {modalType === "add" ? "Add Member" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      {modalType === "view" && selectedMember && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl border border-slate-100 overflow-hidden transform scale-100 transition-all duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-950 font-sans">Staff Member Details</h3>
              <button
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Member Card Details */}
            <div className="p-6 text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 border-2 border-blue-100 flex items-center justify-center text-2xl font-bold text-slate-700 font-sans">
                {selectedMember.avatar}
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 font-sans">{selectedMember.name}</h4>
                <p className="text-sm font-semibold text-blue-600 mt-0.5 font-sans">
                  {selectedMember.designation}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 font-sans">{selectedMember.department} Dept.</p>
              </div>

              <div className="border-t border-b border-slate-100 py-4 text-left space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-sans">Employee ID</span>
                  <span className="text-slate-800 font-semibold font-mono">{selectedMember.id}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-sans">Email Address</span>
                  <span className="text-slate-800 font-semibold font-sans">{selectedMember.email}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-sans">Phone Number</span>
                  <span className="text-slate-800 font-semibold font-sans">{selectedMember.phone}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-sans">Status</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-sans ${
                      selectedMember.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : selectedMember.status === "On Leave"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {selectedMember.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-sm transition-all cursor-pointer font-sans"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
