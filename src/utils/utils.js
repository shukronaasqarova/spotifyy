async function getToken() {
  try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
              'Content-Type': "application/x-www-form-urlencoded",
              'Authorization': `Basic ${btoa("9113894208c1410cb300a06252183ed8:70cd47d366744617b38c5b3c81ac1184")}`
          },
          body: "grant_type=client_credentials"
      });

      const auth = await response.json();
      if (auth.error) {
          throw new Error(auth.error);
      }
      localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`);
  } catch (error) {
      console.error('Error getting token:', error);
  }
}

export { getToken };