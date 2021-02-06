import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CountUp from 'react-countup';
import './SingleWorkoutStats.css';

function SingleWorkoutStats({open, onClose, finished, time, distance, routeDistance}) {
  const dispatch = useDispatch()
  const [hidden, setHidden] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [distanceArr, setDistanceArr] = useState([])
  const [routeDistanceArr, setRouteDistanceArr] = useState([])


  useEffect(() => {
    if (distance) {
      setDistanceArr(distance.split(' '))
      setRouteDistanceArr(routeDistance.split(' '))
      setIsLoaded(true)
    }
  }, [distance])

  const getPercent = () => {
    
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
            {finished ? 
              <div className='single-workout-stats'> You made it past the deadly volcanoes! </div>
              :
              <div className='single-workout-stats'> You may have drowned in hot lava this time, but you'll get it next time
              <div>Completed: <span className="odometer">
              <CountUp
                start={0}
                end={527.012}
                duration={3.75}
                separator=" "
                decimals={4}
                decimal="."
              />
                </span>% of route
                  </div>
          </div>
            }
            <div className='single-workout-stats'>
              You really broke a sweat running from all that heat!
              <div> Time:
              {/* <CountUp
                start={0}
                end={527.012}
                duration={2.75}
                separator=" "
                decimals={4}
                decimal="."
                suffix=" left"
                /> */}
                {time} </div>
            </div>
            <div className='single-workout-stats'> Phew, you really made a lot of progress!
              <div>Distance:
              <CountUp
                start={0}
                end={parseFloat(distanceArr[0])}
                duration={3.75}
                separator=" "
                decimals={1}
                decimal="."
              />
                {distanceArr[1]}</div>
            </div>
          </div>
      </div>
      </div>
      </div>
);
}

export default SingleWorkoutStats; 