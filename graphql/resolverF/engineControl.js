import { Gpio } from 'pigpio';  //apt-get install wiringpi 선행 필수,, 바인딩 하는것
const dht = require('pigpio-dht');

console.log(Gpio);
const engineControl = async(_, args, context) => {
  try {
    console.log(context.tokens);
    console.log(1)
    const tokenData=await context.jwt.verify(args.token,'hahaha123');
    console.log(2)
    if(tokenData===null)return 'error';
    console.log(3)
    if (args.status === 'false') {
      if (context.controlObject.waveEngine === false) {
        return 'success';
      } else {
        context.controlObject.waveEngine = false;
        if (context.controlObject.engineId !== null) {
          clearTimeout(context.controlObject.engineId);
        }
        return 'notListen';
      }
      console.log(4)
    } else {
      if (context.controlObject.waveEngine === false) {
        context.controlObject.waveEngine=true;
        console.log(5)
        const dataPin = 4;
        const dhtType = 11; //optional
        const sensor = dht(dataPin, dhtType);
        
        setInterval(() => { 
            sensor.read();
        }, 2500); // the sensor can only be red every 2 seconds
        
        sensor.on('result', data => {
            console.log(`temp: ${data.temperature}°c`); 
            console.log(`rhum: ${data.humidity}%`); 
        });
        
        sensor.on('badChecksum', () => {
            console.log('checksum failed');
        });
        return 'success';
      } 
      else {return 'success';} 
    }
  } catch (err) {
    return 'error';
  }
}
export default engineControl;