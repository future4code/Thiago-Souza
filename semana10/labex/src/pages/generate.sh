pages=("HomePage" "ListTripsPage" "ApplicationFormPage" "AdminHomePage" "TripDetailsPage" "CreateTripPage")
defaultPage="App"

for page in ${pages[@]} ;
do
  execution="cat $defaultPage.js > $page.js && sed -i 's/$defaultPage/$page/g' $page.js"
  echo $execution
  bash -c "$execution"
done
