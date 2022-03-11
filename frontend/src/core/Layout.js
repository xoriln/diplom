import React from "react"
import Menu from "./Menu"
import "../styles.css"

const Layout = ({title = 'Title', description = "Description", className, children}) => (
    <div className="Layout">
        <Menu />
        <div>
            <div className="layout-fon">
                <div className="jumbotron">
                    <h2>{title}</h2>
                    <p className="lead">{description}</p>
                </div>
            </div>
            <div className={className}>{children}</div>
        </div>
    </div>
)

export default Layout