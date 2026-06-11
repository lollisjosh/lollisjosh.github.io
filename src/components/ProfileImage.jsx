function ProfileImage() {
    return (
        <div id="pfp-placeholder">
            <div className="pfp-border hover-scale">
                <img
                    src="/assets/images/pfp.png"
                    alt="Profile Picture"
                    className="pfp"
                />
            </div>
        </div>
    )
}

export default ProfileImage
