import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight, Check, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag,
  SlidersHorizontal, Star, Trash2, X, Truck, ShieldCheck, RotateCcw
} from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};
type CartItem = { product: Product; quantity: number };
const CART_KEY = "datheon-ecommerce-cart-v1";
const TAX_RATE = 0.075;
const SHIPPING_FEE = 8;
const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem =>
      item && typeof item === "object" &&
      item.product && typeof item.product.id === "number" &&
      typeof item.product.title === "string" &&
      typeof item.product.price === "number" &&
      typeof item.quantity === "number" && Number.isInteger(item.quantity) && item.quantity > 0
    );
  } catch {
    return [];
  }
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadCatalog() {
      setLoading(true);
      setApiError("");
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetch("https://fakestoreapi.com/products", { signal: controller.signal }),
          fetch("https://fakestoreapi.com/products/categories", { signal: controller.signal })
        ]);
        if (!productResponse.ok || !categoryResponse.ok) throw new Error("The store could not load products right now.");
        const productData: unknown = await productResponse.json();
        const categoryData: unknown = await categoryResponse.json();
        if (!Array.isArray(productData) || !Array.isArray(categoryData)) throw new Error("The store returned an unexpected response.");
        setProducts(productData as Product[]);
        setCategories(categoryData as string[]);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setApiError(error.message || "Something went wrong while loading the catalog.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadCatalog();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [cart]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = products.filter(product =>
      (activeCategory === "all" || product.category === activeCategory) &&
      (!query || product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))
    );
    if (sort === "price-low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...list].sort((a, b) => b.rating.rate - a.rating.rate);
    return list;
  }, [products, activeCategory, search, sort]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : SHIPPING_FEE;
  const total = subtotal + tax + shipping;

  function addToCart(product: Product) {
    setCart(current => {
      const existing = current.find(item => item.product.id === product.id);
      return existing
        ? current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { product, quantity: 1 }];
    });
    setNotice("Added to your bag");
    setCartOpen(true);
  }
  function changeQuantity(id: number, amount: number) {
    setCart(current => current
      .map(item => item.product.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter(item => item.quantity > 0));
  }
  function removeItem(id: number) {
    setCart(current => current.filter(item => item.product.id !== id));
  }
  function toggleFavorite(id: number) {
    setFavorites(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  }
  function finishCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart.length) return;
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setNotice(`Thank you, ${customerName.trim()}! Your demo order has been placed.`);
    setCustomerName("");
    setCustomerEmail("");
  }

  return (
    <div className="store">
      <header className="header">
        <button type="button" className="menu-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}><Menu size={21}/></button>
        <a className="wordmark" href="#" aria-label="Forma home">forma<span>.</span></a>
        <div className="header-actions">
          <div className="header-search-wrap">
            <button type="button" className="search-toggle" aria-label={searchOpen ? "Close product search" : "Open product search"} aria-expanded={searchOpen} onClick={() => setSearchOpen(open => !open)}><Search size={19}/></button>
            {searchOpen && <input className="header-search-input" aria-label="Search products" placeholder="Search products" autoFocus value={search} onChange={event => { setSearch(event.target.value); setActiveCategory("all"); }} />}
          </div>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${itemCount} items`}><ShoppingBag size={19}/><b className="bag-count">{itemCount}</b></button>
        </div>
        {menuOpen && <nav className="header-menu" aria-label="Main navigation"><a href="#shop" onClick={() => setMenuOpen(false)}>Shop collection</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a></nav>}
      </header>

      <main>
        <section className="hero" id="story">
          <div className="hero-copy">
            <span className="eyebrow">THE EVERYDAY EDITION</span>
            <h1>Everyday essentials.<br/><em>Elevated living.</em></h1>
            <p>Discover thoughtfully selected home and lifestyle essentials designed to bring comfort, quality and timeless style into your everyday spaces.</p>
            <a className="hero-link" href="#shop">Shop the collection <ArrowRight size={16}/></a>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-intro"><div><span className="eyebrow">CURATED FOR YOU</span><h2>Find your everyday.</h2><p>Useful things, chosen with intention.</p></div><span className="result-count">{filteredProducts.length} products</span></div>
          <div className="catalog-toolbar">
            <div className="category-tabs" aria-label="Product categories">
              <button className={activeCategory === "all" ? "selected" : ""} onClick={() => setActiveCategory("all")}>All products</button>
              {categories.map(category => <button key={category} className={activeCategory === category ? "selected" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <label className="sort-control"><SlidersHorizontal size={15}/><span>Sort</span><select aria-label="Sort products" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select><ChevronDown size={13}/></label>
          </div>

          {loading && <div className="state-message"><span className="loader"></span><strong>Gathering the collection...</strong><p>Just a moment while we bring everything together.</p></div>}
          {!loading && apiError && <div className="state-message error-state"><strong>We couldn't load the collection.</strong><p>{apiError} Check your connection and try again.</p><button className="outline-button" onClick={() => window.location.reload()}><RotateCcw size={15}/> Try again</button></div>}
          {!loading && !apiError && filteredProducts.length === 0 && <div className="state-message"><strong>No pieces found.</strong><p>Try another search or category.</p><button className="outline-button" onClick={() => { setSearch(""); setActiveCategory("all"); }}>Clear filters</button></div>}

          {!loading && !apiError && filteredProducts.length > 0 && <div className="product-grid">
            {filteredProducts.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap"><img src={product.image} alt={product.title} loading="lazy"/><button className={favorites.includes(product.id) ? "favorite active" : "favorite"} onClick={() => toggleFavorite(product.id)} aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"}/></button><button className="quick-add" onClick={() => addToCart(product)}><Plus size={15}/> Add to bag</button></div>
                <div className="product-info"><span className="product-category">{product.category}</span><h3>{product.title}</h3><div className="product-bottom"><strong>{money(product.price)}</strong><span className="rating"><Star size={12} fill="currentColor"/> {product.rating.rate.toFixed(1)} <small>({product.rating.count})</small></span></div></div>
              </article>
            ))}
          </div>}
        </section>

        <section className="promise-strip"><div><Truck/><strong>Complimentary shipping</strong><span>On orders over $100</span></div><div><ShieldCheck/><strong>Thoughtfully selected</strong><span>Useful by design</span></div><div><RotateCcw/><strong>Easy returns</strong><span>Within 30 days</span></div></section>
      </main>

      <footer className="footer" id="footer"><a className="wordmark" href="#">forma<span>.</span></a><p>Everyday essentials, thoughtfully considered.</p><small>DEMO STORE · DATHEON INTERNSHIP TASK 04</small></footer>

      {cartOpen && <div className="overlay" onMouseDown={event => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer" aria-label="Shopping bag">
          <div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your bag <span>({itemCount})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X/></button></div>
          {notice && <p className="notice">{notice}</p>}
          {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={30}/><h3>Your bag is taking a break.</h3><p>Add something useful to get started.</p><button className="dark-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div> : <>
            <div className="cart-items">{cart.map(item => <article className="cart-item" key={item.product.id}><img src={item.product.image} alt={item.product.title}/><div className="cart-item-info"><span>{item.product.category}</span><strong>{item.product.title}</strong><b>{money(item.product.price * item.quantity)}</b><div className="quantity-control"><button onClick={() => changeQuantity(item.product.id, -1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.product.id, 1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => removeItem(item.product.id)} aria-label={`Remove ${item.product.title}`}><Trash2 size={16}/></button></article>)}</div>
            <div className="cart-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Estimated tax (7.5%)</span><b>{money(tax)}</b></div><div><span>Shipping</span><b>{shipping === 0 ? "Free" : money(shipping)}</b></div><div className="summary-total"><strong>Total</strong><strong>{money(total)}</strong></div><small>Shipping is free on orders of $100 or more. Tax is an estimate.</small><button className="dark-button checkout-button" onClick={() => setCheckoutOpen(true)}>Continue to checkout <ArrowRight size={16}/></button></div>
          </>}
          {storageError && <p className="storage-warning">Your browser could not save the bag. Check available site storage.</p>}
        </aside>
      </div>}

      {checkoutOpen && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}><form className="checkout-modal" onSubmit={finishCheckout}><button type="button" className="close-button modal-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X/></button><span className="eyebrow">DEMO CHECKOUT</span><h2>Almost yours.</h2><p>This is a simulated checkout. No payment will be collected.</p><label>Your name<input required value={customerName} onChange={event => setCustomerName(event.target.value)} placeholder="Full name"/></label><label>Email address<input required type="email" value={customerEmail} onChange={event => setCustomerEmail(event.target.value)} placeholder="you@example.com"/></label><div className="checkout-total"><span>Order total</span><strong>{money(total)}</strong></div><button className="dark-button" type="submit"><Check size={16}/> Place demo order</button></form></div>}

      {notice && !cartOpen && <div className="toast" role="status"><Check size={16}/>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={14}/></button></div>}
    </div>
  );
}

export default App;