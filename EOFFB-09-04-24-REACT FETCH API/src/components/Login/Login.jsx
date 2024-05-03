import React, { Component } from "react";
import { config } from "../../../config";
import { PublicClientApplication } from "@azure/msal-browser";
import Homepage from "../Homepage/Homepage"; // Import Homepage component
import Navbar from "../Navbar/Navbar";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {},
      accessToken: null,
      refreshToken: null,
    };
    this.login = this.login.bind(this);

    // Initialize MSAL client
    this.initializeMsal().then(() => {
    // After initialization, you can check authentication status or call other MSAL methods
    this.checkAuthStatus();
    console.log("this.checkAuthStatus() is Calling...");
    
  });
}

  async acquireToken() {
    console.log("main acquireToken() is Calling...");
    try {
        // Check if user is logged in
        const account = this.publicClientApplication.getAccount();
        if (account) {
            // User is logged in, proceed to acquire token

            // Acquire token silently
            const response = await this.publicClientApplication.acquireTokenSilent({
                scopes: config.SCOPE,
                account: account,
            });
            console.log("response : ", response);
            // Retrieve the access token from the response
            const accessToken = response.accessToken;

            if (accessToken) {
                // Set the access token to the Authorization header
                const headers = {
                    // Authorization: `Bearer ${accessToken}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json", // Example of adding a Content-Type header
                    // Add other headers as needed
                };

                // Now you can use this headers object in your fetch request
                fetch(`https://login.microsoftonline.com/${config.TENANT_ID}/oauth2/v2.0/token`, {
                    method: "POST",
                    headers: headers,
                });

                // Update state with token information
                this.setState({
                    isAuthenticated: true,
                    accessToken: accessToken,
                    refreshToken: response.refreshToken,
                    user: response.account, // Store user information
                });

                console.log("Session is ON.\nAccess token: ", accessToken);

                // Now you can use this headers object in your fetch request
                // Example: fetch('your_api_endpoint', { method: 'GET', headers: headers })
            } else {
                // Handle case where access token is undefined
                console.error("Access token is undefined");
                this.setState({
                    isAuthenticated: false,
                    accessToken: null,
                    refreshToken: null,
                    user: {},
                });
            }
        } else {
            // User is not logged in
            this.setState({
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                user: {},
            });
            alert("Session is OFF.");
        }
    } catch (error) {
        // Handle error
        console.error("Error acquiring access token:", error);
        this.setState({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            user: {},
        });
    }
}


  async initializeMsal() {
    console.log("initializeMsal() is Calling...");
    try {
      // Create MSAL client instance
      this.publicClientApplication = new PublicClientApplication({
        auth: {
          clientId: config.CLIENT_ID,
          authority: config.AUTHORITY,
          redirectUri: config.REDIRECTURL,
        },
        system: {
          allowNativeBroker: true,
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: true,
        },
      });

      await this.publicClientApplication.initialize();
      await this.publicClientApplication.handleRedirectPromise();
    } catch (error) {
      console.error("MSAL initialization error:", error);
      throw error; // Rethrow the error for handling in the constructor
    }
    this.acquireToken(); // Call acquireToken after initialization
    console.log("this.acquireToken() is Calling...");
  }

  async login() {
    console.log("login() is Calling...");
    try {
     const response =  await this.publicClientApplication.loginPopup({
        scopes: config.SCOPE,
        prompt: "select_account",
      });
      // response.account.idTokenClaims.name
      console.log("response:" ,response);
      if (response && response.accessToken){
        localStorage.setItem("token" , response.accessToken);
        localStorage.setItem("username" , response.account.idTokenClaims.name);
        localStorage.setItem("email" , response.account.username);
      }
      else{
        console.error("response not getting");
      }
      this.setState({ isAuthenticated: true }); // Update state upon successful login
    } catch (error) {
      console.error(error);
    }
  }

  async checkAuthStatus() {
    console.log("checkAuthStatus() is Calling...");
    try {
      const account = this.publicClientApplication.getAccount();
      if (account && Object.keys(account).length > 0) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: {},
        });
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      this.setState({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: {},
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">{/* Header content */}</header>
        <div>
          {/* <Navbar /> */}
          {this.state.isAuthenticated ? (
            <Homepage user={this.state.user} /> // Pass user information as props to Homepage component
          ) : (
            <div className="aside login-center">
              <button onClick={() => this.login()}>Login with Microsoft</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
