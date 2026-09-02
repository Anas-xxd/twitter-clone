import avatar from "../assets/avatar.svg";

export default function NavBar() {
    return(
        <>
            <div className="gray-background invisible"></div>
            <div className="nav-bar invisible" >
                <a href="" className="btn account-btn">
                    <img className="avatar" src={avatar} alt="Avatar" />
                </a>
                <p>Username</p>
                <p>@Username</p>
                <p>0 Following  0 Followers</p>
                <button />
            </div>
        </>
    )
}