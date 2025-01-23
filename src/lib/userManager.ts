// src/lib/userManager.ts

// Define the structure of the user data
export interface UserData {
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
  
  // Function to retrieve the specific user data from localStorage
  export const getUserData = (): UserData | null => {
    const storedUserData = localStorage.getItem("userData");
  
    if (storedUserData) {
      try {
        const userData: UserData = JSON.parse(storedUserData);
        return userData;
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        return null;
      }
    }
  
    return null;
  };
  