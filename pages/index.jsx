import Head from "next/head";
import { useState } from "react";
import Categories from "../components/Categories";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import ProductGrid from "../components/ProductGrid";
import SideCart from "../components/SideCart";
import { useCart } from "../hooks/useCart";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";

export default function Home() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Head>
        <title>Rotihouse, Authentic inidan Restaurant, Vientiane, Laos</title>
        <meta
          name="description"
          content="Best Indian food, Famous Indian food, South Indian food, North Indian food, Authentic, Idly, Dosa"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative w-full h-full bg-white">
        <FloatingCart handleOpen={() => setOpen(true)} />
        <SideCart
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        />
        <div className=" w-full min-h-screen">
          <div>
            <Header handleOpen={() => setOpen(true)} />
            <HeroSlider />
          </div>
          <div className=" sticky top-0 z-20">
            <Categories />
          </div>
          <div className="mb-8 mt-24 lg:mt-32 px-8 lg:max-w-7xl mx-auto lg:px-0 min-h-screen">
            <ProductGrid />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
