import CommonRoutest from "../layouts/CommonRoutes"
import QualityCheck from "../layouts/QualityCheck"
import HeroSection from "../layouts/HeroSection"
import Search  from "../layouts/Search.js"

export default function Home(){
    return(
        <>
            <HeroSection/>
            <Search/>
            <CommonRoutest/>
            <QualityCheck/>
        </>
       
    )
}