const FIND_WORKOUTS = 'workouts/findWorkouts'
// const FIND_ROUTE = 'routes/findRoute'
const ADD_WORKOUT = 'workouts/addWorkout'

const findWorkouts = (workouts, completed, fastestTime) => {
  return {
    type: FIND_WORKOUTS,
    workouts,
    completed,
    fastestTime
  }
}

// const findRoute = (route, apiKey) => {
//   return {
//     type: FIND_ROUTE,
//     route,
//     apiKey
//   }
// }

const addWorkout = (workout) => {
  return {
    type: ADD_WORKOUT,
    workout
  }
}

// const updateTestimony = (id, upComment) => {
//   return {
//     type: UPDATE_TESTIMONY,
//     id,
//     'comment': upComment
//   }
// }

// const deleteRoute = (primaryKey) => {
//   return {
//     type: DELETE_ROUTE,
//     primaryKey
//   }
// }

export const workoutsSearch = (id) => async (dispatch) => {
  const res = await fetch(`/api/routes/${id}/workouts`, {
    method: 'GET',
  })
  let response = await res.json();
  let completed = 0;
  let fastestTime = null;
  let fastSeconds = Infinity;
  Object.values(response.workouts).forEach((workout) => {
    let t = workout.time
    let tArr = t.split(':')
    let currentTime = Number(tArr[0]) * 60 * 60 + Number(tArr[1]) * 60 + Number(tArr[2])
    if (workout.isCompleted) {
      completed += 1
      if (currentTime < fastSeconds) {
        fastSeconds = currentTime
        fastestTime = t;
        fastSeconds = currentTime
      }
    }
  })
  dispatch(findWorkouts(response.workouts, completed, fastestTime));
  return response
}

// export const routeSearch = (id) => async (dispatch) => {
//   const res = await fetch(`/api/routes/${id}`, {
//     method: 'GET',
//   })
//   let response = await res.json();
//   dispatch(findRoute(response.route, response.apiKey));
//   return response
// }

export const workoutAdd = (workout) => async (dispatch) => {
  const { startLong, endLong, startLat, endLat, isCompleted, routeId, time, dist } = workout;
  let distance = dist;
  const res = await fetch(`/api/workouts/`, {
    method: 'POST',
    headers: {
      "content_type":"application/json"
    },
    body: JSON.stringify({
      startLong,
      endLong,
      startLat,
      endLat,
      isCompleted,
      distance,
      routeId,
      time
    }),
  })
  let response = await res.json()
  dispatch(addWorkout(response));
  return response
}

// export const testimonyUpdate = (test) => async (dispatch) => {
//   const { primaryKey, comment } = test
//   const res = await fetch(`/api/testimony/`, {
//     method: 'PATCH',
//     body: JSON.stringify({
//       primaryKey,
//       comment
//     }),
//   })
//   dispatch(updateTestimony(res.data.id, res.data.upComment));
//   return res
// }

// export const routeDelete = (sentId) => async (dispatch) => {
//   let { id } = sentId
//   const res = await fetch(`/api/routes/${id}`, {
//     method: 'DELETE',
//   })
//   let response = await res.json();
//   console.log("FRONTEND RESPONSE!!!!!!", response)
//   dispatch(deleteRoute(response.primaryKey));
//   return res
// }

const initialState = { workouts: null, workout: null, completed: 0, fastestTime: null }

const workoutsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_WORKOUTS:
      newState = Object.assign({}, state)
      newState.workouts = action.workouts;
      newState.completed = action.completed;
      newState.fastestTime = action.fastestTime;
      return newState;
    case ADD_WORKOUT:
      newState = Object.assign({}, state)
      newState.workouts[action.workout.id] = action.workout
      return newState;
    // case UPDATE_TESTIMONY:
    //   newState = Object.assign({}, state)
    //   for (let i = 0; i < newState.testimony.length; i++){
    //     let test = newState.testimony[i]
    //     if (test.id === action.id) {
    //       test.comment = action.comment
    //     };
    //   }
    //   return newState;
    // case DELETE_ROUTE:
    //   newState = Object.assign({}, state)
      // const routes = newState.routes.filter(route => route.id !== parseInt(action.primaryKey));
      // newState.routes = routes
      // return newState
    default:
      return state;
  }
}

export default workoutsReducer;