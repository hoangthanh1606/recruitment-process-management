function datoToString(date) {
  let day = new Date(date);
  let dd = String(day.getDate()).padStart(2, '0');
  let mm = String(day.getMonth() + 1).padStart(2, '0');
  let yyyy = day.getFullYear();

  return day = dd + '/' + mm + '/' + yyyy; 
}

export default datoToString;
