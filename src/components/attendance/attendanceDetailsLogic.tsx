import { subjectDescriptions, attendanceData } from "@/components/attendance/subjectData";

export function getSubjectDetails(subjectId: number) {
  // Fetch subject details by ID
  return subjectDescriptions[subjectId] || null;
}

export function getAttendanceRecords(subjectId: number) {
  // Fetch attendance records by ID
  return attendanceData[subjectId] || [];
}
