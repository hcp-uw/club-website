import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@react-hook/media-query';


const Room = () => {
 const [isClient, setIsClient] = useState(false);
 const isLargeScreen = useMediaQuery('(min-width: 1000px)');


 useEffect(() => {
   setIsClient(true);
 }, []);


 if (!isClient) {
   return null;
 }


 return (
   <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
     {isLargeScreen && (
       <div style={{ flex: 1, marginRight: '10px' }}>
         <iframe
           title="OUG141"
           id="home-vr"
           allowFullScreen
           width="100%"
           height="100%"
           src="https://www.washington.edu/classroom/vrview/index.html?image=https://features.classrooms.uw.edu/room-images/panoramas/MOR_220_panorama.jpg&"
         />
       </div>
     )}
     <div style={{ flex: 1, marginLeft: '10px' }}>
       <Image
         src="/more_hall.webp"
         alt="UW CSE2 (Gates Center) Building"
         width={500}
         height={300}
         style={{
           width: '100%',
           height: '100%',
           borderRadius: '15px',
           objectFit: 'scale-down',
         }}
       />
     </div>
   </div>
 );
};


export default Room;



