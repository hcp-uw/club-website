import { useMediaQuery } from "@chakra-ui/react";

export default function Room() {
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
    return (
        <iframe
            title="OUG141"
            id="home-vr"
            allowFullScreen
            width='100%'
            height='100%'
            src="https://www.washington.edu/classroom/vrview/index.html?image=https://features.classrooms.uw.edu/room-images/panoramas/MEB_238_panorama.jpg&"
        />
    );
}
