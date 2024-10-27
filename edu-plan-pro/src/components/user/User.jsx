import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 
import UserTable from './UserTable';

function Teachear() {
  return (
    <div className="App">
      <Header/>
      <Aside/>
      <UserTable/>
      <Footer/>
    </div>
  
  );
}

export default Teachear;