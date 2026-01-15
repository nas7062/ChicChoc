export const BannerImages = [
  "/bannerImage1.jpg",
  "/bannerImage2.jpg",
  "/bannerImage3.jpg",
];

export interface Category {
  label: string;
  image: string;
}

export const Categories: Category[] = [
  { label: "Hot", image: "/HotImage.png" },
  { label: "Top", image: "/TopImage.png" },
  { label: "Bottom", image: "/BottomImage.png" },
  { label: "Quick", image: "/QuickImage.png" },
  { label: "Outer", image: "/OuterImage.png" },
  { label: "Beauty", image: "/BeautyImage.png" },
  { label: "Shoes", image: "/ShoesImage.png" },
  { label: "Bag", image: "/BagImage.png" },
];

export const RECENT_KEY = "recentViewedProducts";

export const SIZE = ["S", "M", "L", "XL"];
export const COLOR = ["RED", "BLACK", "GRAY", "NAVY", "WHITE"];
