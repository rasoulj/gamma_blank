import React from 'react';
import StudentHome from './StudentHome';
import EducatorCourses from '~/components/organisms/Educator/EducatorCourses';
import useAuthStore from '~/stores/authStore';

const EducationHome = () => {
  const user = useAuthStore(state => state?.user);

  return user?.userRole === 'educator' ? <EducatorCourses /> : <StudentHome />;
};

export default EducationHome;
