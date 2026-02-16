
import React from "react";

const Infochat = () => {
  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-100/40 to-transparent -z-10" />

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <header className="mb-20 flex flex-col items-center text-center">
          <div className="px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Consult at fingertips
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-3xl">
            Feel free to share, <span className="text-blue-600">Anytime.</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            We ensure to keep you in touch with your doctor whenever you need. 
            Follow these steps to begin your consultation.
          </p>
        </header>

        {/* Steps Section */}
        <div className="relative mb-24">
          <div className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-blue-200 via-slate-200 to-transparent hidden md:block" />

          <div className="space-y-8">

            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row gap-8 items-stretch">
              <div className="z-10 flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg bg-blue-600">
                1
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 p-8 rounded-3xl min-h-[180px]">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Book an Appointment
                </h3>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  Choose your specialist and secure a suitable time slot for your consultation.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="px-3 py-2 bg-slate-800 rounded-xl text-xs font-bold text-blue-400 border border-slate-700 text-center">
                    Select Doctor
                  </div>
                  <div className="px-3 py-2 bg-slate-800 rounded-xl text-xs font-bold text-blue-400 border border-slate-700 text-center">
                    Pick Date/Time
                  </div>
                  <div className="px-3 py-2 bg-slate-800 rounded-xl text-xs font-bold text-blue-400 border border-slate-700 text-center">
                    Confirm Slot
                  </div>
                  <div className="px-3 py-2 bg-slate-800 rounded-xl text-xs font-bold text-blue-400 border border-slate-700 text-center">
                    Complete Payment
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row gap-8 items-stretch">
              <div className="z-10 flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg bg-indigo-600">
                2
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 p-8 rounded-3xl min-h-[180px]">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Access Appointments
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  Visit the My Appointments section to review your bookings and complete the pending transaction if required.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row gap-8 items-stretch">
              <div className="z-10 flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg bg-indigo-600">
                3
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 p-8 rounded-3xl min-h-[180px]">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Start the Chat
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  Click on the “Chat with Doctor” button available within your appointment card to begin your consultation.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Guidelines Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Appropriate Use */}
          <div className="md:col-span-2 bg-blue-200 hover:bg-blue-300 border border-slate-200 p-8 rounded-[2.5rem]">
            <h4 className="text-xl font-extrabold mb-6 text-slate-800">
              Appropriate Use
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-slate-600 font-medium">Follow-up questions</div>
              <div className="text-slate-600 font-medium">Sharing symptoms</div>
              <div className="text-slate-600 font-medium">Report discussion</div>
              <div className="text-slate-600 font-medium">Prescription clarification</div>
            </div>
          </div>

          {/* Emergency Box */}
          <div className="bg-red-200 hover:bg-red-300 border border-red-100 p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[220px]">
            <div>
              <h4 className="text-lg font-bold text-red-900 mb-2">
                Emergency?
              </h4>
              <p className="text-red-700 text-sm leading-relaxed">
                Chat is not intended for acute or life-threatening emergencies. 
                Please contact your local emergency services immediately.
              </p>
            </div>

            <div className="mt-6 py-3 px-4 bg-white rounded-2xl text-2xl font-black text-red-600 border border-red-100 text-center">
              911
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Infochat;
