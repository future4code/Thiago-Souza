export function goToHomePage(history) {
  history.push("/");
}

export function goToTripsList(history) {
  history.push("/trips/list");
}

export function goToTripsApplications(history) {
  history.push("/trips/applications");
}

export function goToLogin(history) {
  history.push("/login");
}

export function goToAdminPage(history) {
  history.push("/admin/trips/list");
}

export function goToTripsCreate(history) {
  history.push("/admin/trips/create");
}
