import React from 'react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      location: 'New York',
      content: 'CuraDesk has revolutionized my healthcare experience. The AI symptom checker helped me understand my condition better, and the real-time chat with doctors is incredibly convenient.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      location: 'San Francisco',
      content: 'As a healthcare provider, CuraDesk has streamlined my practice. The appointment management system is intuitive, and the patient communication tools are excellent.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Patient',
      location: 'Los Angeles',
      content: 'The symptom checker is amazing! It gave me accurate recommendations and helped me find the right specialist. The whole process was seamless and professional.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Dr. Lisa Wang',
      role: 'Dermatologist',
      location: 'Chicago',
      content: 'CuraDesk has made patient care more efficient. The AI-powered triage helps patients find the right care, and the platform is incredibly user-friendly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'James Thompson',
      role: 'Patient',
      location: 'Miami',
      content: 'I was skeptical about online healthcare, but CuraDesk exceeded my expectations. The doctors are professional, and the technology is cutting-edge.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Dr. Robert Kim',
      role: 'Neurologist',
      location: 'Seattle',
      content: 'The platform has transformed how I interact with patients. The real-time chat feature and appointment scheduling have improved my practice significantly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
  ]

  return (
    <div className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4'>
            <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
            Patient & Doctor Testimonials
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            What Our Community Says
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Hear from real patients and healthcare professionals who have transformed 
            their healthcare experience with CuraDesk.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className='group relative bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'
            >
              {/* Rating */}
              <div className='flex items-center mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className='w-5 h-5 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                    <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote className='text-gray-700 mb-6 leading-relaxed'>
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className='flex items-center space-x-4'>
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className='w-12 h-12 rounded-full object-cover'
                />
                <div>
                  <div className='font-semibold text-gray-900'>{testimonial.name}</div>
                  <div className='text-sm text-gray-600'>{testimonial.role}</div>
                  <div className='text-xs text-gray-500'>{testimonial.location}</div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='text-center mt-16'>
          <div className='inline-flex items-center space-x-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-8 py-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <span className='text-gray-700 font-medium'>4.9/5 Average Rating</span>
            </div>
            <div className='w-px h-6 bg-gray-300'></div>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              <span className='text-gray-700 font-medium'>10,000+ Reviews</span>
            </div>
            <div className='w-px h-6 bg-gray-300'></div>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-3 bg-purple-500 rounded-full'></div>
              <span className='text-gray-700 font-medium'>98% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
