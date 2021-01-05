function catchError (error) {
  if (error.response) {
    if (error.response.status === 401) {
      alert("Token expired")
      alert("You need to login again")
    }
    else if (error.response.status === 403) {
      alert("Request failed. Try to login again")
      
    }
    window.location.href = '/sign-in'
  }
}

export default catchError