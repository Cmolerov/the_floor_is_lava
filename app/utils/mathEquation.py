from math import radians, cos, sin, asin, sqrt

def distance(startLat, startLong, endLat, endLong):

      Radius = 3959.87433

      disLat = radians(endLat - startLat)
      disLon = radians(endLong - startLong)
      startLat = radians(startLat)
      endLat = radians(endLat)

      a = sin(disLat/2)**2 + cos(startLat)*cos(endLat)*sin(disLon/2)**2
      c = 2*asin(sqrt(a))

      return Radius * c

# function quickSort(array) {
# 	if (array.length <= 1) {
# 		return array;
# 	}

# 	let pivot = array.shift();
# 	let left = array.filter((el) => el.user.dataValues.distance < pivot.user.dataValues.distance);
# 	let right = array.filter((el) => el.user.dataValues.distance >= pivot.user.dataValues.distance);

# 	let leftSorted = quickSort(left);
# 	let rightSorted = quickSort(right);

# 	return [ ...leftSorted, pivot, ...rightSorted ];
# }

print(distance(42.35796768090105, -71.07336678423798, 42.369803176648205, -71.06982626829688))