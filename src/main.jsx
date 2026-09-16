import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Routes, Route, useParams } from 'react-router-dom';
import {
  ArrowRight, BriefcaseBusiness, Building2, CarFront, CheckCircle2, ChevronLeft, ChevronRight,
  Clock, GraduationCap, Headphones, Landmark, Mail, MapPin, Menu, MessageCircle, MonitorCog,
  Phone, Send, ShieldCheck, Users, X
} from 'lucide-react';
import logo from './assets/jn-logo.jpeg';
import symbol from './assets/jn-symbol.jpeg';
import heroBg from './assets/hero-bg.jpg';
import './styles.css';

const phone = '9677796891';
const altPhone = '8695556550';
const email = 'jnconsultancy26@gmail.com';
const office = 'Shop No-9, C-Block, 5Star Complex, Opposite New Bus Stand, Perambalur.';

const services = [
  { id:'travels', title:'Travels', icon:CarFront, color:'blue', desc:'Pickup & drop, savari-based travel, tourist packages and bus booking.' },
  { id:'admission', title:'Admission', icon:GraduationCap, color:'red', desc:'Tamil Nadu college and abroad admission guidance.' },
  { id:'real-estate', title:'Real Estate', icon:Building2, color:'green', desc:'Land, property, rent, buying and selling assistance.' },
  { id:'foreign-jobs', title:'Foreign Jobs', icon:BriefcaseBusiness, color:'purple', desc:'Guidance and support for overseas job opportunities.' },
  { id:'banking', title:'Banking Services', icon:Landmark, color:'orange', desc:'Banking guidance, DSA and application support.' },
  { id:'automobile', title:'Automobile', icon:CarFront, color:'cyan', desc:'Used car search, buyer guidance and seller coordination.' },
  { id:'it-solutions', title:'IT Software & Solutions', icon:MonitorCog, color:'magenta', desc:'Websites, mobile apps, dashboards and custom software.' }
];

const benefits = [
  { icon:ShieldCheck, title:'Trusted & Reliable', desc:'100% genuine services and transparent process.' },
  { icon:Clock, title:'Fast & Convenient', desc:'Save time with our hassle-free support.' },
  { icon:Users, title:'Expert Guidance', desc:'Professional team to help you at every step.' },
  { icon:Headphones, title:'24/7 Support', desc:'Always here for you, anytime.' }
];

function Header(){
  const [open,setOpen]=useState(false);
  return <header className="header"><div className="wrap nav">
    <Link to="/" className="brand"><img src={logo} alt="JN Consultancy Services"/><span><b>JN</b><small>CONSULTANCY SERVICES</small></span></Link>
    <button className="hamb" onClick={()=>setOpen(!open)} aria-label="Open menu">{open?<X/>:<Menu/>}</button>
    <nav className={open?'open':''}>
      <NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink>
      <NavLink to="/services" onClick={()=>setOpen(false)}>Services</NavLink>
      <NavLink to="/careers" onClick={()=>setOpen(false)}>Careers</NavLink>
      <NavLink to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink>
      <Link className="navbtn" to="/contact" onClick={()=>setOpen(false)}>Get Started <ArrowRight size={16}/></Link>
    </nav>
    <div className="headContact">
      <a href={'tel:'+phone}><Phone size={14}/> {phone}</a>
      <a href={'mailto:'+email}><Mail size={14}/> {email}</a>
    </div>
  </div></header>
}

function ServiceMarquee(){
  const [paused,setPaused]=useState(false);
  const items=[...services,...services];
  return <div className="marquee" aria-label="Our services">
    <button className="marqueeArrow left" onClick={()=>setPaused(p=>!p)} aria-label="Pause or resume"><ChevronLeft/></button>
    <div className={'marquee-track'+(paused?' paused':'')}>
      {items.map((s,i)=><Link to={'/services/'+s.id} className="marquee-item" key={s.id+i}><span>✦</span>{s.title}</Link>)}
    </div>
    <button className="marqueeArrow right" onClick={()=>setPaused(p=>!p)} aria-label="Pause or resume"><ChevronRight/></button>
  </div>
}

function Footer(){
  return <>
    <footer className="footer"><div className="wrap footer-grid">
      <div className="footer-about"><img src={logo} className="footlogo" alt="JN Consultancy Services"/><p>One trusted place for multiple solutions.</p></div>
      <div><h4>All Services</h4><div className="footer-services">{services.map(s=><Link key={s.id} to={'/services/'+s.id}>{s.title}</Link>)}</div></div>
      <div><h4>Contact</h4><a href={'tel:'+phone}><Phone/> {phone}</a><a href={'tel:'+altPhone}><Phone/> {altPhone}</a><a href={'mailto:'+email}><Mail/> {email}</a></div>
      <div><h4>Office</h4><p className="office"><MapPin/> {office}</p><Link className="footer-cta" to="/contact">Send an Enquiry <ArrowRight size={15}/></Link></div>
    </div><div className="wrap copy">© {new Date().getFullYear()} JN Consultancy Services. All rights reserved.</div></footer>
  </>
}

