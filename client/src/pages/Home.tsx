import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, ExternalLink } from 'lucide-react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  // スクロール進度を追跡
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(scrolled);
      setHasScrolled(scrollTop > 48);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer でセクションの可視性を監視
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-observe]');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const menuGroups = [
    {
      title: 'Coffee',
      items: [
        { name: 'Fast Filter Coffee [Hot]', price: '¥500 / ¥600', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop' },
        { name: 'Cold Brew', price: '¥600 / ¥700', image: 'https://images.unsplash.com/photo-1578314675288-ffb8f36f00f5?w=600&h=400&fit=crop' },
      ],
    },
    {
      title: 'Espresso Drink',
      items: [
        { name: 'Latte [H / I]', price: '¥650 / ¥800', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=400&fit=crop' },
        { name: 'Americano [H / I]', price: '¥550 / ¥700', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop' },
        { name: 'Cafe Mocha [H / I]', price: '¥700 / ¥850', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&h=400&fit=crop' },
        { name: 'Caramel Latte [H / I]', price: '¥700 / ¥850', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop' },
        { name: 'Espresso Tonic [Iced]', price: '¥700 / ¥850', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop' },
        { name: 'Espresso (Single / Double)', price: '¥400 / ¥550', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=400&fit=crop' },
      ],
    },
    {
      title: 'Tea',
      items: [
        { name: 'Earl Grey [H / I]', price: '¥600 / ¥700', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&h=400&fit=crop' },
        { name: 'Darjeeling [H / I]', price: '¥600 / ¥700', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop' },
        { name: 'Rooibos [H / I]', price: '¥600 / ¥700', image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&h=400&fit=crop' },
        { name: 'Tea Latte [Hot]', price: '¥700 / ¥800', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop' },
      ],
    },
    {
      title: 'Soft Drink',
      items: [
        { name: 'Lemonade [H / I]', price: '¥650 / ¥750', image: 'https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=600&h=400&fit=crop' },
        { name: 'Cocoa [H / I]', price: '¥650 / ¥750', image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=600&h=400&fit=crop' },
        { name: 'Milk [H / I]', price: '¥500 / ¥600', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop' },
        { name: 'Orange Juice', price: '¥500', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&h=400&fit=crop' },
        { name: 'Apple Juice', price: '¥500', image: 'https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=600&h=400&fit=crop' },
      ],
    },
    {
      title: 'Extra',
      items: [
        { name: 'Oat', price: '+¥100', image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&h=400&fit=crop' },
        { name: 'Soy', price: '+¥50', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop' },
        { name: 'Decaf', price: '+¥50', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop' },
      ],
    },
  ];
  const menuCards = menuGroups.flatMap((group) =>
    group.items.map((item) => ({
      name: item.name,
      price: item.price,
      group: group.title,
      image: item.image,
    }))
  );

  const galleryItems = [
    { id: 1, image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop', title: 'カウンター' },
    { id: 2, image: 'https://images.unsplash.com/photo-1521017874519-fdc202a4f271?w=400&h=400&fit=crop', title: 'テラス席' },
    { id: 3, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop', title: 'ドリンク' },
    { id: 4, image: 'https://images.unsplash.com/photo-1442512595331-e89e5f3d3d4c?w=400&h=400&fit=crop', title: 'ガーデン' },
    { id: 5, image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=400&fit=crop', title: 'スイーツ' },
    { id: 6, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop', title: 'インテリア' },
    { id: 7, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop', title: 'モーニング' },
    { id: 8, image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop', title: 'アフタヌーン' },
  ];

  const navItems = [
    { label: 'コンセプト', href: '#concept' },
    { label: 'メニュー', href: '#menu' },
    { label: 'ギャラリー', href: '#gallery' },
    { label: 'アクセス', href: '#access' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent via-accent to-yellow-500 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Fixed Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 ${
          hasScrolled
            ? 'bg-black/75 backdrop-blur border-white/15'
            : 'bg-black/30 backdrop-blur border-white/10'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-white text-xl tracking-wider">
            YELLOW
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs tracking-[0.16em] text-white/85 hover:text-yellow-300 transition-colors font-sans font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#access"
            className="text-[11px] tracking-[0.14em] text-black bg-yellow-400 hover:bg-yellow-300 px-3 py-2 transition-colors font-sans font-semibold"
          >
            RESERVE
          </a>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=800&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-display text-7xl md:text-8xl mb-4">YELLOW</h1>
            <p className="text-xl md:text-2xl font-elegant tracking-wide">
              駒沢公園のそばに佇む、知的なカフェ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4 mt-12"
          >
            <a href="#menu" className="button-elegant bg-white text-black hover:bg-gray-100">
              メニュー
            </a>
            <a href="#access" className="button-elegant border-white text-white hover:bg-white hover:text-black">
              アクセス
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white text-sm tracking-widest">SCROLL</div>
        </motion.div>
      </section>

      {/* ===== CONCEPT SECTION ===== */}
      <section
        id="concept"
        data-observe
        className="relative py-24 md:py-32 bg-gradient-to-b from-background to-card"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible['concept'] ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Image */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&h=400&fit=crop"
                alt="Concept"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Right: Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground tracking-widest font-sans font-medium mb-4">
                  01 CONCEPT
                </p>
                <h2 className="font-display text-5xl md:text-6xl mb-6">
                  Inorganic spaceで、
                  <br />
                  Organic timeを.
                </h2>
              </div>
              <p className="text-lg text-muted-foreground font-elegant leading-relaxed">
                駒沢公園のそばに佇む、コンクリートと光が織りなす知的なカフェ。
                時間を忘れて、コーヒーと向き合う空間。
              </p>
              <div className="pt-4 divider-line" />
              <div className="pt-4">
                <p className="text-xs tracking-widest text-muted-foreground mb-2 font-sans font-medium">
                  営業時間
                </p>
                <p className="text-lg">8:00 - 18:00</p>
                <p className="text-sm text-muted-foreground mt-2">毎週木曜 定休日</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== MENU SECTION ===== */}
      <section
        id="menu"
        data-observe
        className="relative py-20 md:py-24"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible['menu'] ? 'visible' : 'hidden'}
            className="mb-10"
          >
            <motion.div variants={itemVariants}>
              <p className="text-xs text-white tracking-widest font-sans font-medium mb-4">
                02 MENU
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
                こだわりの一杯
              </h2>
              <p className="text-white/80 text-lg font-elegant max-w-2xl">
                季節ごとに変わるメニューで、毎回新しい体験をお届けします。
              </p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible['menu'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7 }}
              className="min-w-0 space-y-4"
            >
              <p className="text-xs text-white/80 tracking-[0.14em] font-sans font-medium">
                CARD VIEW (HORIZONTAL SCROLL)
              </p>
              <div className="h-[360px] rounded-lg border border-white/20 bg-black/30 backdrop-blur-sm p-3 overflow-hidden">
                <div className="h-full overflow-x-auto overflow-y-hidden">
                  <div className="flex h-full items-stretch gap-4 pr-2">
                    {menuCards.map((item) => (
                      <article
                        key={`${item.group}-${item.name}`}
                        className="w-56 h-full flex-shrink-0 rounded-xl border border-white/20 bg-black/40 overflow-hidden"
                      >
                        <div className="h-28">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-white/10" />
                          )}
                        </div>
                        <div className="p-3 flex flex-col justify-between h-[calc(100%-7rem)]">
                          <p className="text-[10px] tracking-[0.16em] text-yellow-300 mb-2 font-sans font-semibold">
                            {item.group.toUpperCase()}
                          </p>
                          <h3 className="font-display text-lg text-white leading-tight line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-white/90 font-sans font-medium mt-3">{item.price}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible['menu'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="min-w-0 grid sm:grid-cols-2 gap-4 content-start"
            >
              {menuGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-lg border border-white/15 bg-black/30 p-3 h-full"
                >
                  <h3 className="font-display text-2xl text-white mb-2">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={`${group.title}-${item.name}`} className="flex items-start justify-between gap-4 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
                        <span className="text-white/90 text-sm leading-relaxed">{item.name}</span>
                        <span className="text-yellow-300 text-sm font-sans font-medium whitespace-nowrap">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section
        id="gallery"
        data-observe
        className="relative py-24 md:py-32 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible['gallery'] ? 'visible' : 'hidden'}
            className="mb-16"
          >
            <motion.div variants={itemVariants}>
              <p className="text-xs text-muted-foreground tracking-widest font-sans font-medium mb-4">
                03 GALLERY
              </p>
              <h2 className="font-display text-5xl md:text-6xl mb-4">
                空間の表情
              </h2>
            </motion.div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible['gallery'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white font-elegant p-4 text-lg">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACCESS SECTION ===== */}
      <section
        id="access"
        data-observe
        className="relative py-24 md:py-32"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1442512595331-e89e5f3d3d4c?w=1200&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible['access'] ? 'visible' : 'hidden'}
            className="mb-16"
          >
            <motion.div variants={itemVariants}>
              <p className="text-xs text-white tracking-widest font-sans font-medium mb-4">
                04 ACCESS
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
                Please visit us
              </h2>
            </motion.div>
          </motion.div>

          {/* Access Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible['access'] ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* Info */}
            <motion.div variants={itemVariants} className="space-y-8 text-white">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-white/70 tracking-widest mb-1 font-sans font-medium">
                    住所
                  </p>
                  <p className="text-lg">
                    東京都世田谷区駒沢
                    <br />
                    5-19-10
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-white/70 tracking-widest mb-1 font-sans font-medium">
                    電話
                  </p>
                  <a
                    href="tel:+81357606726"
                    className="text-lg hover:text-yellow-400 transition-colors"
                  >
                    03-5760-6726
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-white/70 tracking-widest mb-1 font-sans font-medium">
                    営業時間
                  </p>
                  <p className="text-lg">8:00 - 18:00</p>
                  <p className="text-sm text-white/70 mt-2">
                    毎週木曜 定休日
                  </p>
                </div>
              </div>

              <div className="pt-4 divider-line" />

              <div className="flex gap-4 pt-4">
                <a
                  href="https://instagram.com/yellowkomazawakoen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-xs tracking-widest font-sans font-medium">Instagram</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/pyWNeYd2wQ17AXEf7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-xs tracking-widest font-sans font-medium">Google Maps</span>
                </a>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.5234567890123!2d139.64!3d35.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188e8b8b8b8b8b%3A0x0!2sYELLOW%20KOMAZAWA%20KOEN!5e0!3m2!1sja!2sjp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-card py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground tracking-widest font-sans font-medium">
            YELLOW KOMAZAWA KOEN © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
