import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CountUp from 'react-countup';
import './SingleWorkoutStats.css';

function SingleWorkoutStats({open, onClose, finished, time, distance, routeDistance}) {
  const dispatch = useDispatch()
  const [hidden, setHidden] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [distanceArr, setDistanceArr] = useState([])
  const [timeArr, setTimeArr] = useState([])
  const [finPercent, setFinPercent] = useState(0)
  const [routeDistanceArr, setRouteDistanceArr] = useState([])



  useEffect(() => {
    if (distance) {
      setDistanceArr(distance.split(' '))
      let dArr = distance.split(' ')
      setRouteDistanceArr(routeDistance.split(' '))
      let rdArr = routeDistance.split(' ')
      setTimeArr(time.split(':'))
      console.log("THIS IS THE TIME!", time)
      getPercent(dArr, rdArr)
      setIsLoaded(true)
    }
  }, [distance])

  const getPercent = (dArr, rdArr) => {
    let d;
    if (dArr[1] !== 'ft') {
      d = parseFloat(dArr[0]) * 5280
    } else {
      d = parseFloat(dArr[0])
    }
    let routeD;
    if (rdArr[1] !== 'ft') {
      routeD = parseFloat(rdArr[0]) * 5280
    } else {
      routeD = parseFloat(rdArr[0])
    }
    setFinPercent(d / routeD)
    return
  }

  return isLoaded &&(
    <div className='new-rating-modal-container'>
    <div className={`${open ? 'new-rating-form-holder-open scale-up-center' : hidden ? 'new-rating-form-holder-close new-rating-hide' : 'new-rating-form-holder-close scale-down-center'}`}>
        <div className='new-rating-header'>
        {/* <i class="far fa-window-close" onClick={() => {
          if (hidden) {
            setHidden(false)
          }
          onClose()
        }
        }></i> */}
        <h1 className='new-rating-form-title'>Workout Stats</h1>
      </div>
      <div className='new-rating-form-container-background'>
          <div className='new-rating-main-form-container'>
            {/* {finished ? 
              <div className='single-workout-stats'> You made it past the deadly volcanoes! </div>
              :
              <div className='single-workout-stats'> You may have drowned in hot lava this time, but you'll get it next time */}
              <div className='single-workout-stats-container'>
                <div className='single-workout-stats-route-completed'>% of Route Completed:  </div>
                <div className="single-workout-stats-route-completed-percentage">
                <CountUp
                  start={0}
                  end={finPercent}
                  duration={5.5}
                  separator=" "
                  decimals={4}
                  decimal="."
                />%
              </div>
                  </div>
          {/* </div>
            } */}
            <div className='single-workout-stats-container'>
            {/* <div className='single-workout-stats'> */}
              {/* You really broke a sweat running from all that heat! */}
              <div className='single-workout-stats-route-completed'> Time:  
              </div> 
              <div className="single-workout-stats-route-completed-percentage">
              <CountUp
                start={0}
                end={parseInt(timeArr[0])}
                duration={3}
                separator=" "
                decimals={0}
                />{timeArr[0] < 10 ? 0 : null}: 
              <CountUp
                start={0}
                end={parseInt(timeArr[1])}
                duration={4}
                separator=" "
                decimals={0}
                />{timeArr[1] < 10 ? 0 : null}:{timeArr[2] < 10 ? 0 : null}
              <CountUp
                start={0}
                end={parseInt(timeArr[2])}
                duration={5}
                separator=" "
                decimals={0}
              />
               </div>
              {/* </div> */}
            </div>
            <div className='single-workout-stats-container'>
            {/* <div className='single-workout-stats'> Phew, you really made a lot of progress! */}
              <div className='single-workout-stats-route-completed'>Distance:  </div>
                <div className="single-workout-stats-route-completed-percentage">
                  <CountUp
                    start={0}
                    end={parseFloat(distanceArr[0])}
                    duration={6}
                    separator=" "
                    decimals={1}
                    decimal="."
                  />
                <span> </span> {distanceArr[1]}</div>
              {/* </div> */}
              </div>
          </div>
      </div>
      </div>
      </div>
);
}

export default SingleWorkoutStats; 