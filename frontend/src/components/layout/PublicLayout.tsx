import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useContentStore } from '../../store/contentStore';
import Footer from './Footer';
import Navbar from './Navbar';

export default function PublicLayout() {
  const loadHome = useContentStore((state) => state.loadHome);
  const { hash, pathname } = useLocation();

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  useEffect(() => {
    if (!hash) {
      return;
    }

    window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [hash, pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
