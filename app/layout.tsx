// "use client"
// import {  Footer,Navbar2 } from '../components'
// import './globals.css'
// import './custom.css'
// import './bootstrap.min.css'
// import './bs-select.css'
// import './slick.css'
// import { useSearchParams } from 'next/navigation'
// import { CartProvider } from './context/CartContext';
// import { BooleanProvider } from './context/CartBoolContext'; 
// import GifLoader from '../components/GifLoader'
// import Offer from '../components/Offer'
// import WhatsAppIcon from '../components/WhatsAppIcon';  
// import { GoogleAnalytics } from '@next/third-parties/google'




 

 

// export default function RootLayout({
//   children
// }: {
//   children: React.ReactNode
// }) {

 

//   return (
//     <html className="no-js no-touch supports-no-cookies" lang="en"> 
//     <>
//   <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
//   <meta content="en" httpEquiv="Content-Language" />
//   <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
//   <meta
//     content="width=device-width, initial-scale=1, maximum-scale=1"
//     name="viewport"
//   />
//   <meta content="max-image-preview:large" name="robots" />
//   <title>
//     mobitron
//   </title>
//   <meta
//     content="At mobitron, we're reshaping the way businesses connect."
//     name="description" 
//   />
//   <meta content="mobitron" name="keywords" property="mobitronbynature, mobitron, men, women" />
//   <meta
//     content="mobitron"
//     name=""
//     property="og:title"
//   />
//   <meta
//     content="https://mobitronbynature.com/"
//     name=""
//     property="og:url"
//   />
//   <meta content="website" name="" property="og:type" />
//   <meta
//     content="At mobitron, we're reshaping the way businesses connect."
//     name=""
//     property="og:description"
//   />
//   <meta
//     content="https://res.cloudinary.com/dqjtmau0a/image/upload/v1761145131/517028198_617604041375918_3676791841633107613_n-removebg-preview_ffps8m.png"
//     name=""
//     property="og:image"
//   />
   
//   <link
//     href="https://res.cloudinary.com/dqjtmau0a/image/upload/v1761145131/517028198_617604041375918_3676791841633107613_n-removebg-preview_ffps8m.png"
//     rel="apple-touch-icon"
//     sizes="180x180"
//   />
//   <link
//     href="https://res.cloudinary.com/dqjtmau0a/image/upload/v1761145131/517028198_617604041375918_3676791841633107613_n-removebg-preview_ffps8m.png"
//     rel="icon"
//     sizes="32x32" 
//   />
//   <link
//     href="https://res.cloudinary.com/dqjtmau0a/image/upload/v1761145131/517028198_617604041375918_3676791841633107613_n-removebg-preview_ffps8m.png"
//     rel="icon"
//     sizes="16x16" 
//   /> 
 
//   <meta content="#ffffff" name="msapplication-TileColor" />
//   <meta content="#ffffff" name="theme-color" />
//   <link href="https://assets.bellroy.com" rel="preconnect" />
//   <link href="https://bellroy.imgix.net" rel="preconnect" /> 
  

 
 










//   <link
//     href="css/webfonts-3e3c2400.css"
//     rel="preload"
//     as="style"
//   />
//   <link
//     rel="stylesheet"
//     href="css/webfonts-3e3c2400.css"
//     media="print" 
//   />
//   <link
//     rel="stylesheet"
//     href="css/style-4109db2b.css"
//   />

// <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet"/>
                      
                
                
                
                

 
  
// </> 
//       <body>
  
//       <GifLoader />

        
//         <BooleanProvider>
//         <CartProvider>
//           <Navbar2 />
//           <WhatsAppIcon />
//           {/* <GoogleAnalytics gaId="" /> */}
//           {children} 
//           <Footer />
//         </CartProvider>
//         </BooleanProvider>
        
//       </body>
//     </html>
//   )
// }



// app/layout.js
export const metadata = {
  title: "Under Construction",
  description: "This website is currently under construction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚧 Under Construction 🚧</h1>
        <p style={{ opacity: 0.8 }}>We're working hard to launch our new site. Please check back soon!</p>
      </body>
    </html>
  );
}

