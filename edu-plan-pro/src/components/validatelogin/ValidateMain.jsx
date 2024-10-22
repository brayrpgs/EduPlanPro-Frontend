import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ValidateLogin = ({ Login }) => {

  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { 

    const validatemain = async () => {
      try {
        const response = await fetch('http://localhost:3001/session', 
            {
                method: 'GET',
                credentials: 'include'
              }
        ); 
        const data = await response.json();

        if (data.code === '200') {
          setFlag(false);
          navigate('/coursesPlan');  
        } else {
            setFlag(true);  
        }
      } catch (error) {
        navigate('/login'); 
      } 
    };

    validatemain(); 
  }, [navigate]);


  return flag ? <Login /> : null;
};

export default ValidateLogin;
