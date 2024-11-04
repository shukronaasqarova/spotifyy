async function getToken() {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          'Content-Type': "application/x-www-form-urlencoded",
          'Authorization': `Basic ${btoa("c4003917809c41919a911f5ea2fb77d9:75814b1eea4f4b9388f8301908f444e8")}`
        },
        body: "grant_type=client_credentials"
      });
  
      const auth = await response.json();
      localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`);
    } catch (error) {
      console.log(error);
    }
  }
  
  export { getToken };
  