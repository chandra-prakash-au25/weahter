import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import "./App.css"
import { useEffect,useState } from 'react';
import { APIFORCITIES,APIFORCURRFORCAT,APIKEY } from './api';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Weather from "./Weather";
import logo from './assets/2275.png'
const Header = () => {
    const [city,setCity]=useState()
    const [buttonval,setButtonval]=useState("Bangalore")
    const [todayWeather, setTodayWeather] = useState();
    const [cities, setCities] = useState();
    const [citiesforButton, setCitiesforButton] = useState();
    const [errorServer, setErrorServer] = useState(false);
    const [errorcities, setErrorcities] = useState(false);

    const findWeatherReport=async(val)=>{
        console.log(val)
        try{
            const response = await axios.get(
                APIFORCURRFORCAT,{
                      params:{
                      "q":val,
                      "key":APIKEY
                   }
                  }
              );
              let data2=[response.data]
              setTodayWeather(data2)
              setErrorServer(false)

        }catch(error){
          setErrorServer(true)
        }
       
    }

//when page load findCities function runs and find cities in india to show on toggle button
const findCities=async()=>{
    axios.post(APIFORCITIES,{
        "country": "India"
    })
    .then(response => {
      console.log(response.data.data);

      setCities(response.data.data)
      setCitiesforButton(response.data.data)
    })
    .catch(error => {
      console.error(error);
      alert(error)
    });  
}



//inshide toggle button's search when any input given then this function runs
const filterCities=(citykeyword)=>{
    console.log(citykeyword)
    const filteredItems = cities.filter((city) =>
    city.toLowerCase().includes(citykeyword.toLowerCase())
  );
  if(filteredItems.length>0){
    setErrorcities(false)
  }
  else{
    setErrorcities(true)
  }
  setCitiesforButton(filteredItems)
    
}


 //when select a option from dropdown this function runs
 const handleclickDropdown=(cityName)=>{
        setButtonval(cityName)
        findWeatherReport(cityName+",In")


}










useEffect(()=>{
        findWeatherReport(`Bangalore,In`)
        findCities()
      
  },[])
  return (
<div className='back-ground'>
<Navbar expand="lg" className='Navbar CustomNavbar'>
      <Container>
        <Navbar.Brand style={{ fontFamily: "fantasy", fontSize: "2rem" }}><img src={logo} className='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll"  >
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Dropdown style={{ marginLeft: "50px" }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {buttonval}
              </Dropdown.Toggle>

              <Dropdown.Menu className='menu' style={{minWidth:"430px", maxHeight: '300px',minHeight:"300px",overflowY: 'auto' }} >
                <Form.Control
                  type="search"
                  placeholder={buttonval}
                  className="me-2 "
                  aria-label="Search"
                  onChange={(e) => filterCities(e.target.value)
                  }
                
                  style={{ width: "350px", marginLeft: "3%" }} />
                {citiesforButton && citiesforButton.map((val, index) => {
                  return (<Dropdown.Item onClick={(e) => {
                    handleclickDropdown(val)
                  }} key={index}>{val}</Dropdown.Item>
                  )
                })}
                {errorcities&&
                          <Dropdown.Item style={{color:"red"}}>
                                 <p>city not found</p>
                          </Dropdown.Item>
                }
 
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



    { todayWeather&&<Weather data={todayWeather} error={errorServer}/>}

</div>
    
  )
}

export default Header