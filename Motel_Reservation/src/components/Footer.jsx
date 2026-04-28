import React from 'react'
export default function Footer() {
 
  return (
    <div>
    
  <footer
  className="py-10 px-10 font-sans"
  id="contact"
  style={{ background: "#0f0a05", color: "#8a7a60", fontFamily: "'Jost', sans-serif" }}
>
  {/* Main Grid */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
    
    {/* Brand Column */}
    <div className="lg:col-span-1">
      <div
        className="text-xl tracking-widest mb-4"
        style={{ color: "#e8d5a3", letterSpacing: "0.15em" }}
      >
    VOYASTRA
      </div>
      <p className="text-xs leading-relaxed max-w-[260px]" style={{ fontSize: 13, lineHeight: 1.8 }}>
        1 Uttar Pradesh, Bareilly · Reservations: +9197988968 
        concierge@voyastra.com
      </p>
    </div> 

    {/* Link Columns */}
    {[
      ["Explore", ["Rooms & Suites", "Dining", "Spa & Wellness", "Events"]],
      ["Services", ["Concierge", "Airport Transfer", "Private Chef", "Business Center"]],
      ["Info", ["About Us", "Press", "Careers", "Privacy Policy"]],
    ].map(([title, links]) => (
      <div key={title}>
        <div
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "#e8d5a3", letterSpacing: "0.2em" }}
        >
          {title}
        </div>
        {links.map((l) => (
          <div
            key={l}
            className="text-xs leading-loose cursor-pointer hover:text-amber-400 transition-colors duration-200"
            style={{ fontSize: 13, lineHeight: 2.2 }}
          >
            {l}
          </div>
        ))}
      </div>
    ))}
  </div>

  {/* Bottom Bar */}
  <div
    className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-xs"
    style={{ borderTop: "1px solid #2a2015" }}
  >
    <div>© 2024 Voyastra &amp; Residences. All rights reserved.</div>
    <div style={{ color: "#b8943f" }}>★★★★★ Forbes Five-Star</div>
  </div>
</footer>
    </div>
  )
}
