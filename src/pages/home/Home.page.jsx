import CommunitySpotlight from "../../components/community-spotlight/CommunitySpotlight.component";
import ExploreCuisines from "../../components/explore-cuisines/ExploreCuisines.component";
import FeaturedRecipes from "../../components/featured-recipes/FeaturedRecipes.component";
import HeroSection from "../../components/hero-section/HeroSection.component";
import MealPlanningGroceryPreview from "../../components/meal-grocery-preview/MealGroceryPreview.component";
import NutritionOverview from "../../components/nutrition-overview/NutritionOverview.component";
import PersonalizedWelcome from "../../components/personalized-welcome/PersonalizedWelcome.component";
import QuickActions from "../../components/quick-actions/QuickActions.component";
import TrendingRecipes from "../../components/trending-recipes/TrendingRecipes.component";

export default function Home() {
    return (
        <>
        <HeroSection />
        <PersonalizedWelcome />
        <FeaturedRecipes />
        <QuickActions />
        <MealPlanningGroceryPreview />
        <TrendingRecipes />
        <ExploreCuisines />
        <CommunitySpotlight />
        <NutritionOverview />
        </>
    );
};