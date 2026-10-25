import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { MapPin, Navigation, Car, Clock, ShieldCheck, AlertCircle, RefreshCw, CheckCircle, Info } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SEO } from './seo.jsx';

const API_BASE = 'https://consbackend-production.up.railway.app';

function TrackingMap({ data }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropMarkerRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const defaultCenter = [10.8505, 76.2711]; // South India fallback
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 12,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const points = [];

    // Helper to create clean custom HTML markers
    const createIcon = (color, text, isDriver = false) => {
      const html = isDriver
        ? `<div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#0284C7;color:white;border-radius:50%;box-shadow:0 0 0 6px rgba(2,132,199,0.3);border:2px solid #fff;">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
           </div>`
        : `<div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:${color};color:white;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:11px;font-weight:bold;">
             ${text}
           </div>`;

      return L.divIcon({
        className: 'custom-map-icon',
        html,
        iconSize: isDriver ? [40, 40] : [32, 32],
        iconAnchor: isDriver ? [20, 20] : [16, 16],
      });
    };

    // 1. Driver Location
    const driverLat = data?.driverLocation?.latitude;
    const driverLng = data?.driverLocation?.longitude;
    if (driverLat != null && driverLng != null && !isNaN(driverLat) && !isNaN(driverLng)) {
      const driverPos = [driverLat, driverLng];
      points.push(driverPos);
      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker(driverPos, { icon: createIcon('#0284C7', '🚗', true) })
          .addTo(map)
          .bindPopup(`<b>${data.driverName || 'Driver'}</b><br>Speed: ${data.driverLocation.speed ? Math.round(data.driverLocation.speed * 3.6) + ' km/h' : 'Moving'}`);
      } else {
        driverMarkerRef.current.setLatLng(driverPos);
      }
    }

    // 2. Pickup Location
    const pickupLat = data?.pickupLat ?? (data?.target?.kind === 'pickup' ? data?.target?.latitude : null);
    const pickupLng = data?.pickupLng ?? (data?.target?.kind === 'pickup' ? data?.target?.longitude : null);
    if (pickupLat != null && pickupLng != null && !isNaN(pickupLat) && !isNaN(pickupLng)) {
      const pickupPos = [pickupLat, pickupLng];
      points.push(pickupPos);
      if (!pickupMarkerRef.current) {
        pickupMarkerRef.current = L.marker(pickupPos, { icon: createIcon('#10B981', 'P') })
          .addTo(map)
          .bindPopup(`<b>Pickup</b><br>${data.pickupLocation || 'Pickup location'}`);
      } else {
        pickupMarkerRef.current.setLatLng(pickupPos);
      }
    }

    // 3. Drop Location
    const dropLat = data?.dropLat ?? (data?.target?.kind === 'drop' ? data?.target?.latitude : null);
    const dropLng = data?.dropLng ?? (data?.target?.kind === 'drop' ? data?.target?.longitude : null);
    if (dropLat != null && dropLng != null && !isNaN(dropLat) && !isNaN(dropLng)) {
      const dropPos = [dropLat, dropLng];
      points.push(dropPos);
      if (!dropMarkerRef.current) {
        dropMarkerRef.current = L.marker(dropPos, { icon: createIcon('#EF4444', 'D') })
          .addTo(map)
          .bindPopup(`<b>Destination</b><br>${data.dropLocation || 'Destination'}`);
      } else {
        dropMarkerRef.current.setLatLng(dropPos);
      }
    }

    // 4. Connect points with route line
    if (points.length >= 2) {
      if (!polylineRef.current) {
        polylineRef.current = L.polyline(points, {
          color: '#0284C7',
          weight: 4,
          opacity: 0.75,
          dashArray: '6, 8',
        }).addTo(map);
      } else {
        polylineRef.current.setLatLngs(points);
      }
      try {
        map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 15 });
      } catch (_) {}
    } else if (points.length === 1) {
      map.setView(points[0], 14);
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [data]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0', marginTop: '16px' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export function LiveTrackingWebPage() {
  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);
  const token = params.token || queryParams.get('token') || queryParams.get('t') || '';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('No tracking link provided. Please open the link received from your MWAY app.');
      setLoading(false);
      return;
    }

    let isMounted = true;
    let timerId = null;

    const fetchTracking = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/bookings/public-track/${encodeURIComponent(token)}`);
        const json = await res.json();
        if (!isMounted) return;

        if (!res.ok || json.ok === false) {
          setError(json.message || json.reason || 'Tracking is not available for this link.');
          setData(null);
          if (timerId) clearInterval(timerId);
        } else {
          const tripData = json.data || json;
          setData(tripData);
          setError(null);
          setLastRefreshed(new Date());

          if (tripData.trackable === false) {
            if (timerId) clearInterval(timerId);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to reach the tracking service. Please check your internet connection.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTracking();
    timerId = setInterval(fetchTracking, 10000);

    return () => {
      isMounted = false;
      if (timerId) clearInterval(timerId);
    };
  }, [token]);

  const getStatusLabel = (trip) => {
    if (!trip) return '';
    if (trip.status === 'completed' || trip.status === 'trip_completed') return 'Trip Completed';
    if (trip.status === 'cancelled') return 'Trip Cancelled';
    if (trip.status === 'trip_started') return 'Trip in Progress';
    if (trip.status === 'arrived_at_pickup') return 'Driver Arrived at Pickup';
    if (trip.status === 'heading_to_pickup') return 'Driver En Route to Pickup';
    return trip.statusLabel || trip.status || 'Active';
  };

  return (
    <>
      <SEO
        title="Live Trip Tracking | MWAY & JN Consultancy Services"
        description="Track your confirmed MWAY trip live with vehicle and driver details."
        noindex={true}
      />
      <section className="pageHero">
        <div className="wrap">
          <div className="pageHeroEyebrow">LIVE TRIP TRACKING</div>
          <h1>
            Track your <em>MWAY journey.</em>
          </h1>
          <p className="pageHeroText">
            Real-time status, driver details, and live trip progress shared securely with you.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <div className="policy" style={{ maxWidth: '720px', margin: '0 auto' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '64px 16px' }}>
              <RefreshCw className="spin" style={{ width: '40px', height: '40px', color: '#0284C7', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
              <p style={{ marginTop: '16px', color: '#64748B', fontWeight: 500 }}>Connecting to MWAY live tracking...</p>
            </div>
          )}

          {!loading && error && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #FEE2E2',
              borderRadius: '16px',
              padding: '36px 24px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#EF4444'
              }}>
                <AlertCircle style={{ width: '36px', height: '36px' }} />
              </div>
              <h2 style={{ color: '#0F172A', fontSize: '22px', fontWeight: 'bold', margin: '0 0 10px' }}>
                Tracking Link Inactive
              </h2>
              <p style={{ color: '#475569', fontSize: '15px', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                {error}
              </p>
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '14px 16px',
                maxWidth: '480px',
                margin: '0 auto 24px',
                fontSize: '13px',
                color: '#64748B',
                textAlign: 'left',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                <Info style={{ width: '18px', height: '18px', color: '#0284C7', flexShrink: 0, marginTop: '2px' }} />
                <span>
                  For passenger safety and driver privacy, live location sharing automatically deactivates once the ride is completed or cancelled.
                </span>
              </div>
              <Link to="/" style={{
                display: 'inline-block',
                background: '#0284C7',
                color: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '14px'
              }}>
                Return to Homepage
              </Link>
            </div>
          )}

          {!loading && data && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              overflow: 'hidden'
            }}>
              {/* Header Status Banner */}
              <div style={{
                background: data.trackable ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : '#475569',
                color: '#FFFFFF',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
                    Trip Status
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>
                    {getStatusLabel(data)}
                  </div>
                </div>
                <div style={{
                  background: data.trackable ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {data.trackable ? (
                    <>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', display: 'inline-block' }}></span>
                      Live Updating
                    </>
                  ) : (
                    <>
                      <CheckCircle style={{ width: '14px', height: '14px' }} />
                      Completed
                    </>
                  )}
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Driver & Vehicle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#EFF6FF',
                    color: '#0284C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    border: '2px solid #BAE6FD'
                  }}>
                    {(data.driverName || 'D').charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A' }}>
                      {data.driverName || 'Assigned Driver'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Car style={{ width: '16px', height: '16px', color: '#0284C7' }} />
                      <span>{data.driverVehicleType || 'Vehicle'}</span>
                      {data.driverVehicleNumber && <span>• <b>{data.driverVehicleNumber}</b></span>}
                    </div>
                  </div>
                </div>

                {/* Metrics: ETA & Distance */}
                {data.trackable && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    padding: '20px 0',
                    borderBottom: '1px solid #F1F5F9'
                  }}>
                    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #F1F5F9' }}>
                      <Clock style={{ width: '22px', height: '22px', color: '#0284C7', margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Estimated Arrival</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F172A', marginTop: '4px' }}>
                        {data.etaMinutes != null ? `${Math.round(data.etaMinutes)} min` : 'Calculating...'}
                      </div>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #F1F5F9' }}>
                      <Navigation style={{ width: '22px', height: '22px', color: '#059669', margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Distance Remaining</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F172A', marginTop: '4px' }}>
                        {data.distanceKm != null ? `${data.distanceKm} km` : 'Calculating...'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Map */}
                <TrackingMap data={data} />

                {/* Locations: Pickup & Destination */}
                <div style={{ padding: '20px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <MapPin style={{ width: '16px', height: '16px', color: '#059669' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Pickup Location
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A', marginTop: '2px' }}>
                        {data.pickupLocation || 'Pickup location on file'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <MapPin style={{ width: '16px', height: '16px', color: '#DC2626' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Destination
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A', marginTop: '2px' }}>
                        {data.dropLocation || 'Destination on file'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy & Safety Note */}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748B' }}>
                  <ShieldCheck style={{ width: '18px', height: '18px', color: '#059669', flexShrink: 0 }} />
                  <span>Secure live location tracking protected by JN Consultancy Services.</span>
                </div>

                {lastRefreshed && (
                  <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#94A3B8' }}>
                    Last updated: {lastRefreshed.toLocaleTimeString()} {data.trackable ? '(Auto-refreshes every 10s)' : ''}
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link to="/" style={{ color: '#0284C7', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
              ← Return to JN Consultancy Services Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
