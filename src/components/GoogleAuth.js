import React, { Component } from "react"

class GoogleAuth extends Component {
    state = {
        isSignedIn: null
    }

    componentDidMount = () => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: "159628228181-fdl60fq592tl2cbj234k51e40qis2lpg.apps.googleusercontent.com",
                scope: "email"
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({isSignedIn: this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()})
    }

    onSignIn = () => {
        this.auth.signIn()
    }

    onSignOut = () => {
        this.auth.signOut()
    }
    
    renderAuthButton = () => {
        if (this.state.isSignedIn === null) {
            return null
        } else if (this.state.isSignedIn) {
            return(
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out    
                </button>

            )
        } else {
            return(
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon" />
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}

export default GoogleAuth