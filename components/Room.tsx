import Image from "next/image";


export default function Room() {
    return (
        // <iframe
        //     title="OUG141"
        //     id="home-vr"
        //     allowFullScreen
        //     width='100%'
        //     height='100%'
        //     src="https://www.washington.edu/classroom/vrview/index.html?image=https://features.classrooms.uw.edu/room-images/panoramas/MEB_238_panorama.jpg&"
        // />
        <Image
            src="/GatesCenter.webp"
            alt="UW CSE2 (Gates Center) Building"
            width={2000}
            height={1000}
            style={{ width: "100%", height: "100%", borderRadius: "15px", objectFit: "cover" }}
        />
    );
}
