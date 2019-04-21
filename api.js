const BASE = 'https://api.spacexdata.com/v3';
export const LAUNCHES_BASE = `${BASE}/launches`;

function sanitizeLaunchResponse(launch) {
  return {
    key: launch.flight_number.toString(),
    flightNumber: launch.flight_number,
    utcDate: new Date(launch.launch_date_utc),
    isSuccessful: launch.launch_success === true && launch.upcoming === false,
    isFailed: launch.launch_success === false && launch.upcoming === false,
    isUpcoming: launch.launch_success === null && launch.upcoming === true,
    isInProgress: launch.launch_success === null && launch.upcoming === false,
    isTentative: launch.is_tentative === true,
    details: launch.details,
    missionName: launch.mission_name,
    missionIds: launch.mission_id || [],
    missionPatch: (launch.links && launch.links.mission_patch) || ''
  };
}

function sanitizeLaunchesResponse(launches) {
  return launches.map(sanitizeLaunchResponse);
}

function getHeaders() {
  return {
    'Content-Type': 'application/json'
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return response.json();
}

export async function getLaunches() {
  const response = await fetch(LAUNCHES_BASE, {
    headers: getHeaders()
  });

  const launches = await handleResponse(response);

  return sanitizeLaunchesResponse(launches);
}
