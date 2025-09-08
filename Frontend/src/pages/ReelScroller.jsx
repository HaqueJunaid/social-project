import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/reel.css";

export default function ReelScroller() {
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/food")
      .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setReels(data);
        })
    .catch((err) => {
      console.error("Error fetching posts:", err);
    });
    }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If there's an existing observer, disconnect it first
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const options = {
      // Observe intersection relative to the scroll container so entries are accurate
      root: container,
      rootMargin: '0px',
      threshold: [0.6]
    };

    const handle = (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const vid = section.querySelector('video');
        if (!vid) return;

        if (entry.intersectionRatio >= 0.6) {
          // Reset to start and play when this reel becomes active
          try { vid.currentTime = 0; } catch (e) { /* ignore */ }
          const p = vid.play();
          if (p && p.catch) p.catch(() => { /* autoplay blocked fallback */ });
        } else {
          // Pause and reset so it starts from beginning next time
          try { vid.pause(); vid.currentTime = 0; } catch (e) { /* ignore */ }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handle, options);
    const sections = container.querySelectorAll('section.reel');
    if (sections.length === 0) return;

    sections.forEach((s) => observerRef.current.observe(s));

    // Ensure the first visible reel plays (for example after fetch)
    setTimeout(() => {
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        const ch = container.clientHeight || window.innerHeight;
        const visible = rect.top >= 0 && rect.top < ch;
        const vid = s.querySelector('video');
        if (visible && vid) {
          try { vid.currentTime = 0; vid.play(); } catch (e) { /* ignore */ }
        }
      });
    }, 200);

    return () => {
      if (observerRef.current) {
        // pause any playing videos when tearing down
        const secs = container.querySelectorAll('section.reel');
        secs.forEach((s) => {
          const v = s.querySelector('video');
          try { if (v) { v.pause(); v.currentTime = 0; } } catch (e) {}
        });
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [reels]);

  return (
    <div className="reel-root">
        <NavLink className="back-button" to={"/user/login"}>
            <i class="ri-arrow-left-s-line"></i>
            <span>Back</span>
        </NavLink>
      <div className="reels" ref={containerRef}>
        {reels.map((r, index) => {
          const key = (r && (r._id || r.id)) ? (r._id || r.id) : index;
          const src = r && (r.video || r.mediaUrl || r.url);
          const ownerName = r?.owner?.kitchenName || r?.user || 'unknown';
          const caption = r?.description || r?.caption || '';

          return (
            <section key={key} className="reel" aria-label={`Reel by ${ownerName}`}>
              <div className="video-wrap">
                <video
                  className="video"
                  preload="auto"
                  playsInline
                  muted
                  loop
                  src={src}
                  onCanPlay={() => console.debug('canplay', key, src)}
                  onError={(e) => console.error('video error', key, src, e)}
                />
              </div>

              <div className="reel-info">
                <div className="profile">
                  <div className="avatar">
                    <div className="circle"></div>
                  </div>
                  <div className="meta">
                    <div className="user">@{ownerName}</div>
                    <div className="caption">{caption}</div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
