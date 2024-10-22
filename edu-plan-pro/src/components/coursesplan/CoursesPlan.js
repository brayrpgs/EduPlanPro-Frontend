import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 
import CoursesPlanTable from '../coursesplan/CoursesPlanTable';

function CoursesPlan() {
  return (
    <div className="App">
      <Header/>
      <Aside/>
      <CoursesPlanTable/>
      <Footer/>
    </div>
  
  );
}

export default CoursesPlan;
