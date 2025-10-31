// FloatingCertifications.js
import React, { useState } from 'react';


const certifications = [
  {
    name: "Tata Visualisation",
    url: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_68e7f6c39a5ed0f6bb8be73c_1760695898641_completion_certificate.pdf",
    color: "#232F3E",
    label: "T"
  },
  {
    name: "Edinburgh Award",
    url: "https://eu.badgr.com/public/assertions/eSIYY768QhKFZNot8HtICQ",
    color: "#0078D4",
    label: "E"
  },
  {
    name: "GA4",
    url: "https://skillshop.credential.net/01acdf88-a458-42ca-9db9-73ebe53bb209#acc.8dLug5vM",
    color: "#4285F4",
    label: "G"
  },
  {
    name: "Power BI",
    url: "https://learn.microsoft.com/en-us/users/narmathajayasankar-2639/credentials/1050ce0d1764f335",
    color: "#F6C915",
    label: "P"
  }
];
const radius = 65; // Controls distance of popups from the main button
const total = certifications.length;
const minAngle = 110;      // Top (12 o'clock)
const maxAngle = 235;       // Bottom (6 o'clock)


export default function FloatingCertifications() {
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{
        position: 'fixed',
        top: '50%',
        right: '1rem',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 25px'
      }}      
    >
      {/* Certification popups */}
      <div style={{ position: 'relative' }}>
      {certifications.map((cert, i) => {
    const angle = minAngle + ((maxAngle - minAngle) * i) / (total - 1);
    const rad = (angle * Math.PI) / 180; // Convert degrees to radians
    return (
   <a
    key={cert.name}
    href={cert.url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: 'absolute',
      transition: 'all 0.3s cubic-bezier(.49,-.2,.37,1.45)',
      left: open ? `${radius * Math.cos(rad)}px` : 0,
        top: open ? `${radius * Math.sin(rad)}px` : 0,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      background: cert.color,
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      fontSize: "1.5rem",
      textDecoration: 'none'
    }}
    title={cert.name}
  >
    {cert.label}
  </a>
)})}

      </div>
      {/* Main floating button */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#3b82f6',    // Use indigo/emarald as in your palette
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          cursor: 'pointer',
          border: 'none',
          outline: 'none'
        }}
      >
        C
      </div>
    </div>
  );
}