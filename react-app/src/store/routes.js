
const FIND_ROUTES = 'routes/findRoutes'
const FIND_ROUTE = 'routes/findRoute'
const ADD_ROUTE = 'routes/addRoute'

const findRoutes = (routes, apiKey) => {
  return {
    type: FIND_ROUTES,
    routes,
    apiKey
  }
}

const findRoute = (route, apiKey) => {
  return {
    type: FIND_ROUTE,
    route,
    apiKey
  }
}

const addRoute = (route) => {
  return {
    type: ADD_ROUTE,
    route
  }
}

// const updateTestimony = (id, upComment) => {
//   return {
//     type: UPDATE_TESTIMONY,
//     id,
//     'comment': upComment
//   }
// }

// const deleteTestimony = (primaryKey) => {
//   return {
//     type: DELETE_TESTIMONY,
//     primaryKey
//   }
// }

export const routesSearch = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}/routes`, {
    method: 'GET',
  })
  let response = await res.json();
  dispatch(findRoutes(response.routes, response.apiKey));
  return response
}

export const routeSearch = (id) => async (dispatch) => {
  const res = await fetch(`/api/routes/${id}`, {
    method: 'GET',
  })
  let response = await res.json();
  dispatch(findRoute(response.route, response.apiKey));
  return response
}

export const routeAdd = (route) => async (dispatch) => {
  const { name, startLong, endLong, startLat, endLat, description, userId, apiKey } = route;
  let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  let data = await fetch(proxyUrl + `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=walking&origins=${startLat},${startLong}&destinations=${endLat}%2C${endLong}&key=${apiKey}`)
  let resp = await data.json()
  const distance = (resp.rows[0].elements[0].distance.text)
  const res = await fetch(`/api/routes/new`, {
    method: 'POST',
    headers: {
      "content_type":"application/json"
    },
    body: JSON.stringify({
      name,
      startLong,
      endLong,
      startLat,
      endLat,
      description,
      distance,
      userId
    }),
  })
  let response = await res.json()
  dispatch(addRoute(response));
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

// export const testimonyDelete = (id) => async (dispatch) => {
//   const res = await fetch(`/api/testimony/${id}`, {
//     method: 'DELETE',
//   })
//   dispatch(deleteTestimony(res.data.primaryKey));
//   return res
// }

const initialState = { routes: null, route: {} }

const routesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_ROUTES:
      newState = Object.assign({}, state)
      newState.routes = action.routes;
      newState.apiKey = action.apiKey;
      return newState;
    case FIND_ROUTE:
      newState = Object.assign({}, state)
      newState.route = action.route;
      newState.apiKey = action.apiKey;
      return newState;
    case ADD_ROUTE:
      newState = Object.assign({}, state)
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
    // case DELETE_TESTIMONY:
    //   newState = Object.assign({}, state)
    //   const testimony = newState.testimony.filter(person => person.id !== parseInt(action.primaryKey));
    //   newState.testimony = testimony
    //   return newState
    default:
      return state;
  }
}

export default routesReducer;