
const FIND_ROUTES = 'routes/findRoutes'
const FIND_ROUTE = 'routes/findRoute'
const ADD_ROUTE = 'routes/addRoute'
const UPDATE_TESTIMONY = 'testimony/updateTestimony'
const DELETE_TESTIMONY = 'testimony/deleteTestimony'

const findRoutes = (routes, apiKey) => {
  return {
    type: FIND_ROUTES,
    routes,
    apiKey
  }
}

const findRoute = (route) => {
  return {
    type: FIND_ROUTE,
    route
  }
}

const addRoute = (route, apiKey) => {
  return {
    type: ADD_ROUTE,
    route,
    apiKey
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
  console.log("THE RESPONSE!!!!!!!!!!!", response)
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
  const { name, startLong, endLong, startLat, endLat, description, userId} = route;
  const res = await fetch(`/api/routes/`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      startLong,
      endLong,
      startLat,
      endLat,
      description,
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

const initialState = { routes: null }

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
      newState.routes[newState.routes.length] = action.route;
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
    //   console.log(testimony)
    //   newState.testimony = testimony
    //   return newState
    default:
      return state;
  }
}

export default routesReducer;