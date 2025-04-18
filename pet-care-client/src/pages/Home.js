import React, { useRef } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import PublicNavbar from '../components/PublicNavbar';

const services = [
  {
    title: 'Veterinary Services',
    image: '/vet.jpg',
    description: 'Expert care and checkups for your furry companions.'
  },
  {
    title: 'Pet Grooming',
    image: '/grooming.jpg',
    description: 'Bath, haircut, nail trim & more – pamper your pets!'
  },
  {
    title: 'Adoption Services',
    image: '/adoption.jpg',
    description: 'Find your forever friend through our adoption program.'
  }
];

const HoverCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 20px rgba(0,0,0,0.2)'
  }
}));

function Home() {
  const navigate = useNavigate();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_37izik1',      // Your EmailJS Service ID
      'template_t2qj4vm',     // Your Template ID
      form.current,
      '51BrYeqALeCxTpnkj'     // Your Public Key
    )
    .then(() => {
      alert('Message sent successfully!');
      form.current.reset();
    })
    .catch((error) => {
      alert('Failed to send message. Please try again.');
      console.error('EmailJS error:', error);
    });
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <PublicNavbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #ff7f50, #ffbb33)',
          color: '#fff',
          py: 10,
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Welcome to PetCare
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your all-in-one platform for veterinary, grooming, and adoption services
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{
            mt: 3,
            backgroundColor: '#ff7f50',
            '&:hover': {
              backgroundColor: '#ffbb33'
            },
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '25px'
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* SERVICES SECTION */}
      <Container id="services" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="#ff5e62">
          Our Services
        </Typography>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-4 mb-4 d-flex" key={index}>
              <div className="card h-100 w-100 text-center shadow-sm">
                <img
                  src={service.image}
                  className="card-img-top"
                  alt={service.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* HOURS OF OPERATION */}
      <Box id="hours" sx={{ py: 6, backgroundColor: '#f7f7f7', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="#ff5e62">
          Hours of Operation
        </Typography>
        <div className="container mt-3">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>Service</th>
                <th>Hours</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Veterinary Services</td>
                <td>Mon – Fri: 9 AM – 6 PM</td>
                <td><a href="tel:+18001234567">(800) 123-4567</a></td>
              </tr>
              <tr>
                <td>Grooming</td>
                <td>Tue – Sat: 10 AM – 5 PM</td>
                <td><a href="tel:+19876543210">(987) 654-3210</a></td>
              </tr>
              <tr>
                <td>Adoption</td>
                <td>Mon – Sun: 11 AM – 4 PM</td>
                <td><a href="tel:+15558887777">(555) 888-7777</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>

      {/* CONTACT SECTION + FORM */}
      <Box id="contact" sx={{ py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#ff5e62" align="center">
            Contact Us
          </Typography>
          <Typography align="center" gutterBottom>
            📍 3200 Washington St, Jamaica Plain, MA 02130
          </Typography>
          <Typography align="center">
            📞 <a href="tel:+18001234567">+1 (800) 123-4567</a> | 📧 <a href="mailto:support@petcare.com">support@petcare.com</a>
          </Typography>

          <Box sx={{ mt: 4 }}>
            <iframe
              title="PetCare Location"
              src="https://maps.google.com/maps?q=3200%20Washington%20St,%20Jamaica%20Plain,%20MA,%2002130&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
            />
          </Box>

          {/* ✅ EMAILJS CONTACT FORM */}
          <form ref={form} onSubmit={sendEmail} className="mt-4">
            <input type="hidden" name="to_email" value="emmadinithishreddy18@gmail.com" />
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" name="user_name" className="form-control" placeholder="Your name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" name="user_email" className="form-control" placeholder="you@example.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea name="message" className="form-control" rows="4" placeholder="How can we help?" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ backgroundColor: '#ff7f50', color: '#fff', py: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} PetCare. All rights reserved. | Built with ❤️
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;