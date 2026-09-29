import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  onOpenSearch,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Новинки', to: '/new' },
    { label: 'Одежда', to: '/catalog/apparel' },
    { label: 'Обувь', to: '/catalog/shoes' },
    { label: 'Аксессуары', to: '/catalog/accessories' },
    { label: 'Коллекции', to: '/collections' },
  ];

  return (
    <>
      {/* Тёплый сливочный фон с мягким размытием */}
      <header className="sticky top-0 z-50 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EFECE6] transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#2C2A29] hover:bg-[#F2EFE9] rounded-full active:scale-95 transition-all duration-150"
            aria-label="Открыть меню"
          >
            <Menu size={24} />
          </button>

          {/* Brand Logo (тёплый графит вместо чистого чёрного) */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <NavLink 
              to="/" 
              className="font-serif text-2xl tracking-[0.2em] uppercase text-[#2C2A29] font-medium transition-opacity duration-200 hover:opacity-75"
            >
              Everly
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.15em] transition-all duration-300 relative py-1 group ${
                    isActive ? 'text-[#2C2A29] font-semibold' : 'text-[#736E68] hover:text-[#2C2A29]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#2C2A29] transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-[#2C2A29] hover:bg-[#F2EFE9] rounded-full transition-colors duration-200"
              aria-label="Поиск"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <NavLink
              to="/wishlist"
              className="hidden sm:flex p-2 text-[#2C2A29] hover:bg-[#F2EFE9] rounded-full transition-colors duration-200 relative"
              aria-label="Избранное"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C28E61] text-white text-[10px] rounded-full flex items-center justify-center font-sans shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            <button
              type="button"
              onClick={onOpenCart}
              className="p-2 text-[#2C2A29] hover:bg-[#F2EFE9] rounded-full transition-colors duration-200 relative"
              aria-label="Корзина"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C28E61] text-white text-[10px] rounded-full flex items-center justify-center font-sans shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-[#2C2A29]/30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div 
          className={`absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-[#FDFBF7] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-[#EFECE6]">
            <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#2C2A29] font-medium">
              Everly
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#2C2A29] hover:bg-[#F2EFE9] rounded-full active:scale-95 transition-all"
              aria-label="Закрыть меню"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 space-y-6 flex-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.2em] transition-all duration-200 py-2 border-b border-[#F2EFE9] ${
                    isActive
                      ? 'text-[#2C2A29] font-semibold pl-2 border-l-2 border-[#C28E61]'
                      : 'text-[#736E68] hover:text-[#2C2A29] hover:translate-x-1'
                  }`
                }
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-6 border-t border-[#EFECE6] bg-[#F7F4EE]">
            <NavLink
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[#2C2A29] font-medium py-2"
            >
              <span>Избранное</span>
              <span className="w-6 h-6 bg-[#C28E61] text-white text-xs rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};