const SPARKS = {
  r1: [20, 110, 200, 290],
  r2: [55, 130, 205, 250, 320],
  r3: [10, 65, 150, 175, 235, 305, 340]
};

function Sparks(){
  return <>
    {Object.entries(SPARKS).map(([ring, angles]) => angles.map((a, i) => (
      <span key={ring + i} className="spark-slot" style={{transform: `rotate(${a}deg) translateX(var(--${ring}))`}}>
        <span className={'spark ' + ring} style={{animationDelay: (i * 0.4) + 's'}}></span>
      </span>
    )))}
  </>
}

function SolarSystem(){
  const step = 360/services.length;
  return <div className="solar" aria-label="JN services solar system">
    <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="orbit orbit-three"></div>
    <Sparks/>
    <div className="sun-glow"></div>
    <div className="sun"><img src={symbol} alt="JN logo"/><span>JN</span></div>
    <div className="orbitRing">
      {services.map((s,i)=>{
        const angle=-90+i*step, I=s.icon;
        return <div className="planet-slot" key={s.id} style={{transform:`rotate(${angle}deg) translateX(var(--orbit-r)) rotate(${-angle}deg)`}}>
          <div className="planet-counter">
            <Link to={'/services/'+s.id} className={'planet '+s.color}><span className="planet-icon"><I size={21} color="#fff"/></span><b>{s.title}</b></Link>
          </div>
        </div>
      })}
    </div>
  </div>
}

function HeroBenefits(){
  return <div className="heroBenefits">
    {benefits.map(b=>{const I=b.icon;return <div key={b.title}><span><I size={19}/></span><div><b>{b.title}</b><p>{b.desc}</p></div></div>})}
  </div>
}

function Hero(){
  return <>
    <section className="hero" style={{backgroundImage:`url(${heroBg})`}}><div className="heroOverlay"></div><div className="wrap heroGrid">
      <div className="heroCopy"><div className="eyebrow">YOUR DREAMS <i>|</i> OUR MISSION</div>
        <h1>One Stop Solution<br/>for <em>All Your Needs</em></h1>
        <p>JN Consultancy Services provides trusted, professional and complete solutions for individuals, families and businesses.</p>
        <div className="actions"><Link className="btn primary" to="/services">Explore Services <ArrowRight/></Link><Link className="btn secondary" to="/contact">Contact Us</Link></div>
      </div>
      <SolarSystem/>
      <HeroBenefits/>
    </div></section>
    <ServiceMarquee/>
  </>
}

function Card({s}){const I=s.icon;return <Link className="card" to={'/services/'+s.id}><div className={'ico '+s.color}><I/></div><h3>{s.title}</h3><p>{s.desc}</p><b>Learn more <ArrowRight/></b></Link>}

function Home(){return <>
  <Hero/>
  <section className="section wrap"><div className="sectionHead"><div><div className="eyebrow">WHAT WE DO</div><h2>All our services, <em>in one place.</em></h2></div><Link to="/services" className="viewAll">View all <ArrowRight/></Link></div><div className="grid">{services.map(s=><Card s={s} key={s.id}/>)}</div></section>
  <section className="why"><div className="wrap whyGrid"><div><div className="eyebrow">WHY JN</div><h2>Guidance that keeps things <em>simple.</em></h2><p>Multiple service categories, one professional point of contact. Get information, submit enquiries and connect with the right team.</p><Link className="btn primary" to="/contact">Talk to Our Team <ArrowRight/></Link></div><div className="whyCards"><div><Users/><b>People-first support</b><p>Clear communication from enquiry to assistance.</p></div><div><CheckCircle2/><b>Multiple solutions</b><p>Different needs, one trusted platform.</p></div><div><CheckCircle2/><b>Professional approach</b><p>Structured and service-focused support.</p></div><div><MessageCircle/><b>Direct support</b><p>Connect with our team when needed.</p></div></div></div></section>
  <section className="cta"><div className="wrap ctaInner"><div><div className="eyebrow light">READY WHEN YOU ARE</div><h2>Let's find the right solution for you.</h2><p>Tell us what you need and our team will guide you.</p></div><Link className="btn white" to="/contact">Start an Enquiry <ArrowRight/></Link></div></section>
</>}

function PageHero({eyebrow,title,text}){return <section className="pageHero"><div className="wrap"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{text&&<p>{text}</p>}</div></section>}

function Services(){return <><PageHero eyebrow="OUR SERVICES" title={<>Solutions for <em>real-world needs.</em></>} text="Explore all seven JN Consultancy Services and choose the support you need."/><section className="section wrap"><div className="grid">{services.map(s=><Card s={s} key={s.id}/>)}</div></section></>}

