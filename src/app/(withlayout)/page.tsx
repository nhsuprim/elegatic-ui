import FadeInUp from "@/components/FremerMotion/FadeInUp";
import FeaturedProduct from "@/components/HomeComponent/FeaturedProduct/FeaturedProduct";
import BannerPage from "@/components/HomeComponent/BannerPage/BannerPage";
import NewArrival from "@/components/HomeComponent/NewArrival/NewArrival";
import Image from "next/image";
import BannerImg1 from "../../images//bannerImg/Banner_Design_1 .png";
import { generateSEO } from "@/lib/metadata";

export const metadata = generateSEO({
    title: "",
    description: "আমাদের সাইটে স্বাগতম...",
    url: `${process.env.NEXT_PUBLIC_UI_URL}/`,
});

const HomePage = () => {
    return (
        <div className="bg-base-200">
            <div className="container mx-auto min-h-screen space-y-10 md:space-y-32 py-6 md:py-10">
                {/* <Slider /> */}
                {/* <TopCategories /> */}
                {/* <FeaturedProduct />
            <PromotionalOffers /> */}
                <BannerPage />
                <FadeInUp>
                    <FeaturedProduct />
                </FadeInUp>
                <FadeInUp>
                    <NewArrival />
                </FadeInUp>
                <FadeInUp>
                    <div className="relative w-full h-[100px] sm:h-[100px] md:h-[400px] lg:h-[500px]">
                        <Image
                            src={BannerImg1}
                            alt="banner"
                            fill
                            className="object-cover"
                        />
                    </div>
                </FadeInUp>

                {/* <PromoCard />
            <FadeInUp>
                <PromotionalOffers />
            </FadeInUp> */}
                {/* <TopProducts /> */}
                {/* <HowItWorks /> */}
            </div>
        </div>
    );
};

export default HomePage;
