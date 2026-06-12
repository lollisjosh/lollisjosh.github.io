import './ProfileImage.css'

function ProfileImage() {
    return (
        <div className="profile-image">
            <div className="profile-image__frame">
                <img
                    src="/assets/images/pfp.png"
                    alt="Profile Picture"
                    className="profile-image__image"
                />
            </div>
        </div>
    )
}

export default ProfileImage
