import { useEffect, useState } from "react";

// Interface for user data
interface UserData {
  student_user_id: number;
  user_name: string;
  email: string;
  date_of_birth: string;
  enrollment_date: string;
  enrollment_status: string;
  hr_class_id: string;
  hr_teacher_id: number;
  course_name: string;
  course_code: string;
  department_name: string;
}

export default function ProfileComponent() {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedData: UserData = JSON.parse(storedUserData);
        setUserInfo(parsedData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <main className="mt-12 md:container mx-auto lg:mt-8 px-6 sm:px-16 xl:px-20 min-h-screen">
      <div className="bg-blue-500 text-white text-center py-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">学生情報</h1>
        <p className="text-sm">個人に関する情報とポータルに関する情報</p>
      </div>

      <div className="container mx-auto my-6 space-y-6">
        {/* Academic Info Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">学籍情報</h2>
          <dl className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <dt className="font-semibold">学校</dt>
              <dd>ECCコンピュータ専門学校</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold">学籍番号</dt>
              <dd>{userInfo.student_user_id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold">名前</dt>
              <dd>{userInfo.user_name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold">学科</dt>
              <dd>{userInfo.department_name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold">コース</dt>
              <dd>{userInfo.course_name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold">HRクラス</dt>
              <dd>{userInfo.hr_class_id}</dd>
            </div>
          </dl>
        </div>

        {/* Student Survey Button */}
        <div className="bg-white text-center">
          <a
            href="https://enq.ecc-sv.com/student/"
            target="_blank"
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-full hover:from-blue-500 hover:to-blue-600 transition duration-200"
          >
            学生アンケートへ
          </a>
        </div>

        {/* Contact Info Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">連絡先情報</h2>
            <p className="mt-2 text-gray-700">{userInfo.email}</p>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">パスワード</h2>
            <p className="text-sm text-gray-500">
              安全なパスワードを使用してください
            </p>
          </div>
          <div>
            <a
              href="/change-password"
              className="inline-flex items-center text-blue-500 hover:text-blue-600 transition duration-200"
            >
              &gt;
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
