"use client"
import React, { useEffect } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    // Function to request notification permission
    const requestNotificationPermission = async () => {
      if ('Notification' in window) { // Check if the browser supports notifications
        try {
          // Request permission if not already granted
          const permission = await Notification.requestPermission();
          
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            // You can also send a test notification here
            // new Notification('Hello!', { body: 'You have granted notification permission.' });
          } else {
            console.log('Notification permission denied.');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      } else {
        console.warn('Notifications are not supported in this browser.');
      }
    };

    // Call the function to request permission
    requestNotificationPermission();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <Header />
      <div className="mt-20">
        <Content />
        <Footer />
      </div>
    </div>
  );
}
