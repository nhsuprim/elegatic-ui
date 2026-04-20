import FadeInUp from "@/components/FremerMotion/FadeInUp";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import PromoCard from "@/components/HomeComponent/PromoCard/PromoCard";
import PromotionalOffers from "@/components/HomeComponent/PromotionalOffer/PromoOffer";
import Slider from "@/components/Slider/Slider";
import TopCategories from "@/components/HomeComponent/TopCategories/TopCategories";
import TopProducts from "@/components/HomeComponent/TopProducts/TopProducts";
import FeaturedProduct from "@/components/HomeComponent/FeaturedProduct/FeaturedProduct";

const HomePage = () => {
    return (
        <div className="container mx-auto mt-4 min-h-screen">
            {/* <Slider /> */}
            {/* <TopCategories /> */}
            {/* <FeaturedProduct />
            <PromotionalOffers /> */}
            <FadeInUp>
                <FeaturedProduct />
            </FadeInUp>
            {/* <PromoCard />
            <FadeInUp>
                <PromotionalOffers />
            </FadeInUp> */}
            {/* <TopProducts /> */}
            {/* <HowItWorks /> */}
        </div>
    );
};

export default HomePage;
