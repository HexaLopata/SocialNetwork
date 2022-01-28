import DefaultPageWrapper from "../components/pageWrappers/DefaultPageWrapper";
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import axios from 'axios';

const ProfilePage = function () {
    axios.get()

    return (
        <DefaultPageWrapper>
            <ProfileInfo/>
        </DefaultPageWrapper>
    );
}

export default ProfilePage;