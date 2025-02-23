
import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import UserTable from './UserTable';

function User() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <UserTable/>
      <Footer/>
    </div>
  
  );
}

export default User;