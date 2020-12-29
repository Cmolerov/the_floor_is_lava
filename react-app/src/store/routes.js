
const FIND_ROUTES = 'routes/findRoutes'
const FIND_ROUTE = 'routes/findRoute'
const ADD_ROUTES = 'routes/addRoutes'
const UPDATE_TESTIMONY = 'testimony/updateTestimony'
const DELETE_TESTIMONY = 'testimony/deleteTestimony'

const findRoutes = (routes) => {
  return {
    type: FIND_ROUTES,
    routes
  }
}

const findRoute = (route) => {
  return {
    type: FIND_ROUTE,
    route
  }
}

// const addTestimony = (testify) => {
//   return {
//     type: ADD_TESTIMONY,
//     testify,
//   }
// }

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
  dispatch(findRoutes(response));
  return res
}

export const routeSearch = (id) => async (dispatch) => {
  const res = await fetch(`/api/routes/${id}`, {
    method: 'GET',
  })
  let response = await res.json();
  dispatch(findRoute(response));
  return res
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

// export const testimonyAdd = (test) => async (dispatch) => {
//   const { userId, commenterId, comment } = test;
//   const res = await fetch(`/api/testimony/`, {
//     method: 'POST',
//     body: JSON.stringify({
//       userId,
//       commenterId,
//       comment
//     }),
//   })
//   dispatch(addTestimony(res.data.testimony));
//   return res
// }

const initialState = { routes: null }

const routesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_ROUTES:
      newState = Object.assign({}, state)
      newState.routes = action.routes;
      return newState;
    case FIND_ROUTE:
      newState = Object.assign({}, state)
      newState.route = action.route;
      return newState;
    // case ADD_TESTIMONY:
    //   newState = Object.assign({}, state)
    //   newState.testimony[newState.testimony.length] = action.testify;
    //   return newState;
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