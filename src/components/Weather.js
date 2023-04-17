import './App.css';
import Table from 'react-bootstrap/Table';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import temp from '../components/assets/temp.jpg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const Weather = (props) => {

  

  const weather=props.data
  const error=props.error
  console.log(error)
  console.log(weather[0])
  const {
    cloud,
    condition,
    feelslike_c,
    gust_kph,
    humidity,
    last_updated,
    precip_mm,
    pressure_mb,
    uv,
    vis_km,
    wind_dir,
    wind_kph,
    temp_c
  } = weather[0].current
const {
  icon,
  text
}=weather[0].current.condition

  return (
    <Container className="weather-container">
      {   error&&   <Alert variant="warning"style={{textAlign:"center"}}>Server Not Responding</Alert>}
      <Row>
        <div className='d-flex content' style={{padding:"5px 20px 5px 20px"}}><h3 className='title'>Current Weather</h3><h6 className='time'>Weather Updated at{last_updated.slice(10, 16)} </h6></div>
      </Row>
      <Row style={{borderBottom:"1px solid #aca9a9"}}>
      <div className='d-flex content1' style={{padding:"5px 10px 0px 10px"}}><div className='left-content'><img className="image" src={icon} /><h1 className='real-temp'>{temp_c}°C </h1></div> <h6 className='temp'>Real feel@ {feelslike_c} °C <img className='temp-img' src={temp}/></h6>
      </div>
      <div className='weather-condition'><h4>{text}</h4></div>

      </Row>

        <Row>
            <Col >
        <Table responsive="lg">

        <tbody>
          <tr>
            <td>Wind Speed</td>
            <td>{wind_kph} kmph Direction {wind_dir}</td>
          </tr>
          <tr>
            <td>Wind Gusts</td>
            <td>{gust_kph} kmph</td>

          </tr>
          <tr>
            <td>Pressure.</td>
            <td>{pressure_mb} millibars</td>

          </tr>
          <tr>
            <td>Humidity</td>
            <td>{humidity} %</td>

          </tr>

        </tbody>
      </Table>

            
            </Col>
            <Col>
        <Table responsive="lg">

        <tbody>
        <tr>
            <td>Visibility</td>
            <td>{vis_km} km</td>

          </tr>
          <tr >
            <td>UV Index</td>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">UV index less than 5 is normal otherwise bad for health</Tooltip>}>
            {uv<5?<td className="d-inline-block" style={{color:"green"}}>{uv} Normal</td>:<td className="d-inline-block" style={{color:"red"}}>{uv} high</td>}
            </OverlayTrigger>

          </tr>
          <tr>
          <td>Cloud Cover</td>
          <td>{cloud}%</td>

          </tr>
          <tr>
            <td>Precipitation</td>
            <td>{precip_mm} mm</td>

          </tr>
  
        </tbody>
      </Table>

            
            </Col>
        </Row>
        
  
    

    </Container>

  )
}

export default Weather