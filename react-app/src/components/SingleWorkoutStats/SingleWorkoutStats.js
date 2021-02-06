import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './SingleWorkoutStats.css';

function SingleWorkoutStats({open, onClose, finished, time, distance}) {
  const dispatch = useDispatch()
  const [hidden, setHidden] = useState(true)

  return (
    <div className='new-rating-modal-container'>
    <div className={`${open ? 'new-rating-form-holder-open scale-up-center' : hidden ? 'new-rating-form-holder-close new-rating-hide' : 'new-rating-form-holder-close scale-down-center'}`}>
        <div className='new-rating-header'>
        <i class="far fa-window-close" onClick={() => {
          if (hidden) {
            setHidden(false)
          }
          onClose()
        }
        }></i>
      </div>
        <h1 className='new-rating-form-title'>Workout Stats</h1>
      <div className='new-rating-form-container-background'>
          <div className='new-rating-main-form-container'>
            {finished ? 
              <div classname='single-workout-stats-completed'> YOU MADE IT PAST THE DEADLY VOLCANOES! </div>
              :
              <div> YOU MAY HAVE DROWNED IN HOT LAVA THIS TIME, BUT THERE'S ALWAYS NEXT TIME! </div>
            }
            <div>
              YOU RAN FROM HOT LAVA FOR {time}!
            </div>
            {finished ? 
              <div classname='single-workout-stats-distance'> PHEW, YOU REALLY BROKE A SWEAT BY RUNNING {distance}! </div>
              :
              <div> PHEW, YOU BROKE A BIT OF A SWEAT BY RUNNING {distance}! </div>
            }
          </div>
      </div>
      </div>
      </div>
);
}

export default SingleWorkoutStats; 