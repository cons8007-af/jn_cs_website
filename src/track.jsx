import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { MapPin, Navigation, Car, Clock, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

const API_BASE = 'https://consbackend-production.up.railway.app';

export function LiveTrackingWebPage() {
  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);
  const token = params.token || queryParams.get('token') || '';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchTracking = async () => {
    if (!token) {
      setError('No tracking token provided.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/bookings/public-track/${encodeURIComponent(token)}`);
      const json = await res.json();
      if (!res.ok || json.ok === false) {
        setError(json.message || json.reason || 'Tracking is not available for this link.');
        setData(null);
      } else {
        setData(json.data || json);
        setError(null);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      setError('Unable to load live tracking details. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking();
    const interval = setInterval(fetchTracking, 10000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <>
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
        <div className="policy" style={{ maxWidth: '680px', margin: '0 auto' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <RefreshCw className="spin" style={{ width: '36px', height: '36px', color: '#0284C7', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '16px', color: '#64748B' }}>Loading real-time trip information...</p>
            </div>
          )}

          {!loading && error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <AlertCircle style={{ color: '#EF4444', width: '36px', height: '36px', margin: '0 auto 12px' }} />
              <h3 style={{ color: '#991B1B', margin: '0 0 8px' }}>Tracking Unavailable</h3>
              <p style={{ color: '#B91C1C', margin: 0 }}>{error}</p>
              <p style={{ color: '#64748B', fontSize: '13px', marginTop: '16px' }}>
                Live location sharing ends automatically when the trip is finished or cancelled for passenger safety and privacy.
              </p>
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
                background: data.trackable ? '#0284C7' : '#475569',
                color: '#FFFFFF',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
                    Trip Status
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>
                    {data.statusLabel || (data.status === 'trip_started' ? 'On Trip' : data.status === 'heading_to_pickup' ? 'Driver En Route to Pickup' : data.status === 'arrived_at_pickup' ? 'Driver at Pickup' : data.status === 'completed' || data.status === 'trip_completed' ? 'Trip Completed' : data.status)}
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  {data.trackable ? '● Live' : 'Ended'}
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Driver & Vehicle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: '#EFF6FF',
                    color: '#0284C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 'bold'
                  }}>
                    {(data.driverName || 'D').charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A' }}>
                      {data.driverName || 'Assigned Driver'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>
                      {data.driverVehicleType || 'Vehicle'} {data.driverVehicleNumber ? `• ${data.driverVehicleNumber}` : ''}
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
                    <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
                      <Clock style={{ width: '20px', height: '20px', color: '#0284C7', margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Estimated Arrival</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A', marginTop: '4px' }}>
                        {data.etaMinutes != null ? `${Math.round(data.etaMinutes)} min` : 'Calculating...'}
                      </div>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
                      <Navigation style={{ width: '20px', height: '20px', color: '#059669', margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Distance Remaining</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A', marginTop: '4px' }}>
                        {data.distanceKm != null ? `${data.distanceKm} km` : 'Calculating...'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Locations */}
                <div style={{ padding: '20px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                    <MapPin style={{ width: '20px', height: '20px', color: '#059669', marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Pickup</div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A', marginTop: '2px' }}>
                        {data.pickupLocation || 'Pickup location on file'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <MapPin style={{ width: '20px', height: '20px', color: '#EF4444', marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Destination</div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A', marginTop: '2px' }}>
                        {data.dropLocation || 'Destination on file'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy & Safety Note */}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748B' }}>
                  <ShieldCheck style={{ width: '18px', height: '18px', color: '#059669' }} />
                  <span>Secure live location tracking protected by JN Consultancy Services.</span>
                </div>

                {lastRefreshed && (
                  <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#94A3B8' }}>
                    Last updated: {lastRefreshed.toLocaleTimeString()} (Auto-refreshes every 10s)
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link to="/" style={{ color: '#0284C7', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
              ← Return to JN Consultancy Services Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
