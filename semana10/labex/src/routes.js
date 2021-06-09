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

export function goToPage(page, history) {
  if (page === "HomePage")
    return goToHomePage(history);

  if (page === "TripsList")
    return goToTripsList(history);

  if (page === "TripsApplications")
    return goToTripsApplications(history);

  if (page === "Login")
    return goToLogin(history);

  if (page === "AdminPage")
    return goToAdminPage(history);

  if (page === "TripsCreate")
    return goToTripsCreate(history);

  return goToHomePage(history);
}
