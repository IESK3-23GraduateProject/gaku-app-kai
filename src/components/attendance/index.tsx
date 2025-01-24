import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Subject {
  id: number;
  subject: string;
  attendanceRate: string;
  credit: number;
  term: string;
  requiredAttendanceRate: string;
}

interface SubjectAttendanceProps {
  data: Subject[];
}

const SubjectAttendance: React.FC<SubjectAttendanceProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((item) => (
        <Card key={item.id} className="shadow-md">
          <CardContent>
            <h3 className="text-lg font-bold">{item.subject}</h3>
            <p className="text-sm mt-2">
              見込出席率:{" "}
              <span className="font-bold">{item.attendanceRate}</span>
            </p>
            <p className="text-sm">単位数: {item.credit}</p>
            <p className="text-sm">認定期: {item.term}</p>
            <p className="text-sm">
              単位認定限度出席率: {item.requiredAttendanceRate}
            </p>
          </CardContent>
          <CardFooter>
            <a
              href={`/attendance-details?id=${item.id}`}
              className="ml-auto px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              詳細
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubjectAttendance;
