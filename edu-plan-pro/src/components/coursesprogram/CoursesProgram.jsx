import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import CoursesProgramTable from './CoursesProgramTable.jsx';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs.jsx';


function CoursesProgram() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <CoursesProgramTable/>
      <Footer/>
    </div>
  
  );
}

export default CoursesProgram;