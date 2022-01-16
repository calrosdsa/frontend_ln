import React from 'react'
import {Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
function Banner()  {
    return (
        <div className="pt-10">
            <div className="">
                <Carousel 
                autoPlay infiniteLoop
                showArrows={false}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                interval={4000}
                >
                    <div >
                        <img className="relative filter brightness-75  h-56 sm:h-72 md:h-80 lg:h-96  xl:h-100" src="https://estaticos.muyhistoria.es/uploads/images/test/5c5058ff5cafe854bb1898b6/test-edadmedia.jpg" alt="" />
                        <p className="absolute left-6 text-gray-100  top-20 font-bold text-3xl ">Read Light Novel & Web Novel Translations Online For FREE!
             </p>               
         <p className="absolute top-32 text-2xl text-gray-900 italic font-semibold left-12 leading-10">
Your fictional stories hub
</p>
<p className="absolute top-44  text-2xl text-gray-900 italic font-semibold  left-12 leading-10">

Looking for a great place to read Light Novels?
</p>
<p className="absolute top-64 text-xl text-gray-100 font-medium w-2/3 ml-10 leading-10">
Light Novel Pub is a very special platform where you can read the translated versions of world famous Japanese, Chinese and Korean light novels in English. Every new chapters published by the author is updated instantly on the Light Novel Pub and notification service is provided to the readers.

Start reading now to explore this mysterious fantasy world.</p>
                    </div>
                    <div>
                        <img className="filter brightness-75 h-56 sm:h-72 md:h-80 lg:h-96  xl:h-100" src="https://studiosol-a.akamaihd.net/uploadfile/letras/playlists/9/3/1/3/93136bbb3f0c45588f72897bddd8c900.jpg" alt="" />
                    </div>
                    <div>
                        <img className="filter brightness-75 h-56 sm:h-72 md:h-80 lg:h-96  xl:h-100" src="https://d30womf5coomej.cloudfront.net/sa/58/edaa012f-4691-4a80-a099-1b7cad448845.jpg" alt="" />
                    </div>
                    <div>
                    <img className="filter brightness-75 h-56 sm:h-72 md:h-80 lg:h-96  xl:h-100"  src="https://d30womf5coomej.cloudfront.net/sa/9c/c8dbb884-985d-4096-9951-f5eb6d0a6030.jpg" alt="" />
                    </div>

                </Carousel>
            </div>
        </div>
    )
}

export default Banner