function Detail(){
  const {id}=useParams(); const s=services.find(x=>x.id===id);
  if(!s) return <PageHero eyebrow="404" title={<>Service <em>not found.</em></>} text="Please choose one of our seven services."/>;
  const I=s.icon;
  const points=['Professional guidance','Requirement-based support','Clear communication','Application / coordination support','Direct team assistance','Follow-up support'];
  return <><PageHero eyebrow={s.title} title={<>{s.title} <em>made simpler.</em></>} text={s.desc}/><section className="section wrap"><div className="detail"><div className="detailMain"><div className={'bigico '+s.color}><I/></div><h2>How we can help</h2><p>Our team can understand your requirement, explain the next steps and coordinate the appropriate assistance.</p><div className="points">{points.map(x=><div key={x}><CheckCircle2/> {x}</div>)}</div><Link className="btn primary" to="/contact">Enquire about {s.title} <ArrowRight/></Link></div><aside><h3>Need help?</h3><p>Talk to our team for service information and next steps.</p><a href={'tel:'+phone}><Phone/> {phone}</a><a href={'mailto:'+email}><Mail/> {email}</a><Link className="btn secondary full" to="/contact">Send an Enquiry</Link></aside></div></section></>
}

function Careers(){return <><PageHero eyebrow="JOIN OUR TEAM" title={<>Build your career with <em>JN.</em></>} text="We are looking for motivated people across telecalling, social media and software development."/><section className="section wrap formGrid"><div><h2>Current opportunities</h2>{['Telecalling Executive','Social Media Influencer','Software Developer Intern'].map((x,i)=><div className="job" key={x}><BriefcaseBusiness/><div><h3>{x}</h3><p>{i===0?'Customer communication, follow-ups and service coordination.':i===1?'Content creation, audience engagement and brand promotion.':'Work on websites, apps, dashboards and digital solutions.'}</p></div></div>)}</div><ApplicationForm/></section></>}
function ApplicationForm(){const [ok,setOk]=useState(false);return <form className="form" onSubmit={e=>{e.preventDefault();setOk(true)}}><h3>Apply now</h3><p>Fill in your details and upload your resume.</p><label>Position<select required><option value="">Select position</option><option>Telecalling Executive</option><option>Social Media Influencer</option><option>Software Developer Intern</option></select></label><div className="two"><label>Name<input required/></label><label>Phone<input required type="tel"/></label></div><label>Email<input required type="email"/></label><label>Location<input/></label><label>Qualification<input/></label><label>Resume<input required type="file" accept=".pdf,.doc,.docx"/></label><label>Message<textarea rows="4"/></label><button className="btn primary full">Submit Application <Send/></button>{ok&&<div className="success">Application form submitted. Backend storage will be connected next.</div>}</form>}

function Contact(){const [ok,setOk]=useState(false);return <><PageHero eyebrow="CONTACT US" title={<>Let's talk about <em>what you need.</em></>} text="Send an enquiry or contact our team directly."/><section className="section wrap contactGrid"><div><div className="contact"><Phone/><div><small>Call us</small><a href={'tel:'+phone}>{phone}</a><a href={'tel:'+altPhone}>{altPhone}</a></div></div><div className="contact"><Mail/><div><small>Email</small><a href={'mailto:'+email}>{email}</a></div></div><div className="contact"><MapPin/><div><small>Office</small><p>{office}</p></div></div></div><form className="form" onSubmit={e=>{e.preventDefault();setOk(true)}}><h3>Send an enquiry</h3><div className="two"><label>Name<input required/></label><label>Phone<input required type="tel"/></label></div><label>Email<input type="email"/></label><label>Service<select><option>General enquiry</option>{services.map(s=><option key={s.id}>{s.title}</option>)}</select></label><label>Preferred contact<select><option>Phone</option><option>WhatsApp</option><option>Email</option></select></label><label>Message<textarea required rows="6"/></label><button className="btn primary full">Send Enquiry <Send/></button>{ok&&<div className="success">Thanks! Your enquiry has been captured in this demo version.</div>}</form></section></>}

function Chat(){const [open,setOpen]=useState(false);return <div className="chat"><div className={open?'chatbox show':'chatbox'}><div className="chatHead"><b>JN Support</b><button onClick={()=>setOpen(false)}><X size={17}/></button></div><div className="chatBody"><p>Hi 👋 How can we help you?</p><p>Ask about Travels, Admission, Real Estate, Foreign Jobs, Banking, Automobile or IT Solutions.</p><Link to="/contact" onClick={()=>setOpen(false)}>Connect with our team <ArrowRight size={14}/></Link></div><div className="chatFoot">Direct support: {phone}</div></div><button className="chatFab" onClick={()=>setOpen(!open)} aria-label="Chat support">{open?<X/>:<MessageCircle/>}</button></div>}

function App(){return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:id" element={<Detail/>}/><Route path="/careers" element={<Careers/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<PageHero eyebrow="404" title={<>Page <em>not found.</em></>} text="The page you're looking for doesn't exist."/>}/></Routes></main><Footer/><Chat/></>}

createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
