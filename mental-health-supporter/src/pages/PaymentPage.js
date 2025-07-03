import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import CustomNavbar from './../components/Navbar';
import Footer from "./../features/homePage/components/Footer";

const PaymentPage = ({ onPaymentSuccess }) => {
  const { appointment_id } = useParams();
  const token = localStorage.getItem('access');
  const [isAllowed, setIsAllowed] = useState(null);
  const [appointmentsResponse, setAppointmentsResponse] = useState({});
  let patientName = '';

  useEffect(() => {
    if (!token) return;
    // Fetch appointment details to check patient
    axios.get(`http://127.0.0.1:8000/api/medical/appointments/${appointment_id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const appointment = res.data;
        setAppointmentsResponse(appointment);
        const userDataRaw = localStorage.getItem('loggedUser');
        if (userDataRaw) {
          const userData = JSON.parse(userDataRaw);
          if (appointment.patient_info?.patient_id === userData.id) {
            setIsAllowed(true);
          } else {
            setIsAllowed(false);
          }
        } else {
          setIsAllowed(false);
        }
      })
      .catch((error) => {
        // Show backend error if available
        if (error.response && error.response.data && error.response.data.detail) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.detail,
            confirmButtonColor: '#6f42c1'
          });
        }
        setIsAllowed(false);
      });

  }, [appointment_id, token]);

  console.log(isAllowed, appointmentsResponse)
  if (!token) {
    // Redirect to login, but keep the intended URL for redirect after login
    return <Navigate to={`/login?next=/payment/${appointment_id}`} replace />;
  }
  if (isAllowed === false) {
    return <div className="alert alert-danger">You are not allowed to pay for this appointment.</div>;
  }
  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  try {
    const userDataRaw = localStorage.getItem('loggedUser');
    if (userDataRaw) {
      const userData = JSON.parse(userDataRaw);
      if (userData && typeof userData === 'object') {
        patientName = userData.name || userData.full_name || userData.username || '';
      }
    }
  } catch (e) {
    patientName = '';
  }

  const handlePaymentSuccess = (details, data) => {
    if (onPaymentSuccess) onPaymentSuccess(details, data);
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: 'Your payment has been completed successfully.',
      confirmButtonColor: '#6f42c1'
    });

    return <Navigate to={`/payment/${appointment_id}`} replace />;
  };

  const createOrder = async (data, actions) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/users/paypal/create-order/?appointment_id=${appointment_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.id;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Order Creation Failed',
        text: 'Could not create PayPal order. Please try again.',
        confirmButtonColor: '#6f42c1'
      });
      throw error;
    }
  };

  return (
    <>
    <CustomNavbar />
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e3e6f3 100%)' }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 480, width: '100%', borderRadius: 18 }}>
        <div className="text-center mb-4">
          <h2 className="mb-2 fw-bold" style={{ color: 'var(--primary-purple)' }}>Complete Your Payment</h2>
          {patientName && (
            <div className="mb-2 d-flex justify-content-center align-items-center">
              <span className="fw-bold" style={{ color: 'var(--primary-purple)', fontSize: 18 }}>
                <span style={{marginRight: 8}}>Patient:</span> {patientName}
              </span>
            </div>
          )}
          <p className="text-muted mb-0">Secure your appointment by paying the consultation fee below.</p>
        </div>
        {(isAllowed === true && appointmentsResponse && appointmentsResponse.payment_status === 'paid') && <div className="alert alert-warning">This appointment is already paid.</div>}
        <div className="d-flex justify-content-center mb-3">
          <PayPalScriptProvider options={{ "client-id": "AWHRtQsGF5iOXME3WYS5kuOSzVRde2h6FUi2Zfd9oQ5VB0ArDp2cFPHRUoB5wORwzND_mh137tVNhkSm", currency: "USD" }}>
            <PayPalButtons
              style={{ layout: "horizontal", height: 55, tagline: false }}
              createOrder={createOrder}
              onApprove={async (data, actions) => {
                // Send appointment_id in the body when capturing the order
                try {
                  const captureResponse = await axios.post(
                    `http://127.0.0.1:8000/api/users/paypal/capture-order/`,
                    { orderID: data.orderID, appointment_id },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                      },
                    }
                  );
                  handlePaymentSuccess(captureResponse.data, data);
                } catch (err) {
                  console.error("PayPal capture error:", err);
                  alert("Something went wrong with your payment. Please try again.");
                }
              }}
              onError={(err) => {
                console.error("PayPal onError:", err);
                alert("Something went wrong with your payment. Please try again.");
              }}
              disabled={(isAllowed === true && appointmentsResponse && appointmentsResponse.payment_status === 'paid')}
            />
          </PayPalScriptProvider>
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">Powered by PayPal &bull; Your payment is secure</small>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export function getPaymentLink(appointmentId) {
  return `${window.location.origin}/payment/${appointmentId}`;
}

export default PaymentPage;
